import React, { useContext, useEffect } from "react";
import "./WorkSpaceDisplayPage.css";
import DATA from "./DATA.js";
import WorkSpaceCards from "../../components/WorkSpace/WorkSpaceCards/WorkSpaceCards";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WorkSpaceDisplayPage = () => {
  console.log(DATA);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.googleUser == null) navigate("/login");
  }, []);
  return (
    <div className="user-home-wrapper">
      <div className="ws-display">
        <h2>All Workspaces</h2>
        <div className="test">
          {DATA
            ? DATA.map((data, key) => <WorkSpaceCards content={data} />)
            : null}
        </div>
      </div>
      <div className="all-ws-display">
        <h4>All workspaces</h4>
        <div className="test1">
          {DATA ? DATA.map((data, key) => <small>data.title</small>) : null}
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceDisplayPage;
