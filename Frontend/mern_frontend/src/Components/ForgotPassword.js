import React,{useState,useContext} from 'react'
import { useNavigate} from "react-router-dom";
import userForgotContext from '../Context/User/userForgotContext';

export default function ForgotPassword() {
    const context = useContext(userForgotContext);
    const {emailEnter}=context
    const [email,setEmail]=useState("")
    const [sport,setSport]=useState("")
    const navigate = useNavigate();
    const onEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const onSportsChange=(e)=>{
        setSport(e.target.value)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/forgotPassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email,sport}),
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            emailEnter(email)
            navigate("/changePassword")
          }
          else{

          }
    }

  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center
    w-100 h-100 p-5"
        style={{ height: "100%",backgroundColor:"mistyrose"}}
      >
        <div
          className="container p-5 text-white"
          style={{
            backgroundColor: "rgb(42, 40, 40)",
            borderRadius: "25px",
            fontFamily: "sans-serif",
            width:"650px",
            height:"550px"
          }}
        >
          <h1 className="text-center p-4" style={{ fontSize: "60px" }}>
            ENTER
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{fontSize:"27px"}}>
                Email address
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
            <div className="mb-3">
            <label htmlFor="pass" className="form-label" style={{fontSize:"27px"}}>
              Enter your favoutrite sports
            </label>
            <input type="text" className="form-control" name="sports" id="sports" required minLength={3} value={sport} onChange={onSportsChange}/>
          </div>
            <div className="p-3 d-flex align-items-center justify-content-center mr-5">
            <button type="submit" className="btn mr-4" style={{fontSize:"27px",backgroundColor:"mistyrose"}}>
              Enter
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
