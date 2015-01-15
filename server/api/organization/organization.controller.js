'use strict';

var _ = require('lodash');
var util = require('../util');
var Organization = require('./organization.model');

var handleError = util.handleError;
var standardHandler = util.standardHandler;
var emptyNameError = util.emptyNameError;

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
  if (_.isUndefined(req.body) || req.body.name === '') {
    return emptyNameError(req, res);
  }
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
  if (_.isUndefined(req.body) || req.body.name === '') {
    return emptyNameError(req, res);
  }
  Organization.update(parseInt(req.params.id), req.body.name, function(err) {
    return standardHandler(res, err);
  });
};

// Deletes an org and any contacts associated with it
exports.delete = function(req, res) {
  Organization.delete(parseInt(req.params.id), function(err) {
    return standardHandler(res, err);
  });
};

// Assign contacts to an org
exports.assign = function(req, res) {
  Organization.assign(parseInt(req.params.id), req.body.contactIds, function(err) {
    return standardHandler(res, err);
  });
};

// Unassign contacts from an org
exports.unassign = function(req, res) {
  Organization.unassign(parseInt(req.params.id), req.body.contactIds, function(err) {
    return standardHandler(res, err);
  });
};