require("dotenv").config();
const JWT_KEY = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');



const fetchUser=(req,res,next)=>{
    //get user from jwt token and add id to req body
    const token=req.header('auth-token') //get value of auth-token in header
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_KEY)
        req.user=data.user
        next();
    }catch(error){
        res.status(401).send({error:`Please authenticate using valid token${error.message}`})
    }
}


module.exports=fetchUser;