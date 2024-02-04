import React from 'react'

export default function SingleFriendNotes(props) {
    const {note,username}=props
  return (
    <>
     <div className="col-lg-4">
      <div className="card" style={{"width": "300px",height:"auto",marginBottom:"19px"}}>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{note.category.toUpperCase()}
    <span class="visually-hidden">unread messages</span>
  </span>
        <div className="card-body">
          <h5 className="card-title">{note.title.toUpperCase()}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <p className='card-text'><l style={{fontWeight:"bold"}}>Username:</l>{username}</p>
          <i class="fa-solid fa-comments" style={{cursor:"pointer"}}>VIEW COMMENTS</i>
        </div>
      </div>
    </div>  
    </>
  )
}
