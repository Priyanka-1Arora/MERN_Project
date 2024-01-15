import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function LogOut() {
    const navigate=useNavigate();
    const a=()=>{
        navigate("/")
    }
    useEffect(()=>{
        localStorage.clear()
        setTimeout(()=>{
            a()
        },3000)
    },[])
  return (
    <div>
      <h1 className='m-5 container-fluid d-flex align-items-center justify-content-center'>LOGGED OUT SUCCESSFULLY</h1>
    </div>
  )
}
