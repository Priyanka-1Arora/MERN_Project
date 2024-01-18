import React, { useState,useContext } from 'react'
import Navbar from './Navbar'
import SidePanel from './SidePanel'
import { useNavigate} from "react-router-dom";
import userContext from '../Context/User/userContext';

export default function SendFriendRequest() {
    const context = useContext(userContext);
  const { getUser } = context;
    const [email,setEmail]=useState("")
    const onEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const navigate=useNavigate()
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/friend/requestSent", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem("token")
            },
            body:JSON.stringify({email:email})
          });
          const json=await response.json(); 
          if(json.success){
            navigate("/home")
          }
          getUser()
    }
  return (
    <>
      <Navbar />
      <div className=''>
        <div className='row'>
          <div className='col-lg-2' style={{width:"280px",marginRight:"0px"}}>
            <SidePanel />
          </div>
          <div className='col-lg-9 ' style={{backgroundColor:"mistyrose",marginLeft:"-9px" ,width:"80%",marginTop:"50px"}}>
            <div className='row ' style={{marginTop:"60px",marginBottom:"60px"}}>
            <div
          className="container p-5 text-white "
          style={{
            backgroundColor: "rgb(42, 40, 40)",
            borderRadius: "25px",
            fontFamily: "sans-serif",
            width:"750px",
            height:"400px",
            marginTop:"60px"
          }}
        >
          <h1 className="text-center px-4 py-3" style={{ fontSize: "60px" }}>
            ADD FRIEND
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{fontSize:"27px"}}>
                Enter Email address of friend
              </label>
              <input
                type="email"
                value={email}
                onChange={onEmailChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp" required
              />
            </div>
            <div className="p-3 d-flex align-items-center justify-content-center mr-5">
            <button type="submit" className="btn mr-4" style={{fontSize:"27px",backgroundColor:"mistyrose"}}>
              Enter
            </button>
            </div>
          </form>
        </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
