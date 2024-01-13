const mongoose=require('mongoose')
const {Schema}=mongoose

const FriendsSchema=new Schema({
    gender:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const Friends=mongoose.model("friend",FriendsSchema);
module.exports=Friends