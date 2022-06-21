import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkSpaceServices from "../../Services/WorkSpaceServices.js";

const SingleWorkSpacePage = ({}) => {
  const { uid } = useParams();

  const [workspace, setWorkspace] = useState(null);

  let req = {
    uid: "",
  };
  req.uid = uid;

  useEffect(() => {
    loadWorkpace();
  }, []);

  const loadWorkpace = () => {
    WorkSpaceServices.getWorkspaceByUID(req).then((response) => {
      const { data, msg } = response;
      console.log(data);
      setWorkspace(data[0]);
    });
  };

  return (
    <div>
      {workspace ? (
        <>
          <h1>{workspace.title}</h1>
        </>
      ) : null}
    </div>
  );
};

export default SingleWorkSpacePage;
