import React, { useContext,useEffect } from 'react'
import noteContext from '../Context/Notes/noteContext'
import Navbar from './Navbar'
import SidePanel from './SidePanel'
import { useNavigate } from 'react-router-dom'
import EachNote from './EachNote'

export default function MyNotes() {
    const history=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')!=null){
          getNotes()
        }
        else{
          history('/login')
        }
      },[])
    const {getNotes,notes}=useContext(noteContext)
  return (
    <>
     <Navbar />
      <div className=''>
        <div className='row'>
          <div className='col-lg-2' style={{width:"280px"}}>
            <SidePanel />
          </div>
          <div className='col-lg-9' style={{marginLeft:"-9px" ,width:"80%",marginTop:"150px"}}>
          <div className='row'>
          {notes.map((n)=>{
            return <EachNote  key={n._id} value={n}></EachNote>
        })}
          </div>
          </div>
          </div>
          </div> 
    </>
  )
}
