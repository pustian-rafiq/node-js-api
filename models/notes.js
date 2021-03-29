const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
}, {
    timestamps: true
});

/**
 * create model
 * Model er nam always capital letter dia start hbe and simgular hbe 
 * karon ei mdoel name er upor depend kore small letter dia plural form a collections create hbe
 */
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;