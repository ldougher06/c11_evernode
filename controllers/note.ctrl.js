'use strict';

const Note = require('../models/note.model');

module.exports = {
  edit (req, res) {
    Note.findById(req.params.id, (err, note) => {
      if(err) throw err;
      res.render('new-note', {note: note});
    });
  },

  update (req, res) {
    Note.findByIdAndUpdate(req.params.id,
      req.body, (err, note) => {
        if (err) throw err;

        res.redirect(`/notes/${note._id}`);
      }
    );
  },

  // serves up the list of notes frmo DB using .find({})
  index (req, res) {
    Note.find({}, (err, notes) => {
      res.render('index-notes', {notes: notes});
    });
  },

  // serves up the form for new entries. will need "new" and "create" actions
  // review Ruby routes for actions list http://guides.rubyonrails.org/routing.html
  newNote (req, res) {
    res.render('new-note');
  },


  // shows the note you created
  // when using route params :id needs to be below other params
  // otherwise the browser thinks the param is the :id
  // ex. /notes/new above, new, would be the :id unless its above :id
  show (req, res) {
    Note.findById(req.params.id, (err, note) => { // Note is mongoose.Schema variable
      if (err) throw err;

      res.render('show-note', {note: note});
    });
  },

  // posts note to db using .create() method. Remember to throw err
  create (req, res) {
    Note.create(req.body, (err, note) => { // Note is mongoose.Schema variable
      if (err) throw err;

      //grabs _id from note object when its created and redirects to show the note
      res.redirect(`/notes/${note._id}`);
    });
  },

  // deletes note from DB using mongoose .findByIdAndRemove() method
  destroy (req, res) {
    Note.findByIdAndRemove(req.params.id, (err) => {
      if(err) throw err;

      res.redirect('/notes');
    });
  }
}
