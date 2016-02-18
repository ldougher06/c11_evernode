const express = require('express');
const router = express.Router();

// const Note = require('../models/note.model'); // need this for below router.params
const note = require('../controllers/note.ctrl');

// router.params('id', (req, res, next, id) => { // if an id parameter is present, this grabs it so we dont need
//   Note.findById(id, (err, note) => {          // multiple ".findById()" methods in the controller
//     if(err) throw err;
//     req.note = note;
//     next();
//   });
// });

router.get('/notes', note.index);
router.get('/notes/new', note.newNote);
router.get('/notes/:id', note.show);
router.get('/notes/:id/edit', note.edit);
router.put('/notes/:id', note.update);
router.delete('/notes/:id', note.destroy);
router.post('/notes', note.create);

module.exports = router;
