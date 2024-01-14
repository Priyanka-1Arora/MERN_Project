import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate=useNavigate()
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [gender,setGender]=useState("");
    const [password,setPassword]=useState("");
    const onEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const onGenderChange=(e)=>{
        setGender(e.target.value)
    }
    const onPasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const onUserNameChange=(e)=>{
        setUserName(e.target.value)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:email,password:password,username:userName,gender:gender}),
          });
          const json=await response.json(); 
          console.log(json.message)
          if(json.success){
            navigate("/")
            localStorage.setItem("token",json.auth)
          }
        //   else{
        //     props.setMessage(json.message)
        //     history("/alert")
        //   }
    }
  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center
    w-100 h-100 p-5"
        style={{ height: "100%",backgroundColor:"mistyrose"}}
      >
        <div
          className="container p-5 pt-4 text-white"
          style={{
            backgroundColor: "rgb(42, 40, 40)",
            borderRadius: "25px",
            fontFamily: "sans-serif",
            width:"650px",
            height:"650px"
          }}
        >
          <h1 className="text-center" style={{ fontSize: "60px" }}>
            SIGN UP
          </h1>
          <form onSubmit={handleSubmit}>
          <div className='mb-3'>
                <label className='form-label' style={{fontSize:"27px"}} >
                    UserName
                </label>
                <input type="text" className="form-control" minLength={5} onChange={onUserNameChange} value={userName}/>
            </div>
            <div className='mb-3'>
                <label className='form-label' style={{fontSize:"27px"}} >
                    Gender
                </label>
                <input type="text" className="form-control" value={gender}
                onChange={onGenderChange}/>
            </div>
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
          </form>
        </div>
      </div>
    </>
  )
}
