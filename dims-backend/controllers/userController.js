// controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, walletAddress: user.walletAddress, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Register user
exports.registerUser = async (req, res) => {
  const { walletAddress, password, role } = req.body;
  console.log('Role received at registerUser:', role); 

  if (!walletAddress || !password)
    return res.status(400).json({ message: 'Wallet address and password are required' });

  // Validate role if provided
  const validRoles = ['Admin', 'User', 'Guest'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: `Role must be one of: ${validRoles.join(', ')}` });
  }

  try {
    let userExists = await User.findOne({ walletAddress });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Create user with provided role or default to Guest
    const user = await User.create({
      walletAddress,
      password,
      role: role || 'Guest',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user),
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { walletAddress, password, role } = req.body;

  try {
    const user = await User.findOne({ walletAddress });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If role is provided in request, check it matches user's role
    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Access denied for this role' });
    }

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(user),
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Protected example route
exports.getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};
