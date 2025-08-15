const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const sessionSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:uuidv4,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    tocken_hash:{
        type:String,
        required:true,
    },
    expires_at:{
        type:Date,
        required:true,
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    last_accessed_at: { 
        type: Date, default: 
        Date.now 
    }
});

module.exports = mongoose.model('Session', sessionSchema);
