const express = require('express');
const router = express.Router();
const { getAuditLog } = require('../controllers/auditLogController');
const { protect } = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/roleMiddleware');

// GET /audit-logs
router.get('/', protect, authorizeRoles('admin'), getAuditLog);

module.exports = router;
