import React, { useState ,useContext} from "react";
import friendContext from "./friendContext";
import userContext from "../User/userContext";

const FriendNoteState=(props)=>{
    const [notes,setNotes]=useState([])
    const context=useContext(userContext)
    const {getUser,user}=context
    const getNote=async()=>{
        getUser();
        setNotes([])
        if(user && user.following && user.following.length>0){
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
                console.log(json+" "+followedUser.user + "  " + user.following.length);
                return {
                    username: followedUser.username,
                    notes: json.notes,
                };
            });
            const userNotes = await Promise.all(promises);
            setNotes(userNotes);
            console.log(userNotes)
        }
    }
    return (
        <friendContext.Provider value={{notes,getNote}}>{props.children}</friendContext.Provider>
        )
}
export default FriendNoteState;