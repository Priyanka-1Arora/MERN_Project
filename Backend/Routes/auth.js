const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_SECRET;
const fetchUser = require("../MiddleWares/fetchUser");
const fs = require("fs").promises;

//CREATE A USER : POST REQUEST
router.post(
  "/createUser",
  [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
    body("sports").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    console.log(req.body);
    // to check validations of input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ success: false, message: errors.array() });
    }

    if (
      !(
        req.body.gender != "male" ||
        req.body.gender != "Male" ||
        req.body.gender != "female" ||
        req.body.gender != "Female"
      )
    ) {
      return res
        .status(402)
        .json({ success: false, message: "Please provide a correct gender" });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(403)
          .json({
            success: false,
            message: "User with this email already exist",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const secSports=await bcrypt.hash(req.body.sports.toLowerCase(),salt)
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
        sports:secSports,
        gender: req.body.gender,
        followers: [],
        following: []
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth = jwt.sign(data, JWT_KEY);
      res.status(200).json({ success: true, auth });
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
  }
);

// LOGIN USER
router.post(
  "/login",
  [body("password").exists(), body("email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter correct credentials" });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(401)
          .json({
            success: false,
            message: "Please enter correct credentials",
          });
      }
      const check = await bcrypt.compare(password, user.password);
      if (!check) {
        return res
          .status(401)
          .json({
            success: false,
            message: "Please enter correct credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth = jwt.sign(data, JWT_KEY);
      res.json({ success: true, auth });
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
  }
);

router.delete("/deleteUser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    User.findByIdAndDelete(userId)
      .exec()
      .then((deletedUser) => {
        return res
          .json({ message: "Deleted Successfully", success: true })
          .status(200);
      })
      .catch((error) => {
        return res
          .json({ message: "Not able to delete", success: false })
          .status(409);
      });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

router.put("/updateUser", fetchUser, async (req, res) => {
  try {
    const { gender, username} = req.body;
    let user = User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: "false" });
    }
    let updatedUser = {};
    if (gender) {
      if (
        !(
          gender != "male" ||
          gender != "Male" ||
          gender != "female" ||
          gender != "Female"
        )
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Please provide a correct gender" });
      }
      updatedUser.gender = gender;
    }
    if(sports){
      const salt = await bcrypt.genSalt(10);
      const secSports=await bcrypt.hash(req.body.sports.toLowerCase(),salt)
      updatedUser.sports=secSports;
    }
    if (username) {
      updatedUser.username = username;
    }
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedUser },
      { new: true }
    );
    res.json({ message: "Updated Successfully", success: "true" }).status(200);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    id = req.user.id;
    const user = await User.findById(id).select("-password"); //select everything except password from db
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success:false,message: "Internal Server error" });
  }
});



router.post("/forgotPassword",[
  body("sport").isLength({ min: 5 }),
  body("email").isEmail(),
],async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ success: false, message: errors.array() });
    }
    try{
      const user=await User.findOne({email:req.body.email})
    if(!user){
      return res.status(402).json({success:false,message:"Please enter correct credentials"})
    }
    const sports=req.body.sport.toLowerCase();
    const check = await bcrypt.compare(sports, user.sports);
    console.log(check)
    if(!check){
      return res.status(403).json({success:false,message:"Please enter correct credentials"})
    }
    res.status(200).json({success:"true",message:"Correct credentials"})
    }catch(e){
      console.error(e.message);
      res.status(500).json({ success:false,message: "Internal Server error" });
    } 
})


router.post('/changePassword',[
  body("password").isLength({ min: 3 }),
],async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ success: false, message: errors.array() });
    }
  try{
    let user=await User.findOne({email:req.body.email})
    if(!user){
      return res.status(401).json({success:false,message:"Please enter correct credentials"})
    }
  let updatedUser = {};
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    updatedUser.password=secPass
    user = await User.findByIdAndUpdate(
      user.id,
      { $set: updatedUser },
      { new: true }
    );
    res.json({ message: "Updated Successfully", success: "true" }).status(200);
  }catch(e){
      console.error(e.message);
      res.status(500).json({ success:false,message: "Internal Server error" });
  }
})





module.exports = router;
