import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import WorkSpaceDisplayPage from "./Pages/WorkSpaceDisplayPage/WorkSpaceDisplayPage.jsx";
import SingleWorkSpacePage from "./Pages/SingleWorkSpacePage/SingleWorkSpacePage.jsx";

import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userhome" element={<WorkSpaceDisplayPage />} />
        <Route path="/workspace/:uid" element={<SingleWorkSpacePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

// import Home from "./components/Home";
// import About from "./components/About";
// import NoteState from "./context/notes/NoteState";
// import Alert from "./components/Alert";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";

// const [alert, setAlert] = useState(null);

// const showAlert = (message, type) => {
//   setAlert({
//     msg: message,
//     type: type,
//   });
//   setTimeout(() => {
//     setAlert(null);
//   }, 1500);
// };

// <>
//   <NoteState>
//     <Router>
//       <Alert alert={alert}></Alert>
//       <div>
//         <Routes>
//           <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
//           <Route exact path="/about" element={<About />}></Route>
//           <Route exact path="/logIn" element={<Login showAlert={showAlert} />}></Route>
//           <Route exact path="/signUp" element={<SignUp showAlert={showAlert} />}></Route>
//         </Routes>
//       </div>
//     </Router>
//   </NoteState>
// </>
