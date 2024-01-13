const mongoose=require("mongoose")
require('dotenv').config()
const MONGO_URI=process.env.MONGO_URI

const connectToMongo=()=>{
    mongoose.connect(MONGO_URI).then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log("Error in connecting")
    })
}

module.exports=connectToMongo