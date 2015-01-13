'use strict';

var express = require('express');
var controller = require('./organization.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);
router.post('/:id/assign/:contactId', controller.assign);
router.delete('/:id/unassign/:contactId', controller.unassign);

module.exports = router;