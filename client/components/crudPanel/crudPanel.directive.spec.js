'use strict';

describe('Directive: crudPanel', function () {

  // load the directive's module and view
  beforeEach(module('crmApp'));
  beforeEach(module('components/crudPanel/crudPanel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // TODO: write some tests if you have time
});