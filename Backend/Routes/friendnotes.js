const express = require("express");
const router = express.Router();
const Notes=require("../Schema/Notes")
const fetchUser = require("../MiddleWares/fetchUser");
const { body, validationResult } = require('express-validator');
const User = require("../Schema/User");

router.get("/getFriendNotes",fetchUser, async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.query.user})
        res.json({message:"true",notes:notes}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})


router.get("/getNotesToViewComment",fetchUser, async (req,res)=>{
    try{
        const notes=await Notes.findById(req.query.user)
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


module.exports = router;