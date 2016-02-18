'use strict';

const express = require('express');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("*** SERVER IS RUNNING ***");
});

app.listen(PORT, () => {
  console.log(chalk.blue('Node.js server started. ') + chalk.black.bold.bgYellow(`Listening on PORT ${PORT}`));
});
