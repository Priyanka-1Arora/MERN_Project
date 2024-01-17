import React from 'react'

export default function FriendItemView(props) {
    const {username,gender}=props
  return (
    <>
      <div class="card d-flex align-items-center justify-content-center flex-column" style={{"width": "14rem",margin:"5px",marginBottom:"10px"}}>
      {(gender==="Male"||gender==="male")?<img className='mx-3 mt-2' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/male.png"></img>:<img className='mx-3' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/female(1).png"></img>}
  <div class="card-body">
    <p class="card-text" style={{fontFamily:"monospace"}}>{username}</p>
  </div>
</div>
    </>
  )
}
