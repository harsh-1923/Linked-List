import { API } from "../API_CONFIG.js";

export default {
  getAllWorkSpaces: (userEmail) => {
    return fetch(`${API}/workspaces/getAllWorkSpaces`, {
      method: "post",
      body: JSON.stringify(userEmail),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  addWorkspace: (data) => {
    return fetch(`${API}/workspaces/addWorkspace`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  getWorkspaceByUID: (data) => {
    return fetch(`${API}/workspaces/getWorkspaceByUID`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
};
