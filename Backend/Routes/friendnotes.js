const express = require("express");
const router = express.Router();
const Notes=require("../Schema/Notes")
const fetchUser = require("../MiddleWares/fetchUser");
const { body, validationResult } = require('express-validator');
const User = require("../Schema/User");

router.get("/getFriendNotes",fetchUser, async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.query.user})
        if(!notes){
            return res.status(404).json({success:false,message:"Not found"})
        }
        res.json({message:"true",notes:notes}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})


router.get("/getNotesToViewComment",fetchUser, async (req,res)=>{
    try{
        const notes=await Notes.findById(req.query.user)
        if(!notes){
            return res.status(404).json({success:false,message:"Not found"})
        }
        res.json({message:"true",notes:notes}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})


router.put("/deleteComment",fetchUser,async(req,res)=>{
    try{
        const notes=await Notes.findById(req.query.user)
        const {user}=req.body
        let index=-1;
        for(let i=0;i<notes.comments.length;i++){
            if(user==notes.comments[i]._id.toString()){
                index=i;
                break;
            }
        }
        if(index!=-1){
            notes.comments.splice(index,1)
        }
        const savedNote=await notes.save();
        res.json({message:"true",notes:notes}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})

router.put("/addComment",fetchUser,[body("description").exists()],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter comment" });
    }
    try{
        const notes=await Notes.findById(req.query.user)
        let user=await User.findById(req.user.id)
        console.log(notes)
        notes.comments.push({
            username:user.username,
            gender:user.gender,
            description:req.body.description,
            user:req.user.id,
        })
        const savedNote = await notes.save();
        console.log(notes)
        return res.json({success:true,message:"Added comment"}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})


router.put("/editComment",fetchUser,[body("description").exists()],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter comment" });
    }
    try{
        const {user,description}=req.body
        const notes=await Notes.findById(req.query.user)
        let index=-1;
        for(let i=0;i<notes.comments.length;i++){
            console.log(user+"       "+notes.comments[i]._id.toString())
            if(user==notes.comments[i]._id.toString()){
                index=i;
                notes.comments[i].description=description
                break;
            }
        }
        const savedNote = await notes.save();
        console.log(notes)
        return res.json({success:true,message:"Edited comment",comments:notes.comments}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})


module.exports = router;