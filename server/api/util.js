'use strict';

var _ = require('lodash');

exports.standardHandler = function(res, err) {
  if (err) {
    return exports.handleError(res, err);
  }
  return res.json(200);
};

exports.handleError = function(res, err) {
  return res.send(500, err);
};