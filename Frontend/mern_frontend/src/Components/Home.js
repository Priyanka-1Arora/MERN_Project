import Navbar from './Navbar';
import SidePanel from './SidePanel';
import React, { useEffect, useContext,useState } from 'react';
import userContext from '../Context/User/userContext';
import {
  Link,useLocation
} from "react-router-dom";
import ViewFollowersHome from './ViewFollowersHome';
import ViewFollowingHome from './ViewFollowingHome';
import SuccessAlert from "./SuccessAlert";
import WarningAlert from "./WarningAlert";

export default function Home() {
  const location=useLocation();
  const context = useContext(userContext);
  const { getUser, user } = context;
  const [openSuccessModal,setOpenSuccessModal]=useState(false)
  const [hideSuccessModal,setHideSuccessModal]=useState(false)
  const [openWarningModal,setOpenWarningModal]=useState(false)
  const [hideWarningsModal,setHideWarningModal]=useState(false)
  const [message,setMessage]=useState("")

  useEffect(()=>{
    getUser();
  },[])
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [user && user.followers && user.followers.length, user && user.following && user.following.length]);
  // Add null checks for user and its properties
  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;
  return (
    
    <>
    <SuccessAlert  openModal={openSuccessModal}   hideModal={hideSuccessModal}   message={message}/>
<WarningAlert openModal={openWarningModal}    hideModal={hideWarningsModal}   message={message}/>
      <Navbar />
      <div className=''>
        <div className='row'>
          <div className='col-lg-2' style={{width:"280px"}}>
            <SidePanel />
          </div>
          <div className='col-lg-9' style={{marginTop:"170px",marginLeft:"20px"}}>
            <div className='row'>
              <div className='col-lg-4'>
              {(user.gender==="Male"||user.gender==="male")?<img className='mx-3 mb-1' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/male.png"></img>:<img className='mx-3' style={{borderRadius:"50%",height:"200px",width:"200px"}} src="http://localhost:5000/images/female(1).png"></img>}
              </div>
              <div className='col-lg-7' style={{fontSize:"30px",marginLeft:"-39px",marginTop:"17px"}}>
                <w style={{fontWeight:"bolder"}}>UserName:</w>&nbsp;{user.username}<br></br><w style={{fontWeight:"bolder"}}>Followers:</w>&nbsp;{followersCount}<br></br><w style={{fontWeight:"bolder"}}>Following:</w>&nbsp;{followingCount}
              </div>
            </div>
            <div className='row'>
              <Link className='col-lg-6 text-center p-2' style={{border:"2px solid black",fontWeight:"bolder",textDecoration:"none",color:`${location.pathname==='/homeFollowers'?'white':'black'}`,backgroundColor:`${location.pathname==='/homeFollowers'?'black':'white'}`}} to="/homeFollowers">FOLLOWERS</Link>
              <Link className='col-lg-6 text-center p-2' style={{border:"2px solid black",fontWeight:"bolder",textDecoration:"none",color:`${location.pathname==='/homeFollowing'?'white':'black'}`,backgroundColor:`${location.pathname==='/homeFollowing'?'black':'white'}`}} to="/homeFollowing"> FOLLOWING</Link>
            </div>
            <div className='row'>
              {location.pathname==='/homeFollowers' && <ViewFollowersHome setOpenSuccessModal={setOpenSuccessModal}
            setHideSuccessModal={setHideSuccessModal} setOpenWarningModal={setOpenWarningModal} setHideWarningModal={setHideWarningModal}
            setMessage={setMessage}/>}
              {location.pathname==='/homeFollowing' && <ViewFollowingHome setOpenSuccessModal={setOpenSuccessModal}
            setHideSuccessModal={setHideSuccessModal} setOpenWarningModal={setOpenWarningModal} setHideWarningModal={setHideWarningModal}
            setMessage={setMessage}/>}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
