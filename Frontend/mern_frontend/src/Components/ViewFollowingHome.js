import React, { useContext, useEffect, useState } from 'react';
import userContext from '../Context/User/userContext';
import FriendItemView from './FriendItemView';
import FollowingItemView from './FollowingItemView';

export default function ViewFollowingHome(props) {
    const context = useContext(userContext);
    const { user, getUser } = context;
    const {setMessage,setHideWarningModal,setOpenWarningModal,setOpenSuccessModal,setHideSuccessModal}=props


    useEffect(() => {
        getUser();
    }, [user && user.following && user.following.length]);


    return (
        <>
            <div className=''>
                <div className='row'>
                    {user && user.following && user.following.length === 0 ?
                        <>
                            <div className='col-lg-8 d-flex align-items-center justify-content-center' style={{marginTop:"20px",marginLeft:"200px"}}>
                                <div className='row'>
                                    <div className='col-lg-12 '>
                                        <h1 style={{ fontFamily: "monospace" }}>YOU ARE NOT FOLLOWING ANYONE</h1>
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
                            <div className='col-lg-12'>
                                <div className='row' style={{ marginTop: "10px" }}>
                                    {user && user.following && user.following.map((friend) => (
                                        <FollowingItemView id={friend.user} username={friend.username} gender={friend.gender} setOpenSuccessModal={setOpenSuccessModal}
                                        setHideSuccessModal={setHideSuccessModal} setOpenWarningModal={setOpenWarningModal} setHideWarningModal={setHideWarningModal}
                                        setMessage={setMessage}/>
                                    ))}
                                </div>
                            </div>
                        </>}
                </div>
            </div>
        </>
    );
}
