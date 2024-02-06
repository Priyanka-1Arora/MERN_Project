import React, { useContext, useEffect } from 'react'
import userContext from '../Context/User/userContext'
import friendContext from '../Context/Notes/friendContext'

export default function EachFriendComment(props) {
    const context=useContext(userContext)
    const {getUser,user}=context
    const contextFriend=useContext(friendContext)
    const {deleteComment}=contextFriend
    useEffect(()=>{
        getUser()
    },[])
    const {n}=props
  return (
    <>
    <div className='col-lg-3' style={{margin:"20px"}}>
     <div class="card" style={{width: "250px",border:"2px solid red"}}>
     <div style={{ display: "flex", alignItems: "center",marginLeft:"5px",marginTop:"3px"}}>
      {(n.gender==="Male"||n.gender==="male")?<><img className='' style={{borderRadius:"50%",height:"50px",width:"50px"}} src="http://localhost:5000/images/male.png"></img>{n.username}</>:<><img className='' style={{borderRadius:"50%",height:"50px",width:"50px",display:"flex"}} src="http://localhost:5000/images/female(1).png"></img>{n.username}</>}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(n.user==user._id.toString())?<><i class="fa-solid fa-trash-can ml-3 mb-1" style={{cursor:"pointer"}} onClick={()=>{
            deleteComment(n._id);
          }}></i>&nbsp;
          <i class="fa-solid fa-pen-to-square" style={{cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
            // console.log(value._id+"   "+value.description+"  "+value.title)
            // setNote({id:value._id,edescription:value.description,etitle:value.title,ecategory:value.category})
            // console.log(note.ecategory)
            // updateNote(value)
          }}></i>
      </>:<></>}
      </div>
  <div class="card-body">
    <p class="card-text">{n.description}</p>
  </div>
    </div> 
    </div>
    </>
  )
}
