const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const User = require('./User');

const auditLogSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:uuidv4,
    },
    user_id:{
        type: String,
        ref:'User'
    },
    action:{
        type:String,
        required:true,
    },
    resource:String,
    resource_id:String,
    details:{
        type: mongoose.Schema.Types.Mixed,
    },
    ip_address:String,
    user_agent:String,

    status:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    });

    module.exports = mongoose.model('AuditLog',auditLogSchema);
    