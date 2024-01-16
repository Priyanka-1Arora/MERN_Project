import React ,{useState,useContext}from 'react'
import userForgotContext from '../Context/User/userForgotContext';

export default function ChangePassword() {
    const context = useContext(userForgotContext);
    const {changePassword}=context
    const [password,setPassword]=useState("")
const onPasswordChange=(e)=>{
    setPassword(e.target.value)
}
const handleSubmit=(e)=>{
    console.log("llll")
    e.preventDefault()
    changePassword(password);
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
            <label htmlFor="pass" className="form-label" style={{fontSize:"27px"}}>
              New Password
            </label>
            <input type="password" className="form-control" name="password" id="password" required minLength={3} value={password} onChange={onPasswordChange}/>
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
