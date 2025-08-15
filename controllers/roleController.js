// controllers/roleController.js
const Role = require('../models/Roles');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// GET /roles - Get all roles (admin only)
exports.getAllRoles = async (req, res) => {
  try {
    // Fetch all roles
    const roles = await Role.find({});

    // Add user count to each role
    const rolesWithCount = await Promise.all(
      roles.map(async (role) => {
        const count = await User.countDocuments({ role: role._id });
        return { 
        roles: roles.map(role => ({
          id: role._id,
          name:role.name,
          description:role.description,
          permissions: role.permissions,
          user_count: count,
          is_system_role: role.is_system_role,
          created_at: role.created_at,
        })),
        
      }
      })
    );

    res.status(200).json({
      success: true,
      data: { roles: rolesWithCount }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /roles - Create a new role (admin only)
exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    // Optional: Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ success: false, message: 'Role already exists' });
    }

    const role = await Role.create({
      name,
      description,
      permissions,
    });

    res.status(201).json({
      success: true,
      data: { role }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
