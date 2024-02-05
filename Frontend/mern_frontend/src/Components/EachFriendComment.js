import React from 'react'

export default function EachFriendComment(props) {
    const {n}=props
  return (
    <>
    <div className='col-lg-3' style={{margin:"20px"}}>
     <div class="card" style={{width: "250px",border:"2px solid red"}}>
     <div style={{ display: "flex", alignItems: "center",marginLeft:"5px",marginTop:"3px"}}>
      {(n.gender==="Male"||n.gender==="male")?<><img className='' style={{borderRadius:"50%",height:"50px",width:"50px"}} src="http://localhost:5000/images/male.png"></img>{n.username}</>:<><img className='' style={{borderRadius:"50%",height:"50px",width:"50px",display:"flex"}} src="http://localhost:5000/images/female(1).png"></img>{n.username}</>}</div>
  <div class="card-body">
    <p class="card-text">{n.description}</p>
  </div>
    </div> 
    </div>
    </>
  )
}
