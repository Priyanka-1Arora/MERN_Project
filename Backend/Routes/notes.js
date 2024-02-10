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
        return res.status(401).json({ success:false,message: "Please enter all values" });
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
        res.json({success:true,note:note,message:"Note added successfully"}).status(200)
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
            return res.status(404).send({message:"Note not found",success:false})
        }
        if(noteFind.user.toString()!=req.user.id){
            return res.status(401).send({message:"Unauthorized",success:false})
        }
        else{
            noteFind=await Notes.findByIdAndDelete(req.params.id)
            return res.json({success:true,message:"deleted successfully"}).status(200)
        }
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error",success:false})
    }
})


router.put("/updateNote/:id",fetchUser,async (req,res)=>{
    try{
        const {category,title,description}=req.body
        console.log(category)
        console.log(title)
        console.log(description)
        let noteCheck=await Notes.findById(req.params.id)
        console.log(noteCheck)
        if(!noteCheck){
            return res.status(404).send({message:"Note not found",success:false})
        }
        console.log(noteCheck.user.toString())
        console.log(req.user.id)
        if(noteCheck.user.toString()!=req.user.id){
            return res.status(400).send({message:"Unauthorized",success:false})
        }
        else{
            let note={}
            if(title){note.title=title}
            if(category){note.category=category}
            if(description){note.description=description}
            noteCheck=await Notes.findByIdAndUpdate(req.params.id,{$set:note},{new:true})
            return res.json({note:noteCheck,message:"Updated note successfully",success:true}).status(200)
        }
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error",success:false}).status(500)
    }
})


router.get('/getComemnts',fetchUser,async(req,res)=>{
    try{
        const notes=await Notes.findById(req.query.user)
        if(!notes){
            return res.status(404).json({success:false,message:"Not found"})
        }
        res.json({message:"true",comments:notes.comments}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error",success:false}).status(500)
    }
})


module.exports = router;