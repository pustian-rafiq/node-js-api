// dependencies
const express = require('express');
const app = express();


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
    res.send('I am form node js');
});
app.get('/test/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});
//notes all notes
app.get('/notes', (req, res) => {
    if (notes.length == 0) {
        return res.send("No note found or yet not created");
    }

    res.send(notes);
});
//notes single note
app.get('/notes/:noteId', (req, res) => {

    const noteId = parseInt(req.params.noteId);
    const note = notes.find(note => note.id === noteId);
    if (note) {
        res.send(note);
    } else {
        res.send("Note not found");
    }

});

app.get('*', (req, res) => {
    res.send('404 Not Found');
});
// create server
app.listen(3000, () => {
    console.log('Server run on the port 3000');
});