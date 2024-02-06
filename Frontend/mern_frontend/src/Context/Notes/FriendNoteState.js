import React, { useState, useContext, useEffect } from "react";
import friendContext from "./friendContext";
import userContext from "../User/userContext";

const FriendNoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const context = useContext(userContext);
  const { getUser, user } = context;
  const [commentNote, setCommentNote] = useState({});
  const [comments, setComments] = useState([]);
  
  const viewComment = async (id, username) => {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].username === username) {
        for (let j = 0; j < notes[i].notes.length; j++) {
          if (id === notes[i].notes[j]._id.toString()) {
            console.log(id + "   " + notes[i].notes[j]._id + "  " + notes[i].username);
            setCommentNote({ ...notes[i].notes[j], username: notes[i].username, gender: notes[i].gender });
            setComments(notes[i].notes[j].comments);
          }
        }
      }
    }
  };

  const addComment = async (description) => {
    console.log("HELLLLLOOOO");
    console.log(description);
  
    const response = await fetch(`http://localhost:5000/api/friendNotes/addComment?user=${commentNote._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ description }),
    });
  
    const json = await response.json();
  
    // Fetch the updated comments for the commentNote
    const updatedResponse = await fetch(`http://localhost:5000/api/friendNotes/getNotesToViewComment?user=${commentNote._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
  
    const updatedJson = await updatedResponse.json();
  
    // Set the comments state with the updated comments
    setComments(updatedJson.notes.comments || []);

    console.log(comments)
  };
  
  const editComment=async(id,description)=>{
    const updatedResponse = await fetch(`http://localhost:5000/api/friendNotes/editComment?user=${commentNote._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body:JSON.stringify({user:id,description:description})
    });
    const json=await updatedResponse.json()
    setComments(json.comments)
  }

  const deleteComment=async (id)=>{
    console.log(id)
    const updatedResponse = await fetch(`http://localhost:5000/api/friendNotes/deleteComment?user=${commentNote._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body:JSON.stringify({user:id})
    });
    const newNotes=comments.filter((e)=>e._id!==id)
    setComments(newNotes)
  }

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  useEffect(() => {
    console.log(commentNote);
    console.log(comments);
  }, [commentNote]);

  const getNote = async () => {
    getUser();
    setNotes([]);
    if (user && user.following && user.following.length > 0) {
      const promises = user.following.map(async (followedUser) => {
        console.log(followedUser.user + "  " + user.following.length);

        const response = await fetch(`http://localhost:5000/api/friendNotes/getFriendNotes?user=${followedUser.user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        const json = await response.json();
        console.log(json + " " + followedUser.user + "  " + user.following.length);
        return {
          username: followedUser.username,
          gender: followedUser.gender,
          notes: json.notes,
        };
      });
      const userNotes = await Promise.all(promises);
      setNotes(userNotes);
      console.log(userNotes);
    }
  };

  return <friendContext.Provider value={{ notes, getNote, viewComment, commentNote, addComment, comments ,deleteComment,editComment}}>{props.children}</friendContext.Provider>;
};

export default FriendNoteState;
