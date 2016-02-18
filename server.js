'use strict';

const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Note = mongoose.model('Notes', mongoose.Schema({
  title: String,
  text: String
}));

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.locals.title = 'EVERNODE';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("*** SERVER IS RUNNING ***");
});

// serves up the form for new entries. will need "new" and "create" actions
// review Ruby routes for actions list http://guides.rubyonrails.org/routing.html
app.get('/notes/new', (req, res) => {
  res.render('new-note');
});

// posts note to db using .create() method. Remember to throw err
app.post('/notes', (req, res) => {
  Note.create(req.body, (err, note) => { // Note is mongoose.Schema variable
    if(err) throw err;
    console.log(note);
    res.redirect('/') // shows the note by :id
  });
});

// shows the note you created
// when using route params :id needs to be below other params
// otherwise the browser thinks the param is the :id
// ex. /notes/new above, new, would be the :id unless its above :id
app.get('/notes/:id', (req, res) => {
 res.render('show-note');
});

// *** MONGOOSE DATABASE STUFF *** //
const dbURL = 'mongodb://localhost:27017/evernode';
// wrapping mongoose.connect around app.listen ensures mongoose is fully connected
// server will not be allowed to start until mongoose is connected (helps with error handeling)
mongoose.connect(dbURL, (err) => {
  if (err) throw err;

  app.listen(PORT, () => {
    console.log(chalk.blue('Node.js server started. ') + chalk.black.bold.bgYellow(`Listening on PORT ${PORT}`));
  });

});
