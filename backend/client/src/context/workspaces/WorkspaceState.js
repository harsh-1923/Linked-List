import React, { useState } from "react";
import WorkspaceContext from "./workspaceContext";
import config from "../../configData.json";

const BASE_URL = config.BASE_URL;
const WorkspaceState = (props) => {
    const host = BASE_URL;
    const workspaceIntial = [];
    const [workspaces, setWorkspaces] = useState(workspaceIntial);


    // Get all Workspaces
    const getWorkspaces = async () => {
        // API Call 
        const response = await fetch(`${host}/api/workspace/fetchWorkspaces`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setWorkspaces(json)
    }

    // Add a Workspace
    const addWorkspace = async (category) => {

        // API Call 
        const response = await fetch(`${host}/api/workspace/addWorkspace`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            },
            body: JSON.stringify({ category })
        });

        const workspace = await response.json();
        setWorkspaces(workspaces.concat(workspace))
    }



    //DELETE A workspace
    const deleteWorkspace = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/workspace/deleteWorkspace/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newWorkspacess = workspaces.filter((workspace) => { return workspace._id !== id })
        setWorkspaces(newWorkspacess)
    }



    // EDIT A workspace
    const editWorkspace = async (id, category) => {
        // API Call 
        const response = await fetch(`${host}/api/workspace/updateWorkspace/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            },
            body: JSON.stringify({ category })
        });
        const json = await response.json();

        let newWorkspaces = JSON.parse(JSON.stringify(workspaces))
        // Logic to edit in client
        for (let index = 0; index < newWorkspaces.length; index++) {
            const element = newWorkspaces[index];
            if (element._id === id) {
                newWorkspaces[index].category = category;
                break;
            }
        }
        setWorkspaces(newWorkspaces);
    }

    return (
        <WorkspaceContext.Provider value={{ workspaces, setWorkspaces, addWorkspace, deleteWorkspace, editWorkspace, getWorkspaces }}>
            {props.children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceState;