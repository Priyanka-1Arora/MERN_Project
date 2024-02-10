import React, { useContext } from 'react'
import userContext from '../Context/User/userContext';

export default function FollowingItemView(props) {
  const context=useContext(userContext)
  const {getUser}=context
    const {username,gender,id}=props
    const {setMessage,setHideWarningModal,setOpenWarningModal,setOpenSuccessModal,setHideSuccessModal}=props
    const removeFollowing=async(e)=>{
      e.preventDefault();
        const response = await fetch("http://localhost:5000/api/friend/removeFollowingFriend", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem("token")
            },
            body:JSON.stringify({user:id})
          });
          const json=await response.json(); 
          setMessage(json.message)
          if (json.success) {
            setOpenSuccessModal(true)
            setTimeout(()=>{
              setOpenSuccessModal(false)
              setHideSuccessModal(true)
            },1000)
          } 
          else{
            setOpenWarningModal(true)
            setTimeout(()=>{
              setOpenWarningModal(false)
              setHideWarningModal(true)
            },1000)
          }
          setTimeout(()=>{
            getUser()
          },1000)
    }
  return (
    <>
      <div class="card d-flex align-items-center justify-content-center flex-column" style={{"width": "14rem",margin:"5px",marginBottom:"10px",backgroundColor:"rgb(179, 177, 177)"}}>
      {(gender==="Male"||gender==="male")?<img className='mx-3 mt-2' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/male.png"></img>:<img className='mx-3 mt-2' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/female(1).png"></img>}
  <div class="card-body">
    <p class="card-text text-center" style={{fontFamily:"monospace",fontWeight:"bolder"}}>{username}</p>
    <button className='btn mb-2 mx-2' style={{backgroundColor:"black",color:"aquamarine"}} onClick={removeFollowing}>REMOVE</button>
  </div>
</div>
    </>
  )
}
