const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Workspaces = require('../models/Workspace');
const { body, validationResult } = require('express-validator');

// ROUTE 1:FETCH ALL WORKSPACES OF AN USER. GET REQUEST
router.get('/fetchWorkspaces', fetchUser, async (req, res) => {

    const workspaces = await Workspaces.find({ user: req.user.id });

    res.json(workspaces);
})

// ROUTE 2:ADD A NEW WORKSPACE FOR AN USER. POST REQUEST
router.post('/addWorkspace',
    body('category', 'category cannot be blank').exists(),
    fetchUser, async (req, res) => {

        try {

            const { category } = req.body;
            // let workspaceExsits = await Workspaces.findOne({ category: category });

            // if (workspaceExsits) {
            //     return res.status(400).json({ error: "a workspace with this category already exits" })
            // }

            // if there are errors return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const workspace = await new Workspaces({
                user: req.user.id,
                category
            })

            const savedworkspace = await workspace.save();

            res.json(savedworkspace);

        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ")

        }


    })

//ROUTE 3: UPDATE AN EXISTING WORKSPACE. PUT REQUEST. LOGIN REQUIRED
router.put('/updateWorkspace/:id',
    fetchUser, async (req, res) => {

        try {

            const { category } = req.body
            // create a newWorkspace object
            const newWorkspace = {};
            if (category) { newWorkspace.category = category };

            //Find the workspace by id 
            let workspace = await Workspaces.findById(req.params.id);
            // if no workspace with that id exists
            if (!workspace) {
                res.status(404).json({ error: "Not Found" });
            }

            // check if a user is trying to update some other user's workspace
            // if (id of user of the workspace !== id of the user who made the request)

            if (workspace.user.toString() !== req.user.id) {
                return res.status(401).send("Access Denied!");
            }

            workspace = await Workspaces.findByIdAndUpdate(req.params.id, { $set: newWorkspace }, { new: true });
            res.json({ workspace });

        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ")

        }


    })

//ROUTE 4: UPDATE AN EXISTING workspace. DELETE REQUEST. LOGIN REQUIRED
router.delete('/deleteWorkspace/:id',
    fetchUser, async (req, res) => {

        try {
            //Find the workspace by id 
            let workspace = await Workspaces.findById(req.params.id);
            // if no workspace with that id exists
            if (!workspace) {
                res.status(404).json({ error: "Not Found" });
            }

            // check if a user is trying to delete some other user's workspace
            // if (id of user of the workspace !== id of the user who made the request)

            if (workspace.user) {
                if (workspace.user.toString() !== req.user.id) {
                    return res.status(401).send("Access Denied!");
                }
            }
            else {
                res.status(404).json({ error: "Not Found" });
            }

            workspace = await Workspaces.findByIdAndDelete(req.params.id);
            res.json({ success: "workspace has been deleted successfully" });

        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ");

        }


    })

module.exports = router