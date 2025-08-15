const jwt = require('jsonwebtoken');
const User = require('../models/Audit_logs');

//Get audit log
exports.getAuditLog = async (req, res) => {
  try {
    // Fetch all audit logs
    const auditLogs = await User.find({});

    res.status(200).json({
      success: true,
      data: { 
        auditLogs:[{
            id:auditLogs._id,
            user: {
                id:auditLogs.user_id,
                username:auditLogs.user_id.username,
            },
            action: auditLogs.action,
            resource: auditLogs.resource,
            status: auditLogs.status,
            ip_address: auditLogs.ip_address,
            //todo:=blockchain_tx_hash
            created_at: auditLogs.created_at,
            details:{ ...auditLogs.details } // Spread operator to include all details since whats stored is not specified
            }
        ] ,
        pagination:{auditLogs},
    }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}