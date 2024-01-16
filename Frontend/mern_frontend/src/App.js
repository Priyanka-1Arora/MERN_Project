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
import AddFriends from './Components/AddFriends';
import ViewFriends from './Components/ViewFriends';

function App() {
  return (
    <>
    <ForgotUser>
      <GetUser>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/signup' element={<SignUp />}></Route>
        <Route exact path='/home' element={<Home />}></Route>
        <Route exact path='/logout' element={<LogOut />}></Route>
        <Route exact path='/forgotPassword' element={< ForgotPassword />}></Route>
        <Route exact path='/changePassword' element={<ChangePassword />}></Route> 
        <Route exact path='/addFriends' element={<AddFriends />}></Route>
        <Route exact path='/viewFriends' element={<ViewFriends />}></Route>
      </Routes>
      </GetUser></ForgotUser>
    </>
  );
}

export default App;
