'use strict';

var _ = require('lodash');
var Organization = require('./organization.model');

exports.index = function(req, res) {
  Organization.getAllWithContacts(function(err, orgs) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, _.map(orgs, function(o) {
      return {
        "id": o.id,
        "name": o.name,
        "contacts": _.map(o.contacts, function(c) {
          return {
            "id": c.id,
            "name": c.name
          };
        })
      };
    }));
  });
};

// Creates a new organization
exports.create = function(req, res) {
  validateName(req, res);
  Organization.create(req.body, function(err, organization) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, {
      "id": organization.id,
      "name": organization.name,
      "contacts": []
    });
  });
};

// Update an org name
exports.update = function(req, res) {
  validateName(req, res);
  Organization.update(parseInt(req.params.id), req.body.name, function(err) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200);
  });
};

// Deletes an org and any contacts associated with it
exports.delete = function(req, res) {
  Organization.delete(parseInt(req.params.id), function(err) {
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