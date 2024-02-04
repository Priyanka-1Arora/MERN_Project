const express = require("express");
const router = express.Router();
const Notes=require("../Schema/Notes")
const fetchUser = require("../MiddleWares/fetchUser");
const { body, validationResult } = require('express-validator');

router.get("/getFriendNotes",fetchUser, async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.query.user})
        res.json({message:"true",notes:notes}).status(200)
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})

module.exports = router;