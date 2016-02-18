const express = require('express');
const router = express.Router();

const note = require('../controllers/note.ctrl');

router.get('/notes', note.index);
router.get('/notes/new', note.newNote);
router.get('/notes/:id', note.show);
router.delete('/notes/:id', note.destroy);
router.post('/notes', note.create);

module.exports = router;
