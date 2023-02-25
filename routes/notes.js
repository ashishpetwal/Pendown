const express = require('express');
const { model } = require('mongoose');
const Notes = require('../models/Notes')
const router = express.Router();
const fetchuser = require('../middleware/fetuser')
const { body, validationResult } = require('express-validator')

// Route 1: To fetch all the notes of the user

router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
})

// Route 2: To Add a new Note added by the user

router.post('/addnote', fetchuser, [
    body('title', "Enter a valid Title").isLength({ min: 3 }),
    body('description', "Enter a valid Description").isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tags } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title, description, tags, user: req.user.id
        })

        const savedNote = await notes.save();
        res.json(savedNote)

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }

})

// Route 3: To Update an existing note of a user

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tags } = req.body;

    try {
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tags) { newNote.tags = tags; }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Page Doesn't Exists!");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized Access");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

// Route 4: To Delete an existing note of a user

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Page Doesn't Exists!");
        }
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Unauthorized Access");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Your Note has been Deleted!", note: note })
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;