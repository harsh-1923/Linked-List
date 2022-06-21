import React, { useContext, useEffect, useState } from "react";
import "./WorkSpaceDisplayPage.css";
import DATA from "./DATA.js";
import WorkSpaceCards from "../../components/WorkSpace/WorkSpaceCards/WorkSpaceCards";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import WorkSpaceServices from "../../Services/WorkSpaceServices";

const WorkSpaceDisplayPage = () => {
  // console.log(DATA);

  const [data, setData] = useState(null);

  useEffect(() => {
    loadAllWorkSpace();
  }, []);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.googleUser == null) navigate("/login");
  }, []);

  const loadAllWorkSpace = () => {
    const eid = authContext.googleUser;
    const data = {
      userEmail: eid,
    };
    WorkSpaceServices.getAllWorkSpaces(data).then((res) => {
      console.log(res);
      setData(res.data);
      console.log(data, "DATA");
    });
  };

  return (
    <div className="user-home-wrapper">
      <div className="ws-display">
        <div className="ws-header-wrapper">
          <h2>All Workspaces</h2>
          <button>Add workspace</button>
        </div>
        <div className="test">
          {data ? data.map((d, key) => <WorkSpaceCards content={d} />) : null}
        </div>
      </div>
      <div className="all-ws-display">
        <h4>All workspaces</h4>
        <div className="test1">
          {data ? data.map((d, key) => <small>{d.title}</small>) : null}
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceDisplayPage;
