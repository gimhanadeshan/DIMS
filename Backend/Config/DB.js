const mongoose = require('mongoose')

mongoose.set("strictQuery", true);

const MONGODB_URI = "" ; // Add mongodb
const connectdb = async () =>{
    await mongoose.connect(MONGODB_URI);
    console.log("db conected")

}

module.exports = connectdb