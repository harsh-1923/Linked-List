import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import WorkspaceState from './context/workspaces/WorkspaceState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';
function App() {
  const [alert, setAlert] = useState(null);


  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (

    <>
      <WorkspaceState>
        <NoteState>
          <Router>
            <Alert alert={alert}></Alert>
            <div>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/logIn" element={<Login showAlert={showAlert} />}></Route>
                <Route exact path="/signUp" element={<SignUp showAlert={showAlert} />}></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </WorkspaceState>
    </>
  );
}

export default App;
