const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1:FETCH ALL NOTES OF AN USER. GET REQUEST
router.get('/fetchNotes', fetchUser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
})

// ROUTE 2:ADD A NEW NOTE FOR AN USER. POST REQUEST
router.post('/addNote',
    body('title', 'Title cannot be blank').exists(),
    body('description', 'Description cannot be blank').exists(),
    fetchUser, async (req, res) => {

        try {

            const { title, description, tag, favourites } = req.body;

            // if there are errors return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = await new Notes({
                user: req.user.id,
                title,       //title:title
                description, // description:description
                tag,         // tag: tag
                favourites   //favourites:favourites
            })

            const savedNote = await note.save();

            res.json(savedNote);

        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ")

        }


    })

//ROUTE 3: UPDATE AN EXISTING NOTE. PUT REQUEST. LOGIN REQUIRED
router.put('/updateNote/:id',
    fetchUser, async (req, res) => {

        try {

            const { title, description, tag, favourites } = req.body
            // create a newNote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };
            if (favourites) { newNote.favourites = favourites };

            //Find the note by id 
            let note = await Notes.findById(req.params.id);
            // if no note with that id exists
            if (!note) {
                res.status(404).json({ error: "Not Found" });
            }

            // check if a user is trying to update some other user's note
            // if (id of user of the note !== id of the user who made the request)

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Access Denied!");
            }

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note });

        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ")

        }


    })

//ROUTE 4: UPDATE AN EXISTING NOTE. DELETE REQUEST. LOGIN REQUIRED
router.delete('/deleteNote/:id',
    fetchUser, async (req, res) => {

        try {
            //Find the note by id 
            let note = await Notes.findById(req.params.id);
            // if no note with that id exists
            if (!note) {
                res.status(404).json({ error: "Not Found" });
            }

            // check if a user is trying to delete some other user's note
            // if (id of user of the note !== id of the user who made the request)

            if (note.user) {
                if (note.user.toString() !== req.user.id) {
                    return res.status(401).send("Access Denied!");
                }
            }
            else {
                res.status(404).json({ error: "Not Found" });
            }

            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({ success: "note has been deleted successfully" });

        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ");

        }


    })

module.exports = router