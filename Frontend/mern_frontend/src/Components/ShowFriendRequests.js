import React, { useContext, useEffect, useState } from 'react';
import userContext from '../Context/User/userContext';
import Navbar from './Navbar';
import SidePanel from './SidePanel';
import EachRequest from './EachRequest';

export default function ShowFriendRequests() {
    const context = useContext(userContext);
    const { user, getUser } = context;
    useEffect(() => {
        getUser();
    }, [user.requests]);
  return (
    <>
      <Navbar />
            <div className=''>
                <div className='row'>
                    <div className='col-lg-2' style={{ width: "280px", marginRight: "0px" }}>
                        <SidePanel />
                    </div>
                    {user.requests.length === 0 ?
                        <>
                            <div className='col-lg-8 d-flex align-items-center justify-content-center' style={{marginTop:"140px"}}>
                                <div className='row'>
                                    <div className='col-lg-12 '>
                                        <h1 style={{ fontFamily: "monospace" }}>NO REQUESTS TO SHOW</h1>
                                        <img className='d-flex align-items-center justify-content-center'
                                            src="http://localhost:5000/images/teddy.jpg"
                                            alt="Your Image Alt Text"
                                            style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className='col-lg-9' style={{backgroundColor:"mistyrose" ,height:"510px",marginTop:"120px",width:"81%",marginLeft:"260px"}}>
                                <div className='row' style={{marginLeft:"9px"}}>
                                    {user.requests.map((friend) => (
                                        <EachRequest username={friend.username} gender={friend.gender}/>
                                    ))}
                                </div>
                            </div>
                        </>}
                </div>
            </div>
    </>
  )
}
