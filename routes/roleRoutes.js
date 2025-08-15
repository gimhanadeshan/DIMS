// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const { getAllRoles, createRole } = require('../controllers/roleController');
const { protect } = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/roleMiddleware');

// GET /roles
router.get('/', getAllRoles);

// POST /roles
router.post('/',  createRole);

module.exports = router;
