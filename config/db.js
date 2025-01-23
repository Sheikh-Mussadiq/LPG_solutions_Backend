const mongoose = require("mongoose")


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB