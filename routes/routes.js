const express = require('express');
const router = express.Router();
const { GetNotes, GetNoteById, CreateNote, UpdateNote, DeleteNote } = require('../controller/notes');

router.get('/notes', GetNotes);
router.get('/notes/:id', GetNoteById);
router.post('/notes', CreateNote);
router.put('/notes/:id', UpdateNote);
router.delete('/notes/:id', DeleteNote);



module.exports = router;