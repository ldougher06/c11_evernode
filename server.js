'use strict';

const chalk = require('chalk');
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const logger = require('./lib/logger');
const note = require('./routes/note.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(logger); // needs to be above '/' route so it can be used on home page

app.get('/', (req, res) => {
  res.send('*** Server Running ***');
});


app.use(note);

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
