'use strict';

var _ = require('lodash');
var Contact = require('./contact.model');

exports.index = function(req, res) {
  Contact.getAll(function(err, contacts) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, _.map(contacts, function(o) {
      return {
        "id": o.id,
        "name": o.name
      };
    }));
  });
};

// Creates a new contact
exports.create = function(req, res) {
  validateName(req, res);
  Contact.create(req.body, function(err, o) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, {
      "id": o.id,
      "name": o.name
    });
  });
};

// Update a contact name
exports.update = function(req, res) {
  validateName(req, res);
  Contact.update(parseInt(req.params.id), req.body.name, function(err) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200);
  });
};

// Deletes a contact relationships to organizations
exports.delete = function(req, res) {
  Contact.delete(parseInt(req.params.id), function(err) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200);
  });
};

function validateName(req, res) {
  if (_.isUndefined(req.body) || req.body.name === '') {
    return handleError(res, {
      "message": "You must provide a name"
    });
  }
}

function handleError(res, err) {
  return res.send(500, err);
}