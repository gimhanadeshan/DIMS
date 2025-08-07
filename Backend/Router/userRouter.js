const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../Model/user');
const { userAuth, isAdmin } = require('../Middleware/authmidllware');
const router = express.Router();


// @route POST/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ success: true, msg: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ success: false, msg: e.message });
  }
});


// @route POST/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }
   const token = jwt.sign({ id: user._id, role: user.role  },process.env.JWT_SECRET,{ expiresIn: "1d" });
   res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    });
   res.status(200).json({ success: true, msg: "Login successful", token });

  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});


// @route POST/logout
router.post("/logout", (req, res) => {
  try {
    res.json({ success: true, msg: "Logged out successs" });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Couldn't logout" });
  }
});

// @route GET/profile
router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// @route  PUT/update
router.put("/update", userAuth, async (req, res) => {
   const { name, email, password } = req.body;
  try {
    const updates = { name, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updates.password = hashedPassword;
    }
    const userId = req.user.id;
    const updatedUser = await userModel.findByIdAndUpdate( userId,{ $set: updates },{ new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    return res.json({success: true,msg: "Successfully updated",user: updatedUser,});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

//------@access  Admin only-----
// @route GET/getuser
router.get("/getuser", userAuth, isAdmin, async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
});


// PUT /:id {Role change}
router.put("/:id", userAuth, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    user.role = role;
    await user.save(); 
    res.json({success: true, msg: "Role successfully updated",updatedUser: { id: user._id, email: user.email,newRole: user.role,},});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});


module.exports = router;


