const express = require("express");
const router = express.Router();
const Notes=require("../Schema/Notes")
const fetchUser = require("../MiddleWares/fetchUser");
const { body, validationResult } = require('express-validator');

router.post("/addNote",fetchUser,
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
    body('category').isLength({ min:3})
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success:false,errors: errors.array() });
    }
    const {title,description,category}=req.body
    try{
        const note=await Notes.create({
            title:title,
            category:category,
            description:description,
            user:req.user.id,
            comments:[]
        })
        res.json({success:true,note:note}).status(200)
    }catch(e){
        console.error(e.message);
      res.status(500).json({ success: false, message: "Internal Server error" });
    }
})

router.get("/getNotes",fetchUser, async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.user.id})
        res.json({message:"true",notes:notes}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})

router.delete("/deleteNote/:id",fetchUser,async (req,res)=>{
    try{
        let noteFind=await Notes.findById(req.params.id)
        if(!noteFind){
            return res.status(404).send({message:"Note not found"})
        }
        if(noteFind.user.toString()!=req.user.id){
            return res.status(401).send({message:"Unauthorized"})
        }
        else{
            noteFind=await Notes.findByIdAndDelete(req.params.id)
            return res.json({success:true,message:"deleted successfully"}).status(200)
        }
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})



module.exports = router;