import React, { useContext, useEffect } from 'react'
import userContext from '../Context/User/userContext'
import friendContext from '../Context/Notes/friendContext'
import SidePanel from './SidePanel'
import Navbar from './Navbar'
import EachFriendNote from './EachFriendNote'

export default function FriendsNotes() {
    const contextFriend=useContext(friendContext)
    const {notes,getNote}=contextFriend
    useEffect(() => {
        const fetchData = async () => {
            await getNote();
            console.log(notes);
        };

        fetchData();
    }, []);
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
          {notes.length==0?
          <>
          <div className='col-lg-8 d-flex align-items-center justify-content-center' style={{marginTop:"20px",marginLeft:"126px"}}>
              <div className='row'>
                  <div className='col-lg-12 '>
                      <h1 style={{ fontFamily: "monospace" }}>NO NOTES TO SHOW</h1>
                      <img className='d-flex align-items-center justify-content-center'
                          src="http://localhost:5000/images/teddy.jpg"
                          alt="Your Image Alt Text"
                          style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                      />
                  </div>
              </div>
          </div>
      </>
          :
          notes.map((n)=>{
            return <EachFriendNote value={n}></EachFriendNote>
        })
          }            </div> 
            </div> </div></div>
    </>
  )
}
