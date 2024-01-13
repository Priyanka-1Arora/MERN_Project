const connectToMongo=require('./Config/db.js')
const express=require('express')
require('dotenv').config()
const port=process.env.PORT
const app=express();

// to connect to database
connectToMongo();


app.listen(port,()=>{
    console.log("Listening at port",port)
})