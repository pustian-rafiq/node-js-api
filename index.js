// dependencies
const express = require('express');
const app = express();

// middleware
app.use(express.json());
let notes = [{
        id: 1,
        title: "Note title 1",
        description: "Note description 1"
    },
    {
        id: 2,
        title: "Note title 2",
        description: "Note description 2"
    }
]

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
app.post('/add-note', (req, res) => {
    const note = req.body;
    notes = [...notes, note];
    res.send(notes);
});

// update a note
app.put('/update-note/:noteId', (req, res) => {
    const noteId = parseInt(req.params.noteId);
    const noteInput = req.body;
    const gotNoteInputKey = Object.keys(noteInput);
    const allowedUpdates = ["title", "description"];
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
    //Server Error
    res.status(500).send('Internal server error!')
})



app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});
// create server
app.listen(3000, () => {
    console.log('Server run on the port 3000');
});