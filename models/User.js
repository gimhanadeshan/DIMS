// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id:{
    type:String,
    default:uuidv4,
  },
  username:{
    type:String,
    unique:true,
    required:true,
  },
  email:{
    type:String,
    unique:true,
    required:true,
  },
  full_name:{
    type:String,
    required:true,
  },
  
  password: {
    type: String,
  },
  walletAddress: {
    type: String,
    unique: true,
  },
  role_id: {
    type: String,
    ref:'Role',
    default: '3a23acdd-e800-448b-b5cc-c1111e62678a', // Default role if not specified
  },
  status:{
    type:String,
    default:'active',
    enum:['active','inactive','suspended'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  last_login_at:Date,
  
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
