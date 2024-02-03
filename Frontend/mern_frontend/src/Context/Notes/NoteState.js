import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState=(props)=>{
    const [notes,setNotes]=useState([])
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
        const json=response.json(); 

        //CLIENT
        const newNotes=notes.filter((e)=>e._id!==id)
        setNotes(newNotes)
      }


      const editNote=async (id,category,description,title)=>{
        console.log(id+"     "+category+"     99999999999")
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
        const json=response.json(); 
        getNotes()
      }


    return (
    <noteContext.Provider value={{notes,addNote,getNotes,deleteNote,editNote}}>{props.children}</noteContext.Provider>
    )
}

export default NoteState;