const express = require('express');
const router = express.Router();
const User=require("../Schema/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_KEY=process.env.JWT_SECRET



//CREATE A USER : POST REQUEST
router.post('/createUser',[
    body('username','Enter a valid name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
],async(req,res)=>{

    // to check validations of input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ success:false,message:errors.array()});
    }

    if(req.body.gender!='male' || req.body.gender!='Male' || req.body.gender!='female' ||
    req.body.gender!='Female'){
        return res.status(403).json({success:false,message:"Please provide a correct gender"})
    }

    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(403).json({success:false,message:"User with this email already exist"})
        }
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt)
        user=await User.create({
            username: req.body.username,
            email:req.body.email,
            password:secPass,
            gender:req.body.gender,
            friends:[]
        })
        const data={
            user:{
                id:user.id
            }
        }
        const auth=jwt.sign(data,JWT_KEY)
        res.status(200).json({success:true,auth})
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Internal Server error"})
    }
})



module.exports = router;