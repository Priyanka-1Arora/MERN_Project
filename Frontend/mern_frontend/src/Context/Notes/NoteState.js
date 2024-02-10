import React, { useState,useEffect } from "react";
import noteContext from "./noteContext";


const NoteState=(props)=>{
    const [notes,setNotes]=useState([])
    const[commentNote,setCommentNote]=useState({})
    useEffect(()=>{
      console.log(notes)
    },[])
    const addNote=async(description,category,title)=>{

        const response=await fetch("http://localhost:5000/api/notes/addNote",{
            method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
          },
          body: JSON.stringify({category,description,title}),
        })
        const json=await response.json();
        setNotes(notes.concat(json.note))
        return {success:json.success,message:json.message}
    }
    const getNotes=async ()=>{
        const url='http://localhost:5000/api/notes/getNotes'
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
          }
        });
        const json=await response.json()
        console.log(json.notes)
        setNotes(json.notes)
      }

      const deleteNote= async(id)=>{
        const url=`http://localhost:5000/api/notes/deleteNote/${id}`
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
          },
        });
        const json=await response.json(); 

        //CLIENT
        const newNotes=notes.filter((e)=>e._id!==id)
        setNotes(newNotes)
        return {success:json.success,message:json.message}
      }


      const editNote=async (id,category,description,title)=>{
        const url=`http://localhost:5000/api/notes/updateNote/${id}`
        //API
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
          },
          body: JSON.stringify({category,description,title}),
        });
        const json=await response.json(); 
        getNotes()
        return {success:json.success,message:json.message}
      }

      const viewomment=async(id)=>{

      }
      const viewComment=async (id)=>{
        const url=`http://localhost:5000/api/friendNotes/getNotesToViewComment/?user=${id}`
        for(let i=0;i<notes.length;i++){
          console.log(notes[i]._id.toString()+"    "+id)
          if(notes[i]._id.toString()==id){
            console.log("Enjoy")
            setCommentNote(notes[i])
            console.log(notes[i])
            console.log(notes[i].comments)
          }
        }
      }

    return (
    <noteContext.Provider value={{notes,addNote,getNotes,deleteNote,editNote,viewComment,commentNote}}>{props.children}</noteContext.Provider>
    )
}

export default NoteState;