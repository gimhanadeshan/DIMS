// controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuditLog = require('../models/Audit_logs');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role_id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Register user
exports.registerUser = async (req, res) => {
  const { username,email,full_name, password,walletAddress } = req.body;
  //console.log('Role received at registerUser:', role); 

  if (!username || !password || !email || !full_name){
    await AuditLog.create({
      user_id: null, // No user ID available at this point
      action: 'register',
      status: 'failed',
      details: { message: 'Required fields are missing' },
    });
  
    return res.status(400).json({ message: 'Use Name,password,email and full name are required' });
  }

  try {
    let userExists = await User.findOne({ username });
    if (userExists) {
      await AuditLog.create({
        user_id: userExists._id,
        action: 'register',
        status: 'failed',
        details: { message: 'User already exists' },
      });
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with provided role or default to Guest
    const user = await User.create({
      username,
      email,
      full_name,
      password,
      walletAddress,
    });
    
   await AuditLog.create({
      user_id: user._id,
      action: 'register',
      status: 'success',
      details: { message: 'User registered successfully' },
    });
    

    res.status(201).json({
      success: true,
      data:{
        token: generateToken(user),
        user_id: user._id,
        message: 'User created successfully. Awaiting admin approval.',
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      await AuditLog.create({
        user_id:user._id,
        action: 'login',
        status: 'failed',
        details: { message: 'Invalid credentials' },
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await User.findByIdAndUpdate(user._id, { last_login_at: new Date() });

    await AuditLog.create({
      user_id: user._id,
      action: 'login',
      status: 'success',
      details: { message: 'User logged in successfully' },
    });

    res.status(200).json({
      success:true,
      data:{
        token: generateToken(user),
      },
      user:{
        id:user._id,
        username:user.username,
        email:user.email,
        full_name:user.full_name,
      },
      role:{
        id:user.role_id,
        name:user.role_id.name,
        Permissions:user.role_id.permissions,
      },
      walletAddress:user.walletAddress,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*
// Protected example route
exports.getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};*/

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  const { page,limit,role,status,search } = req.query;
   try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: { 
        users: users.map(user => ({
        id: user._id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: {
          id: user.role_id,
          name: user.role_id.name,
        },
        status: user.status,
        last_login_at: user.last_login_at,
        created_at: user.createdAt,
      })) },
      pagination: {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        total: users.length,
        pages: Math.ceil(users.length / (parseInt(limit) || 20)),
      },
   });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get user by id 
exports.getUserById = async (req, res) => {
  const {id}= req.params;
  try{
    const user = await User.findById(id);

    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role:{
          id: user.role_id,
          name: user.role_id.name,
          permissions: user.role_id.permissions,
        },
        status: user.status,
        walletAddress: user.walletAddress,
        created_at: user.createdAt,
        updated_at: user.updatedAt, 
      },
    });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
exports.updateUser = async(req,res)=>{
  try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{ new: true});
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: {
        user:{user},
        //todo:= blockchain_tx
      }
  });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

// Delete users
exports.deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: {
        message: 'User deleted successfully',
        //todo:= blockchain_tx
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
