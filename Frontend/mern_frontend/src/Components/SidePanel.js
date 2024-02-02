import React,{useEffect,useContext} from 'react';
import {
    Link,useLocation
  } from "react-router-dom";
  import userContext from '../Context/User/userContext';

export default function SidePanel() {
    const location=useLocation();
    useEffect(()=>{
    console.log(location.pathname)
  },[location])
  const context = useContext(userContext);
  const { getUser, user } = context;

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [user && user.requests && user.requests.length]);

  return (
    <>
      <div className=' text-white d-flex flex-column align-items-center' style={{ backgroundColor: "gray", height: "510px",marginTop:"119px",position:"fixed",width:"18%"}}>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${(location.pathname==='/homeFollowers'|| location.pathname==='/homeFollowing')?"black":"gray"}`,color:`${(location.pathname==='/homeFollowers'|| location.pathname==='/homeFollowing')?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/homeFollowers' style={{textDecoration:"none",color:`${location.pathname==='/homeFollowers'?"white":"white"}`}}>HOME</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/sendFriendRequest'?"black":"gray"}`,color:`${location.pathname==='/sendFriendRequest'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/sendFriendRequest' style={{textDecoration:"none",color:`${location.pathname==='/sendFriendRequest'?"white":"white"}`}}>ADD FRIENDS</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/addNotes'?"black":"gray"}`,color:`${location.pathname==='/addNotes'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/addNotes' style={{textDecoration:"none",color:`${location.pathname==='/addNotes'?"white":"white"}`}}>ADD NOTES</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/myNotes'?"black":"gray"}`,color:`${location.pathname==='/home'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/myNotes' style={{textDecoration:"none",color:`${location.pathname==='/myNotes'?"white":"white"}`}}>MY NOTES</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/myNotes'?"black":"gray"}`,color:`${location.pathname==='/home'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/home' style={{textDecoration:"none",color:`${location.pathname==='/myNotes'?"white":"white"}`}}>FRIENDS NOTES</Link>
            </div>
          </div>
          <div className='row mt-3 position-relative' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/friendRequests'?"black":"gray"}`,color:`${location.pathname==='/friendRequests'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/friendRequests' style={{textDecoration:"none",color:`${location.pathname==='/friendRequests'?"white":"white"}`}}>FRIEND REQUESTS
                {(user && user.requests && user.requests.length!=0) ? <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{user.requests.length}
    <span class="visually-hidden">unread messages</span>
  </span>:<></>}
                </Link>
            </div>
          </div>
      </div>
    </>
  );
}
