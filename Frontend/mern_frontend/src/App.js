import './App.css';
import Login from './Components/Login';
import {
  Route,
  Routes
} from "react-router-dom";
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';
import GetUser from './Context/User/GetUser';
import LogOut from './Components/LogOut';
import ForgotPassword from './Components/ForgotPassword';
import ForgotUser from './Context/User/ForgotUser';
import ChangePassword from './Components/ChangePassword';
import Home from './Components/Home';
import SendFriendRequest from './Components/SendFriendRequest';
import ShowFriendRequests from './Components/ShowFriendRequests';
import AddNotes from './Components/AddNotes';
import NoteState from './Context/Notes/NoteState';
import MyNotes from './Components/MyNotes';
import FriendNoteState from './Context/Notes/FriendNoteState';
import FriendsNotes from './Components/FriendsNotes';
import ShowFriendNotesComment from './Components/ShowFriendNotesComment';
// import { useEffect,useContext } from 'react';
// import userContext from './Context/User/userContext';

function App() {
  return (
    <>
    <ForgotUser>
      <GetUser>
        <NoteState>
          <FriendNoteState>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/signup' element={<SignUp />}></Route>
        <Route exact path='/homeFollowers' element={<Home />}></Route>
        <Route exact path='/homeFollowing' element={<Home />}></Route>
        <Route exact path='/logout' element={<LogOut />}></Route>
        <Route exact path='/forgotPassword' element={< ForgotPassword />}></Route>
        <Route exact path='/changePassword' element={<ChangePassword />}></Route> 
        <Route exact path='/sendFriendRequest' element={<SendFriendRequest/>}></Route>
        <Route exact path='/friendRequests' element={<ShowFriendRequests />}></Route>
        <Route exact path='/addNotes' element={<AddNotes />}></Route>
        <Route exact path='/myNotes' element={<MyNotes />}></Route>
        <Route exact path='/friendNotes' element={<FriendsNotes />}></Route>
        <Route exact path='/viewFriendNotesComment' element={<ShowFriendNotesComment />}></Route>
      </Routes>
      </FriendNoteState>
      </NoteState>
      </GetUser></ForgotUser>
    </>
  );
}

export default App;
