const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const { body, validationResult } = require("express-validator");
const fetchUser=require('../MiddleWares/fetchUser')

router.put('/requestSent',[
    body("email").isEmail()
  ],fetchUser,async(req,res)=>{
    try{
      console.log(req.body.email)
      let friend=await User.findOne({email:req.body.email})
      console.log(friend)
      if(!friend){
        return res.status(401).json({success:false,message:"User doesnot exist"})
      }
      let userLoggedIn=await User.findById(req.user.id)
      console.log(userLoggedIn)
      const requestAlreadyExists = friend.requests.some(f => f.user.equals(userLoggedIn._id));
      if(!requestAlreadyExists){
        console.log("Hello");
        console.log(friend.requests)
        friend.requests.push({
          user:userLoggedIn._id,
          gender:userLoggedIn.gender,
          username:userLoggedIn.username
        })
        console.log(friend.requests)
        console.log("Done")
      }
      const savedUser = await friend.save();
      res.status(200).json({succes:"true",message:"User added succesfully"})
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success:"false",message: "Internal Server error" });
    }
  })



router.put("/acceptRequest",fetchUser,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        const friend=await User.findById(req.body.user)
        const friendExists = user.friends.some(f => f.user.equals(friend._id));
        if(friendExists){
            return res.json({success:true,message:"User with this email already exist in your Friend list"}).status(200)
        }
        if (!friendExists) {
            user.friends.push({
                user: friend._id,
                gender:friend.gender,
                username:friend.username
            });
        } 
        const savedUser = await user.save();
        let index=-1;
        for(let i=0;i<user.requests.length;i++){
            if(user.requests[i].user==req.body.user){
                index=i;
                break;
            }
        }
        if(index!=-1){
            user.requests.splice(index,1)
        }
        const savedUserRequests=await user.save();
        res.json({ success: true, message: "Friend added successfully", user: savedUser });
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success:"false",message: "Internal Server error" });
    }
})



router.post('/viewFriends', async (req, res) => {
    try {
        let user = await User.findById(req.body.id);
        console.log(req.body.id)
        console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user_every = await User.findById(req.body.id).select("-password -sports -image");
        res.status(200).json({ success: true, message: "Gotten friend successfully", user: user_every });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ success: false, message: "Internal Server error", error: e.message });
    }
});




router.put('/declineRequest',fetchUser,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        let index=-1;
        for(let i=0;i<user.requests.length;i++){
            if(user.requests[i].user==req.body.user){
                index=i;
                break;
            }
        }
        if(index!=-1){
            user.requests.splice(index,1)
        }
        const savedUserRequests=await user.save();
        res.json({success:"true",message:"Denied request"})
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success: false, message: "Internal Server error", error: e.message });
    }
})

router.put("/removeFriend",fetchUser,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        let index=-1;
        for(let i=0;i<user.friends.length;i++){
           console.log(user.friends[i].user+"    "+req.body.user)
            if(user.friends[i].user==req.body.user){
                index=i;
                break;
            }
        }
        if(index!=-1){
            user.friends.splice(index,1)
        }
        const savedUserRequests=await user.save();
        res.json({success:"true",message:"Removed friend"})
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success: false, message: "Internal Server error", error: e.message });
    }
})


module.exports = router;