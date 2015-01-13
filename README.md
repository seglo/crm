# crm

[![Build Status](https://travis-ci.org/seglo/crm.svg?branch=master)](https://travis-ci.org/seglo/crm)

> cosmic relationship magicalness

## Introduction

I implemented an almost MEAN stack.  I boostraped this project using `yeoman` and the `generator-angular-fullstack` generator.  This generated a bunch of boilerplate for a fullstack MEAN application.  I kept a lot of it, but ditched Mongo in favour of trying out neo4j.  This site degrades gracefully to mobile devices, but has only been tested on my Nexus 6.  

Notable technologies.

* Angular
* Bootstrap
* Node.js
* [neo4j](http://neo4j.com) (Graph database)
* Jasmine/Mocha (decided not to write any server side mocha tests)
* Grunt

## Running the project

I implemented this project on an Ubuntu workstation.  This is how you run it.

* Install `node.js` and `npm`
* Install `git`
* Install `grunt` and `bower` globally: 

```
sudo npm install -g grunt
sudo npm install -g bower
```

* Install neo4j on Ubuntu by following the instructions here: http://debian.neo4j.org/
* Clone this repository

```
git clone https://github.com/seglo/crm
```

* Install project dependencies

```
npm install
bower install
```

* Run project.  This will reset & seed the neo4j db and run the express server on startup.

```
grunt serve
```

## Tests

Builds run on push to master repo on github on Travis CI.  See latest build: https://travis-ci.org/seglo/crm.
I only implemented front-end tests because that's where the bulk of the work went.  The server side controller layer is very small.  If the complexity were to get more complicated then I would re-evaluate.

Client side tests are Jasmine specifications, run by the Karma test runner, using the Phantom headless browser.

Run the test suite.

```
grunt test
```

Run the tests in debug mode (or using chrome) using the Karma debug server.

```
grunt test:client:debug
```

## TODO

* Investigate heroku deploy
* Investigate neo4j (GrapheneDB neo4j db as service, heroku addon: https://addons.heroku.com/#data-stores)

## Rought amount of time spent on project
~15hr

## Notable neo4j queries

Delete all nodes and relationships in a neo4j db

```
MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r
```

Return all orgs and contacts with relationships

```
MATCH (o:Organization)
MATCH (c:Contact)     
OPTIONAL MATCH o-[r]-c
RETURN c, r, o;
``` 