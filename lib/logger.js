'use strict';

const Log = require('../models/logs.model');

module.exports = (req, res, next) => {  // using next to handle query params
  // log req to DB             // next tells the middleware function to keep moving, would hang there otherwise
  Log.create({ // <<-- Log refers to Log variable linking to logs.model.js model
    userAgent: req.headers['userAgent'],  // creates log in the database, specifying these params
    route: req.url,
    verb: req.method
  }, next)
};
