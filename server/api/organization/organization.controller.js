'use strict';

var _ = require('lodash');
//var Organization = require('./organization.model');

// Get list of organizations
exports.index = function(req, res) {
  // Organization.find(function (err, organizations) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, organizations);
  // });
  return res.json(200, [{
    "name": "Avanti Systems"
  }, {
    "name": "Empathica"
  }, {
    "name": "Clarity Systems"
  }]);
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