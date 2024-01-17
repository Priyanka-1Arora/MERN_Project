import React from 'react'

export default function EachRequest(props) {
    const{username,gender}=props
  return (
    <>
      <div class="card d-flex align-items-center justify-content-center flex-column" style={{"width": "17rem",margin:"5px",marginBottom:"10px",backgroundColor:"rgb(179, 177, 177)"}}>
      {(gender==="Male"||gender==="male")?<img className='mx-3 mt-5' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/male.png"></img>:<img className='mx-3' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/female(1).png"></img>}
  <div class="card-body">
    <p class="card-text text-center text-black" style={{fontFamily:"monospace",fontSize:"27px",fontWeight:"bolder"}}>{username}</p>
    <button className='btn m-2' style={{backgroundColor:"black",color:"aquamarine"}}>ACCEPT</button>
    <button className='btn m-2' style={{backgroundColor:"black",color:"aquamarine"}}>DECLINE</button>
  </div>
</div> 
    </>
  )
}
