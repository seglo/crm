'use strict';

var _ = require('lodash');

exports.emptyNameError = function(req, res) {
  return exports.handleError(res, {
    "message": "You must provide a name"
  });
};

exports.standardHandler = function(res, err) {
  if (err) {
    return exports.handleError(res, err);
  }
  return res.json(200);
};

exports.handleError = function(res, err) {
  return res.send(500, err);
};