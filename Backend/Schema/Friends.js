const mongoose=require('mongoose')
const {Schema}=mongoose

const FriendsSchema=new Schema({
    gender:{
        type:String,
        // enum: {
        //     values: ['male', 'female','Female','Male'],
        //     message: 'Please provide gender'
        // },
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