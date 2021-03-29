// dependencies
const express = require('express');
const app = express();

const mongoose = require('mongoose');
// import model

const Note = require('./models/notes');
//connecting database
mongoose.connect('mongodb://localhost/notes-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Databse created successfully'))
    .catch((error) => console.log(error))
    // middleware
app.use(express.json());
// REST API Structure
/**
 * GET - Read data - hit the url: /notes (Multiple Notes), notes/:id (single note)
 * POST - Add Data - hit the url: /notes (Add note)
 * PUT/PATCH - Update data - hit the url: /notes/:id 
 * DELETE - Delete data - hit the url: /notes/:id
 */

// create route
app.get('/', (req, res) => {
    res.send('Welcome to node.js');
});
app.get('/test/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});
//Get all notes
app.get('/notes', (req, res) => {
    if (notes.length == 0) {
        return res.send("No note found or yet not created");
    }

    res.send(notes);
});
//Get single note
app.get('/notes/:noteId', (req, res) => {

    const noteId = parseInt(req.params.noteId);
    const note = notes.find(note => note.id === noteId);
    if (note) {
        res.send(note);
    } else {
        res.status(404).send("Note not found");
    }

});

//Add a new note
app.post('/notes', async(req, res) => {
    const note = new Note(req.body);
    try {
        await note.save();
        res.send(note);
    } catch (error) {
        res.status(500).send('Something happend worng!');
    }
});


// update a note
app.put('/update-note/:noteId', (req, res) => {
    const noteId = parseInt(req.params.noteId);
    const noteInput = req.body;
    const gotNoteInputKey = Object.keys(noteInput);
    const allowedUpdates = ["title", "description"];
    try {
        const isAllowed = gotNoteInputKey.every(update => allowedUpdates.includes(update));
        if (!isAllowed) {
            return res.status(400).send('Invalid Operation');
        }
        const note = notes.find(note => note.id === noteId);
        if (note) {
            //success update
            notes = notes.map(note => {
                if (note.id === noteId) {
                    return {
                        ...note,
                        ...noteInput
                    };
                } else {
                    return note;
                }
            });
            return res.send(notes);
        } else {
            //Deal with note that not found
            return res.status(404).send('Note Not Found');

        }
    } catch (error) {
        //Server Error
        res.status(500).send('Internal server error!')
    }

});

// Delete Notes

app.delete('/delete-note/:noteId', (req, res) => {
    const noteId = parseInt(req.params.noteId);
    //find the note
    const note = notes.find(note => note.id === noteId);
    if (note) {
        //delete note
        notes = notes.filter(note => note.id !== noteId);
        res.send(notes);
    } else {
        // Note not found
        res.status(404).send('Note not found or unable to update');
    }
});



app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});
// create server
app.listen(3000, () => {
    console.log('Server run on the port 3000');
});