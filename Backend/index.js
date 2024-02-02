const connectToMongo=require('./Config/db.js')
const express=require('express')
require('dotenv').config()
const path=require('path')
const port=process.env.PORT
const app=express();
const cors=require('cors')

// to connect to database
connectToMongo();

app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/friend',require('./Routes/friend.js'))
app.use('/api/notes',require('./Routes/notes.js'))


app.use('/images', express.static(path.join(__dirname, 'Uploads')));

app.listen(port,()=>{
    console.log("Listening at port",port)
})