/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(
  process.env['NEO4J_URL'] ||
  process.env['GRAPHENEDB_URL'] ||
  'http://localhost:7474'
);

function clearDb() {
  var query = [
    //delete all objects and relationships
    "MATCH (n)",
    "OPTIONAL MATCH (n)-[r]-()",
    "DELETE n,r"
  ].join('\n');

  db.query(query, {}, function(err, results) {
    if (err) {
      console.log('error: clear db:', err);
    } else {
      console.log('success: cleared db');
      createContactConstraint();
    }
  });
}

function createContactConstraint() {
  db.query("CREATE CONSTRAINT ON (contact:Contact) ASSERT contact.name IS UNIQUE", {}, function(err, results) {
    if (err) {
      console.log('error: create contact constraint:', err);
    } else {
      console.log('success: created contact constraint');
      createOrganizationConstraint();
    }
  });
}

function createOrganizationConstraint() {
  db.query("CREATE CONSTRAINT ON (org:Organization) ASSERT org.name IS UNIQUE", {}, function(err, results) {
    if (err) {
      console.log('error: create organization constraint:', err);
    } else {
      console.log('success: created organization constraint');
      populateData();
    }
  });
}

function populateData() {
  var query = [
    // create contacts
    "CREATE (mike:Contact { name : 'Michael Schenn' })",
    "CREATE (sean:Contact { name : 'Sean Glover' })",
    "CREATE (john:Contact { name : 'John Callahan'})",
    // create organizations
    "CREATE (aonic:Organization { name : 'Aonic Systems'})",
    "CREATE (empathica:Organization { name : 'Empathica'})",
    "CREATE (umbrella:Organization { name : 'Umbrella Corp.'})",
    "CREATE (aperture:Organization { name : 'Aperture Science'})",
    // create assignments
    "CREATE UNIQUE (mike)-[:ASSIGNED_TO]->(aonic)",
    "CREATE UNIQUE (john)-[:ASSIGNED_TO]->(aonic)",
    "CREATE UNIQUE (sean)-[:ASSIGNED_TO]->(empathica)",
    "CREATE UNIQUE (mike)-[:ASSIGNED_TO]->(umbrella)",
    "CREATE UNIQUE (john)-[:ASSIGNED_TO]->(umbrella)",
    "CREATE UNIQUE (sean)-[:ASSIGNED_TO]->(umbrella);"
  ].join('\n');
  //console.log(query)
  db.query(query, {}, function(err, results) {
    if (err) {
      console.log('error: populate data:', err);
    } else {
      console.log('success: populated data');
    }
  });
}

console.log('seed neo4j db');
clearDb();