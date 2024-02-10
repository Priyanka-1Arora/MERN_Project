import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from "./SuccessAlert";
import WarningAlert from "./WarningAlert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();


  const [openSuccessModal,setOpenSuccessModal]=useState(false)
  const [hideSuccessModal,setHideSuccessModal]=useState(false)
  const [openWarningModal,setOpenWarningModal]=useState(false)
  const [hideWarningsModal,setHideWarningModal]=useState(false)
  const [message,setMessage]=useState("")

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    setMessage(json.message)
    if (json.success) {
      setEmail("");
      setPassword("");
      localStorage.setItem("token", json.auth);
      setOpenSuccessModal(true)
      setTimeout(()=>{
        setOpenSuccessModal(false)
        setHideSuccessModal(true)
        navigate("/homeFollowers");
      },1000)
    } 
    else{
      setOpenWarningModal(true)
      setTimeout(()=>{
        setOpenWarningModal(false)
        setHideWarningModal(true)
      },1000)
    }
  };

  return (
    <>
  



<SuccessAlert  openModal={openSuccessModal}   hideModal={hideSuccessModal}   message={message}/>
<WarningAlert openModal={openWarningModal}    hideModal={hideWarningsModal}   message={message}/>


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
            LOGIN
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
              Password
            </label>
            <input type="password" className="form-control" name="password" id="password" required minLength={3} value={password} onChange={onPasswordChange}/>
          </div>
            <div className="p-3 d-flex align-items-center justify-content-center mr-5">
            <button type="submit" className="btn mr-4" style={{fontSize:"27px",backgroundColor:"mistyrose"}}>
              Log In
            </button>
            <button className="btn mx-4" style={{fontSize:"27px",backgroundColor:"mistyrose" }} onClick={()=>{navigate('/signup')}}>
              Sign Up
            </button>
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{cursor:"pointer"}} onClick={()=>{navigate('/forgotPassword')}}>
              Forgot Your Password?
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
