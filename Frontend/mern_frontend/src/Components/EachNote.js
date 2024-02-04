import React,{useContext,useState,useEffect, useRef} from 'react'
import noteContext from '../Context/Notes/noteContext'

export default function EachNote(props) {
    const {value,updateNote}=props
    const context=useContext(noteContext)
    const {deleteNote}=context
//   useEffect(() => {
//     // Log the updated category value after the state is updated
//     console.log(note.ecategory);
//   }, [note]);
//   useEffect(() => {
//     // Update the local state when the value prop changes
//     setNote((prevNote) => ({
//       ...prevNote,
//       id: value._id,
//       edescription: value.description,
//       etitle: value.title,
//       ecategory: value.category,
//     }));
//   }, [value]);
   
  return (
    <>



      <div className="col-lg-4">
      <div className="card" style={{"width": "300px",height:"auto",marginBottom:"19px"}}>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{value.category.toUpperCase()}
    <span class="visually-hidden">unread messages</span>
  </span>
        <div className="card-body">
          <h5 className="card-title">{value.title.toUpperCase()}</h5>
          <p className="card-text">
            {value.description}
          </p>
          <i class="fa-solid fa-trash-can ml-3 mb-1" style={{cursor:"pointer"}} onClick={()=>{
            deleteNote(value._id)
          }}>&nbsp;DELETE NOTE</i><br></br>
          <i class="fa-solid fa-pen-to-square ml-3" style={{cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
            // console.log(value._id+"   "+value.description+"  "+value.title)
            // setNote({id:value._id,edescription:value.description,etitle:value.title,ecategory:value.category})
            // console.log(note.ecategory)
            updateNote(value)
          }}>&nbsp;UPDATE NOTE</i><br></br>
          <i class="fa-solid fa-comments ml-3" style={{cursor:"pointer"}}>&nbsp;VIEW COMMENTS</i>
        </div>
      </div>
    </div>
    </>
  )
}
