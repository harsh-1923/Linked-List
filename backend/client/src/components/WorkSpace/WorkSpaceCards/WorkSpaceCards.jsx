import React from "react";
import "./WorkSpaceCards.css";

const WorkSpaceCards = ({ content }) => {
  return (
    <div className="ws-card-wrapper">
      <p>{content.title}</p>
      <p>{content.desc}</p>
      <p>{content.collaborators}</p>
      <p>{content.title}</p>
    </div>
  );
};

export default WorkSpaceCards;
