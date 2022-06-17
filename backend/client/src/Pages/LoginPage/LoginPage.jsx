import React, { useState, useContext } from "react";
import "./LoginPage.css";

import { useNavigate } from "react-router-dom";

import GoogleLogin from "react-google-login";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const { name, email, imageUrl } = response.profileObj;
    const user = { name, email, imageUrl };
    console.log(user, " user recienved first CHECK");

    localStorage.setItem("googleUser", JSON.stringify(user));

    authContext.setGoogleUser(user);
    console.log(authContext.googleUser, "Across all pages");
    navigate("/userhome");
    // authContext.setGoogleUser(user);

    // console.log(authContext.googleUser);
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="login-page-wrapper">
      <h2 className="title-secondary">
        Start using your workspaces, collaborate with others by using LinkedList
      </h2>
      <GoogleLogin
        className="google-login"
        clientId="606956174420-153c7ckvubq4jlmeh2orqqorvpqn2q1t.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginPage;
