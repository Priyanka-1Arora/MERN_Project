import './App.css';
import Login from './Components/Login';
import {
  Route,
  Routes
} from "react-router-dom";
import SignUp from './Components/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/signup' element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App;
