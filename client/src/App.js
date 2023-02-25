import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Landingpage from './components/Landingpage';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import NoteState from './context/notes/NoteState';
import './styles/auth.css'

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (alertMsg, type) => {
    setAlert({
      alertMsg: alertMsg,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/' element={<Landingpage showAlert={showAlert} />} />
            <Route exact path='/home' element={<Home showAlert={showAlert} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
