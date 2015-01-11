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
  db.query("CREATE CONSTRAINT ON (contact:Contact) ASSERT contact.name IS UNIQUE", {}, function(err, results) {
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
    "CREATE (matt:Contact { name : 'Matthew Shulz' })",
    "CREATE (sean:Contact { name : 'Sean Glover' })",
    "CREATE (jared:Contact { name : 'Jared Conway'})",
    // create organizations
    "CREATE (avanti:Organization { name : 'Avanti Systems'})",
    "CREATE (empathica:Organization { name : 'Empathica'})",
    "CREATE (umbrella: Organization { name : 'Umbrella Corp.'})",
    "CREATE (aperture: Organization { name : 'Aperture Science'})",
    // create assignments
    "CREATE (matt)-[:ASSIGNED_TO]->(avanti)",
    "CREATE (jared)-[:ASSIGNED_TO]->(avanti)",
    "CREATE (sean)-[:ASSIGNED_TO]->(empathica)",
    "CREATE (matt)-[:ASSIGNED_TO]->(umbrella)",
    "CREATE (jared)-[:ASSIGNED_TO]->(umbrella)",
    "CREATE (sean)-[:ASSIGNED_TO]->(umbrella);"
  ].join('\n');

  db.query(query, {}, function(err, results) {
    if (err) {
      console.log('error: populate data:', err);
    } else {
      console.log('success: populated data');
    }
  });
}

clearDb();