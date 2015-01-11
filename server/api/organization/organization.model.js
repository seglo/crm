'use strict';

var neo4j = require('neo4j');

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

// creates the user and persists (saves) it to the db, incl. indexing it:
Organization.create = function(data, callback) {
  // construct a new instance of our class with the data, so it can
  // validate and extend it, etc., if we choose to do that in the future:
  var node = db.createNode(data);
  var user = new Organization(node);
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
    var user = new Organization(results[0]['org']);
    callback(null, user);
  });
};