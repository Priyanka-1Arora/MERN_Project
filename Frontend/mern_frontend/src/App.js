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

function App() {
  return (
    <>
      <GetUser>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/signup' element={<SignUp />}></Route>
        <Route exact path='/home' element={<Navbar />}></Route>
        <Route exact path='/logout' element={<LogOut />}></Route>
      </Routes>
      </GetUser>
    </>
  );
}

export default App;
