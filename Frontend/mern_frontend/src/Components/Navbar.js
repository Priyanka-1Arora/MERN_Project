import React, { useEffect, useContext } from 'react';
import userContext from '../Context/User/userContext';
import {
  Link
} from "react-router-dom";

export default function Navbar() {
  const context = useContext(userContext);
  const { getUser, user } = context;

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:"fixed",zIndex:"999",width:"100%"}}>
  <div className="container-fluid">
    {(user.gender==="Male"||user.gender==="male")?<img className='mx-3' style={{borderRadius:"50%",height:"100px",width:"100px"}} src="http://localhost:5000/images/male.png"></img>:<img className='mx-3' style={{borderRadius:"50%",height:"100px",width:"100px"}} src="http://localhost:5000/images/female(1).png"></img>}
    <Link className="navbar-brand" to="#" style={{fontSize:"33px"}}>{user.username}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
    </div>
    <>
    <Link className="btn btn-primary mx-1 px-5" style={{fontSize:"20px"}} to="/logout" role="button">Edit Account</Link>
      <Link className="btn btn-primary mx-1 px-5" style={{fontSize:"20px"}} to="/logout" role="button">LogOut</Link>
    </>
  </div>
</nav>
    </>
    // <div>
    //   <div>
    //     {/* Display user information */}
    //     {user.username}
    //     {user.gender}
    //   </div>
    //   <div>
    //     {/* Display user photo */}
    //     {getImageUrl()}
    //     {getImageUrl() && <img src={getImageUrl()} alt="User Photo" />}
    //   </div>
    // </div>
  );
}
