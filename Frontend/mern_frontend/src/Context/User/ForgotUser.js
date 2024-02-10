import React, { useEffect, useState } from "react";
import userForgotContext from "./userForgotContext";
import { useNavigate } from "react-router-dom";

const ForgotUser=(props)=>{
    const[email,setEmail]=useState("");
    const emailEnter=(mail)=>{
        setEmail(mail)
    }


    const changePassword=async (p)=>{
        const response = await fetch("http://localhost:5000/api/auth/changePassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email:email,password:p})
          });
          const json=await response.json();
          return {success:json.success,message:json.message}
    }
    return (
        <userForgotContext.Provider value={{emailEnter,changePassword}}>{props.children}</userForgotContext.Provider>
    )
}
export default ForgotUser