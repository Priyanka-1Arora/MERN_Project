import React,{useContext} from 'react'
import friendContext from '../Context/Notes/friendContext'
import { useNavigate } from 'react-router-dom'

export default function SingleFriendNotes(props) {
    const {note,username,gender}=props
    const contextFriend=useContext(friendContext)
    const {viewComment}=contextFriend
    const navigate=useNavigate()
  return (
    <>
     <div className="col-lg-4">
     {/* {(gender==="Male"||gender==="male")?<img className='' style={{borderRadius:"50%",height:"50px",width:"50px"}} src="http://localhost:5000/images/male.png"></img>:<img className='' style={{borderRadius:"50%",height:"50px",width:"50px"}} src="http://localhost:5000/images/female(1).png"></img>} */}
     {/*username */}
      <div className="card" style={{"width": "300px",height:"auto",marginBottom:"19px"}}>
      <div style={{ display: "flex", alignItems: "center",marginLeft:"5px",marginTop:"3px"}}>
      {(gender==="Male"||gender==="male")?<><img className='' style={{borderRadius:"50%",height:"50px",width:"50px"}} src="http://localhost:5000/images/male.png"></img>{username}</>:<><img className='' style={{borderRadius:"50%",height:"50px",width:"50px",display:"flex"}} src="http://localhost:5000/images/female(1).png"></img>{username}</>}</div>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{note.category.toUpperCase()}
    <span class="visually-hidden">unread messages</span>
  </span>
        <div className="card-body">
          <h5 className="card-title">{note.title.toUpperCase()}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <p className='card-text'><l style={{fontWeight:"bold"}}>Username:</l>{username}</p>
          <i class="fa-solid fa-comments" style={{cursor:"pointer"}} onClick={()=>{viewComment(note._id,username)
          setTimeout(()=>{
            navigate('/viewFriendNotesComment')
          },1000)}}>VIEW COMMENTS</i>
        </div>
      </div>
    </div>  
    </>
  )
}
