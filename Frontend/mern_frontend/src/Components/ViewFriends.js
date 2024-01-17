import React, { useContext, useEffect, useState } from 'react';
import userContext from '../Context/User/userContext';
import Navbar from './Navbar';
import SidePanel from './SidePanel';
import FriendItemView from './FriendItemView';

export default function ViewFriends() {
    const context = useContext(userContext);
    const { user, getUser } = context;
    const [friends, setFriends] = useState([]);

    async function sleep(ms) {
      await new Promise((resolve) => setTimeout(resolve, ms));
  }

    const getFriendsInfo = async () => {
        const friendsData = [];
        let a=user.friends.length
        console.log(a)
        for (let i = 0; i < 1; i++) {
            const response = await fetch("http://localhost:5000/api/friend/viewFriends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.friends[i].user })
            });
            const friendInfo = await response.json();
            console.log(friendInfo)
            friendsData.push(friendInfo);
            await sleep(5000);
        }
        console.log(friendsData)
        setFriends(friendsData);
    }

    useEffect(() => {
        getUser();
        if (user.friends.length > 0) {
          getFriendsInfo();
      }
    }, []);

    // useEffect(() => {
    //     if (user.friends.length > 0) {
    //         getFriendsInfo();
    //     }
    // }, [user.friends]);

    return (
        <>
            <Navbar />
            <div className=''>
                <div className='row'>
                    <div className='col-lg-2' style={{ width: "280px", marginRight: "0px" }}>
                        <SidePanel />
                    </div>
                    {user.friends.length === 0 ?
                        <>
                            <div className='col-lg-8 d-flex align-items-center justify-content-center'>
                                <div className='row'>
                                    <div className='col-lg-12 '>
                                        <h1 style={{ fontFamily: "monospace" }}>NO FRIENDS TO SHOW</h1>
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
                            <div className='col-lg-9'>
                                <div className='row' style={{ marginTop: "130px" }}>
                                    {friends.map((friend) => (
                                        <FriendItemView key={friend._id} username={friend.username} gender={friend.gender} />
                                    ))}
                                </div>
                            </div>
                        </>}
                </div>
            </div>
        </>
    );
}
