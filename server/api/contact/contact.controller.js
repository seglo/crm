'use strict';

var _ = require('lodash');
//var Contact = require('./contact.model');

// Get list of contacts
exports.index = function(req, res) {
  // Contact.find(function (err, contacts) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, contacts);
  // });
  return res.json(200, [{
    "name": "Matthew Shulz"
  }, {
    "name": "Sean Glover"
  }, {
    "name": "Jared Conway"
  }]);
};

// Creates a new contact in the DB.
exports.create = function(req, res) {
  Contact.create(req.body, function(err, contact) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, contact);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}