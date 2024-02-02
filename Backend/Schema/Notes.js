const mongoose=require('mongoose')
const {Schema}=mongoose

const Notes = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    comments:[{
        user:mongoose.Schema.Types.ObjectId,
        username:String,
        description:String
    }]
  });


  module.exports=mongoose.model("notes",Notes);