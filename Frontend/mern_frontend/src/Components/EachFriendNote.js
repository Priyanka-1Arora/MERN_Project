import React, { useEffect } from 'react'
import SingleFriendNotes from './SingleFriendNotes'

export default function EachFriendNote(props) {
    useEffect(()=>{
        console.log(value.notes)
    },[])
    const {value}=props
  return (
    <>
    {props.value.notes.map((n) => (
                <SingleFriendNotes key={n._id} note={n} username={props.value.username} gender={props.value.gender}/>
    ))}
    </>
  )
}
