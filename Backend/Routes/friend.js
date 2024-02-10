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
    //   console.log(userLoggedIn)

    if(userLoggedIn.email==req.body.email){
        return res.status(400).json({success:"false",message:"You can't send friend request to yourself"})
    }
      const requestAlreadyExists = friend.requests.some(f => f.user.equals(userLoggedIn._id));
      const alreadyFollowing = friend.followers.some(f => f.user.equals(userLoggedIn._id));
      console.log(requestAlreadyExists+"   "+alreadyFollowing)
      if(!requestAlreadyExists && !alreadyFollowing){
        friend.requests.push({
          user:userLoggedIn._id,
          gender:userLoggedIn.gender,
          username:userLoggedIn.username
        })
      }
      else{
        return res.status(400).json({success:false,message:"Request is already sent or it is already in your following list"})
      }
      const savedUser = await friend.save();
      res.status(200).json({success:true,message:"Request sent succesfully"})
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success:false,message: "Internal Server error" });
    }
  })



router.put("/acceptRequest",fetchUser,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        const friend=await User.findById(req.body.user)
        const friendExists = user.followers.some(f => f.user.equals(friend._id));
        if(friendExists){
            return res.json({success:true,message:"User with this email already exist in your Friend list"}).status(200)
        }
        if (!friendExists) {
            user.followers.push({
                user: friend._id,
                gender:friend.gender,
                username:friend.username
            });
            friend.following.push({
                user:user._id,
                gender:user.gender,
                username:user.username
            })
        } 
        const savedUser = await user.save();
        const savedFriend=await friend.save();
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

        const user_every = await User.findById(req.body.id).select("-password -sports");
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
        res.json({success:"true",message:"Denied request"}).status(200)
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success: false, message: "Internal Server error", error: e.message });
    }
})


router.put("/removeFollowingFriend",fetchUser,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        let index=-1;
        for(let i=0;i<user.following.length;i++){
            if(user.following[i].user==req.body.user){
                index=i;
                break;
            }
        }
        console.log("Hello")
        if(index!=-1){
            user.following.splice(index,1)
        }
        const savedUserRequests=await user.save();
        let index_following=-1;
        const friend=await User.findById(req.body.user);
        for(let i=0;i<friend.followers.length;i++){
            if(friend.followers[i].user==req.user.id){
                console.log(friend.followers[i].user+"    "+req.user.id)
                index_following=i;
                break;
            }
        }
        if(index_following!=-1){
            friend.followers.splice(index_following,1);
        }
        const savedUserFollowing=await friend.save()
        res.json({success:"true",message:"Removed friend"}).status(200)
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success: false, message: "Internal Server error", error: e.message });
    }
})



router.put("/removeFollower",fetchUser,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        let index=-1;
        for(let i=0;i<user.followers.length;i++){
            if(user.followers[i].user==req.body.user){
                index=i;
                break;
            }
        }
        if(index!=-1){
            user.followers.splice(index,1)
        }
        const savedUserRequests=await user.save();
        let index_following=-1;
        const friend=await User.findById(req.body.user);
        for(let i=0;i<friend.following.length;i++){
            if(friend.following[i].user==req.user.id){
                index_following=i;
                break;
            }
        }
        if(index_following!=-1){
            friend.following.splice(index_following,1);
        }
        const savedUserFollowing=await friend.save()
        res.json({success:true,message:"Removed follower"}).status(200)
    }catch(e){
        console.error(e.message);
        res.status(500).json({ success: false, message: "Internal Server error", error: e.message });
    }
})


module.exports = router;