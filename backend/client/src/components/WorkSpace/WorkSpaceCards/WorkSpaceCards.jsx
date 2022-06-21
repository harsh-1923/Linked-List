import React from "react";
import "./WorkSpaceCards.css";
// import SingleWorkSpacePage from "../../../Pages/SingleWorkSpacePage/SingleWorkSpacePage.jsx";
import { Link } from "react-router-dom";

const WorkSpaceCards = ({ content }) => {
  return (
    <Link className="link" to={`/workspace/${content.uid}`}>
      <div className="ws-card-wrapper">
        <p>{content.title}</p>
        <p>{content.desc}</p>
        <p>{content.collaborators}</p>
        <p>{content.title}</p>
      </div>
    </Link>
  );
};

export default WorkSpaceCards;
