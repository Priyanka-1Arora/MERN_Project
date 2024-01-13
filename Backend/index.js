const connectToMongo=require('./Config/db.js')
const express=require('express')
require('dotenv').config()
const port=process.env.PORT
const app=express();
const cors=require('cors')

// to connect to database
connectToMongo();

app.use(cors)
app.use(express.json())
// app.use('/api/auth',require('./Routes/auth.js'))



app.listen(port,()=>{
    console.log("Listening at port",port)
})