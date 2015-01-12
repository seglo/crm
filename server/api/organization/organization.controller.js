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
          return { "id": c.id, "name": c.name };
        })
      };
    }));
  });
};

// Creates a new organization in the DB.
exports.create = function(req, res) {
  Organization.create(req.body, function(err, organization) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, organization);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}