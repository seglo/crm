'use strict';

var _ = require('lodash');
var Contact = require('./contact.model');

// Get list of contacts
exports.index = function(req, res) {
  Contact.getAll(function(err, contacts) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, _.map(contacts, function(c) {
      return {
        "id": c.id,
        "name": c.name
      };
    }));
  });
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