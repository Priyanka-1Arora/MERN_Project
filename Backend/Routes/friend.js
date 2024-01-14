const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const { body, validationResult } = require("express-validator");
const fetchUser=require('../MiddleWares/fetchUser')


router.put("/addFriend",[
    body("friendEmail").isEmail()
    ],
    fetchUser,async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401)
            .json({ success: false, message: "Please enter correct email" });
        }
        try{
            const {friendEmail}=req.body
            if(friendEmail){
                console.log(req.user.id)
                let userLoggedIn= await User.findById(req.user.id)
                if(!userLoggedIn){
                    return res.status(404).json({message:"User not found",success:"false"})
                }
                const friend=await User.findOne({email:friendEmail})
                if(!friend){
                    return res.status(404)
                    .json({success: false,message: "User with this email doesnot exist"});
                }
                const friendExists = userLoggedIn.friends.some(f => f.user.equals(friend._id));
                if(friendExists){
                    return res.json({success:true,message:"User with this email already exist in your Friend list"}).status(200)
                }
                if (!friendExists) {
                    userLoggedIn.friends.push({
                        user: friend._id,
                        username: friend.username,
                        gender: friend.gender
                    });
                } 
                const savedUser = await userLoggedIn.save();
                res.json({ success: true, message: "Friend added successfully", user: savedUser });
            }
        }catch(e){
            console.error(e.message);
            res.status(500).json({ success:false,message: "Internal Server error" });
        }

    }
)


module.exports = router;