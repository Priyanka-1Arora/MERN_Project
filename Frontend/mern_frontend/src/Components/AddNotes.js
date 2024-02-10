import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import SidePanel from './SidePanel'
import noteContext from '../Context/Notes/noteContext';
import SuccessAlert from "./SuccessAlert";
import WarningAlert from "./WarningAlert";

export default function AddNotes() {
  const {addNote}=useContext(noteContext)
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("")

    const [openSuccessModal,setOpenSuccessModal]=useState(false)
  const [hideSuccessModal,setHideSuccessModal]=useState(false)
  const [openWarningModal,setOpenWarningModal]=useState(false)
  const [hideWarningsModal,setHideWarningModal]=useState(false)
  const [message,setMessage]=useState("")


    const onTitleChange=((e)=>{
        setTitle(e.target.value)
    })
    const handleSubmit=(async (e)=>{
      e.preventDefault()
      console.log(description+"  "+category+"   "+title)
      const ans=await addNote(description,category,title)
      setMessage(ans.message)
      if(ans.success==true){
        setOpenSuccessModal(true)
      setTimeout(()=>{
        setOpenSuccessModal(false)
        setHideSuccessModal(true)
      },1000)
        setTitle("");
        setCategory("")
        setDescription("")
      }
      else{
        setOpenWarningModal(true)
        setTimeout(()=>{
          setOpenWarningModal(false)
          setHideWarningModal(true)
        },1000)
      }
    })
    const onDescriptionchange=((e)=>{
        setDescription(e.target.value)
    })
    const onCategoryChange=((e)=>{
      setCategory(e.target.value)
    })
  return (
    <>
    <SuccessAlert  openModal={openSuccessModal}   hideModal={hideSuccessModal}   message={message}/>
<WarningAlert openModal={openWarningModal}    hideModal={hideWarningsModal}   message={message}/>
      <Navbar />
      <div className=''>
        <div className='row'>
          <div className='col-lg-2' style={{width:"280px"}}>
            <SidePanel />
          </div>
          <div className='col-lg-9' style={{backgroundColor:"mistyrose",marginLeft:"-9px" ,width:"80%",marginTop:"50px"}}>
          <div className='row ' style={{marginTop:"60px",marginBottom:"60px"}}>
          <div
          className="container p-5 text-white "
          style={{
            backgroundColor: "rgb(42, 40, 40)",
            borderRadius: "25px",
            fontFamily: "sans-serif",
            width:"750px",
            height:"600px",
            marginTop:"60px"
          }}
        >
            <h1 className="text-center px-4" style={{ fontSize: "50px" }}>ADD NOTE</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{fontSize:"27px"}}>
                Enter title
              </label>
              <input
                type="text"
                value={title}
                onChange={onTitleChange}
                className="form-control" required
                minLength={3}
              />
            </div>
            <div class="mb-3">
          <label class="form-label" style={{fontSize:"27px"}}>
            Category
          </label>
          <input
                type="text"
                value={category}
                onChange={onCategoryChange}
                className="form-control" required
                minLength={3}
              />
        </div>
        <div class="mb-3">
          <label class="form-label" style={{fontSize:"27px"}}>
            Description
          </label>
          <br />
          <textarea
          minLength={10}
          maxLength={200}
          required
          onChange={onDescriptionchange}
          class="form-control"
            id="description"
            name="description"
            value={description}
          />
          <k style={{color:"grey"}}>MaxLetters:200</k>
        </div>
            <div className="p-3 d-flex align-items-center justify-content-center mr-5">
            <button type="submit" className="btn mr-4" style={{fontSize:"27px",backgroundColor:"mistyrose",marginTop:"-33px"}}>
              Enter
            </button>
            </div>
          </form>
        </div>
          </div>
          </div>
          </div>
          </div>
    </>
  )
}
