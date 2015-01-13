'use strict';

var _ = require('lodash');
var neo4j = require('neo4j');
var Contact = require('../contact/contact.model');

var db = new neo4j.GraphDatabase(
  process.env['NEO4J_URL'] ||
  process.env['GRAPHENEDB_URL'] ||
  'http://localhost:7474'
);

// private constructor:
var Organization = module.exports = function Organization(_node) {
    // all we'll really store is the node; the rest of our properties will be
    // derivable or just pass-through properties (see below).
    this._node = _node;
  }
  // public instance properties:
Object.defineProperty(Organization.prototype, 'id', {
  get: function() {
    return this._node.id;
  }
});
Object.defineProperty(Organization.prototype, 'name', {
  get: function() {
    return this._node.data['name'];
  },
  set: function(name) {
    this._node.data['name'] = name;
  }
});

// public instance methods:
Organization.prototype.save = function(callback) {
  this._node.save(function(err) {
    callback(err);
  });
};

Organization.getAll = function(callback) {
  var query = [
    'MATCH (org:Organization)',
    'RETURN org',
  ].join('\n');
  db.query(query, null, function(err, results) {
    if (err) return callback(err);
    var orgs = results.map(function(result) {
      return new Organization(result['org']);
    });
    callback(null, orgs);
  });
};

Organization.getAllWithContacts = function(callback) {
  var query = [
    "MATCH (org:Organization)",
    "OPTIONAL MATCH (org)-[:ASSIGNED_TO]-(contact)", // optionally match ASSIGNED_TO relationships, returns orgs that also don't have relationships
    "return org, collect(contact) AS contacts;"
  ].join('\n');
  db.query(query, null, function(err, results) {
    if (err) return callback(err);
    var orgs = results.map(function(result) {
      var org = new Organization(result['org']);
      org.contacts = _.map(result['contacts'], function(c) {
        return new Contact(c);
      });
      return org;
    });
    callback(null, orgs);
  });
};

// creates the model and persists (saves) it to the db, incl. indexing it:
Organization.create = function(data, callback) {
  // construct a new instance of our class with the data, so it can
  // validate and extend it, etc., if we choose to do that in the future:
  var node = db.createNode(data);
  var org = new Organization(node);
  // but we do the actual persisting with a Cypher query, so we can also
  // apply a label at the same time. (the save() method doesn't support
  // that, since it uses Neo4j's REST API, which doesn't support that.)
  var query = [
    'CREATE (org:Organization {data})',
    'RETURN org',
  ].join('\n');
  var params = {
    data: data
  };
  db.query(query, params, function(err, results) {
    if (err) return callback(err);
    var org = new Organization(results[0]['org']);
    callback(null, org);
  });
};

Organization.delete = function(id, callback) {
  var query = [
    // 'MATCH (org:Organization)',
    // 'WHERE ID(org) = {organizationId}',
    // 'DELETE org',
    // 'WITH org',
    // 'MATCH (org) -[rel:follows]- (other)',
    // 'DELETE rel',
    "START n=node({organizationId})",
    "OPTIONAL MATCH n-[r]-()",
    "DELETE r, n;"
  ].join('\n');
  var params = {
    organizationId: id
  };
  db.query(query, params, function(err) {
    callback(err);
  });
};

Organization.update = function(id, name, callback) {
  var query = [
    "START n = node({organizationId})",
    "SET n.name = {organizationName}",
    "RETURN n;"
  ].join('\n');
  var params = {
    organizationId: id,
    organizationName: name
  };
  db.query(query, params, function(err) {
    callback(err);
  });
};

Organization.assign = function(contactId, organizationId, callback) {
  var query = [
    "START o = node({contactId}), c = node({organizationId})",
    "CREATE UNIQUE(c)-[:ASSIGNED_TO]->(o)"
  ].join('\n');
  var params = {
    organizationId: organizationId,
    contactId: contactId
  };
  db.query(query, params, function(err) {
    callback(err);
  });
};

Organization.unassign = function(contactId, organizationId, callback) {
  var query = [
    "START o = node({contactId}), c = node({organizationId})",
    "MATCH c-[r:ASSIGNED_TO]-o",
    "DELETE r"
  ].join('\n');
  var params = {
    organizationId: organizationId,
    contactId: contactId
  };
  db.query(query, params, function(err) {
    callback(err);
  });
};