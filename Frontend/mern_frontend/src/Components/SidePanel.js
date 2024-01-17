import React,{useEffect} from 'react';
import {
    Link,useLocation
  } from "react-router-dom";

export default function SidePanel() {
    const location=useLocation();
    useEffect(()=>{
    console.log(location.pathname)
  },[location])

  return (
    <>
      <div className=' text-white d-flex flex-column align-items-center' style={{ backgroundColor: "gray", height: "510px",marginTop:"119px",position:"fixed",width:"18%"}}>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/home'?"black":"gray"}`,color:`${location.pathname==='/home'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/home' style={{textDecoration:"none",color:`${location.pathname==='/home'?"white":"white"}`}}>HOME</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/viewFriends'?"black":"gray"}`,color:`${location.pathname==='/home'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/viewFriends' style={{textDecoration:"none",color:`${location.pathname==='/viewFriends'?"white":"white"}`}}>VIEW FRIENDS</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/sendFriendRequest'?"black":"gray"}`,color:`${location.pathname==='/sendFriendRequest'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/sendFriendRequest' style={{textDecoration:"none",color:`${location.pathname==='/sendFriendRequest'?"white":"white"}`}}>ADD FRIENDS</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/addNotes'?"black":"gray"}`,color:`${location.pathname==='/home'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/home' style={{textDecoration:"none",color:`${location.pathname==='/addNotes'?"white":"white"}`}}>ADD NOTES</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/myNotes'?"black":"gray"}`,color:`${location.pathname==='/home'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/home' style={{textDecoration:"none",color:`${location.pathname==='/myNotes'?"white":"white"}`}}>MY NOTES</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/myNotes'?"black":"gray"}`,color:`${location.pathname==='/home'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/home' style={{textDecoration:"none",color:`${location.pathname==='/myNotes'?"white":"white"}`}}>FRIENDS NOTES</Link>
            </div>
          </div>
          <div className='row mt-3' style={{border:"4px solid black",width:"100%", backgroundColor:`${location.pathname==='/friendRequests'?"black":"gray"}`,color:`${location.pathname==='/friendRequests'?"white":"black"}`}}>
            <div className='col-lg-12' style={{fontSize:"25px"}}>
                <Link to='/friendRequests' style={{textDecoration:"none",color:`${location.pathname==='/friendRequests'?"white":"white"}`}}>FRIEND REQUESTS</Link>
            </div>
          </div>
      </div>
    </>
  );
}
