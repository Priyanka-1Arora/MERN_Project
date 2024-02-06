import React,{useState} from "react"
import userContext from "./userContext"


const GetUser=(props)=>{
    const [user,setUser]=useState({});
    const getUser=async ()=>{
        const response = await fetch("http://localhost:5000/api/auth/getUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem("token")
            },
          });
          const json=await response.json(); 
          setUser(json)
          console.log(user)
    }
  return (
    <userContext.Provider value={{getUser,user}}>{props.children}</userContext.Provider>
  )
}

export default GetUser;
