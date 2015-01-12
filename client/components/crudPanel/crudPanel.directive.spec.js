'use strict';

describe('Directive: crudPanel', function () {

  // load the directive's module and view
  beforeEach(module('crmApp'));
  beforeEach(module('components/crudPanel/crudPanel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<crud-panel></crud-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the crudPanel directive');
  }));
});