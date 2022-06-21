const WorkspaceSchema = require("../models/Workspace.js");

exports.getAllWorkSpaces = (req, res) => {
  // console.log("We are here to get all ws for ${req.body.userEmail}");
  const data = req.body.userEmail;
  console.log(data);
  WorkspaceSchema.find({ userEmail: data.email }, (err, data) => {
    if (err)
      return res
        .status(400)
        .json({ error: true, msg: "Unable to find workspaces" });
    else res.status(200).json({ error: false, msg: "Workspaces found", data });
  });
};

exports.addWorkspace = (req, res) => {
  console.log("We are here to create a new workspace");
  const { userEmail, title, category } = req.body;
  var ws = new WorkspaceSchema({
    userEmail,
    uid: Date.now(),
    title,
    category,
  });

  ws.save((err, data) => {
    if (err)
      return res
        .status(400)
        .json({ error: true, msg: "Unable to save workspace" });
    else res.status(200).json({ error: false, msg: "Workspace created" });
  });

  return;
};

exports.displayWorkspaces = (req, res) => {
  WorkspaceSchema.find({}, (err, data) => {
    if (err)
      return res
        .status(400)
        .json({ error: true, msg: "Unable to find workspaces" });
    else res.status(200).json({ error: false, msg: "Workspaces found", data });
  });
};

exports.getWorkspaceByUID = (req, res) => {
  const { uid } = req.body;
  WorkspaceSchema.find({ uid }, (err, data) => {
    if (err)
      return res
        .status(400)
        .json({ error: true, msg: "Unable to find workspaces" });
    else res.status(200).json({ error: false, msg: "Workspaces found", data });
  });
};
