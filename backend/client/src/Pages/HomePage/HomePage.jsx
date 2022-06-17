import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-wrapper">
      <h1 className="header-main">
        One stop solution for all your bookmarks, links and to-dos
      </h1>
      <h3 className="muted">
        Sign with a google account and access all your bookmarks, links from any
        device. from any where
      </h3>
      <Link to="./login">
        <button className="btn">Start using LinkedList</button>
      </Link>
    </div>
  );
};

export default HomePage;


