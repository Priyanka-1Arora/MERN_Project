import React,{useContext,useState,useEffect, useRef} from 'react'
import noteContext from '../Context/Notes/noteContext'
import { useNavigate } from 'react-router-dom'

export default function EachNote(props) {
    const navigate=useNavigate()
    const {value,updateNote,setMessage,setHideWarningModal,setOpenWarningModal,setOpenSuccessModal,setHideSuccessModal}=props
    const context=useContext(noteContext)
    const {deleteNote,viewComment}=context
    const handleViewComments = () => {
      console.log("hello")
      viewComment(value._id)
        navigate('/test')
    }

    const delete_note=async (id)=>{
      const ans= await deleteNote(id)
      setMessage(ans.message)
      if(ans.success==true){
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
    }
   
  return (
    <>



      <div className="col-lg-4">
      <div className="card" style={{"width": "300px",height:"auto",marginBottom:"19px"}}>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{value.category.toUpperCase()}
    <span class="visually-hidden">unread messages</span>
  </span>
        <div className="card-body">
          <h3 className="card-title">{value.title.toUpperCase()}</h3>
          <p className="card-text">
            {value.description}
          </p>
          <i class="fa-solid fa-trash-can ml-3 mb-1" style={{cursor:"pointer"}} onClick={()=>{
            delete_note(value._id)
          }}>&nbsp;DELETE NOTE</i><br></br>
          <i class="fa-solid fa-pen-to-square ml-3" style={{cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
            updateNote(value)
          }}>&nbsp;UPDATE NOTE</i><br></br>
          <i class="fa-solid fa-comments ml-3" style={{cursor:"pointer"}}  onClick={handleViewComments}>&nbsp;VIEW COMMENTS</i>
        </div>
      </div>
    </div>
    </>
  )
}
