const mongoose = require("mongoose");

 const userShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Admin','User','Guest'],
        default:'User'
    },
   // walletAdress:{type:String,}
   }
 )


const userModel = mongoose.models.user ||  mongoose.model('user',userShema)
module.exports = userModel