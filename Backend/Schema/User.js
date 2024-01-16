const mongoose=require('mongoose')
const Friends=require('./Friends')
const {Schema}=mongoose

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        // enum: {
        //     values: ['male', 'female','Female','Male'],
        //     message: 'Please provide gender'
        // },
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    friends:[{
        user:mongoose.Schema.Types.ObjectId,
        username:String,
        gender:String
    }],
    image:{
        data: Buffer,
        contentType: String
    },
    sports:{
        type:String,
        require:true
    }
  });

const User=mongoose.model("user",UserSchema);

//Not doing this now because writing logic of unique email in auth.js
// User.createIndexes()  createIndexes() create on basis of waht we have set as a unique thing 


module.exports=User