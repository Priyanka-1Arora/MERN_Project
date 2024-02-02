import React,{useContext} from 'react'
import noteContext from '../Context/Notes/noteContext'

export default function EachNote(props) {
    const {value}=props
    const context=useContext(noteContext)
  return (
    <>
      <div className="col-lg-4">
      <div className="card" style={{"width": "300px",height:"300px",marginBottom:"19px"}}>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{value.category.toUpperCase()}
    <span class="visually-hidden">unread messages</span>
  </span>
        <div className="card-body">
          <h5 className="card-title">{value.title}</h5>
          <p className="card-text">
            {value.description}
          </p>
          <i class="fa-solid fa-trash-can ml-3" style={{cursor:"pointer"}} onClick={()=>{
            // deleteNote(value._id)
          }}></i>
          <i class="fa-solid fa-pen-to-square mx-3" style={{cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{}}></i>
          <i class="fa-solid fa-comments" style={{cursor:"pointer"}}></i>
        </div>
      </div>
    </div>
    </>
  )
}
