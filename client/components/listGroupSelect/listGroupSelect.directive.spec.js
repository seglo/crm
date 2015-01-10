'use strict';

describe('Directive: listGroupSelect', function () {

  // load the directive's module and view
  beforeEach(module('crmApp'));
  beforeEach(module('components/listGroupSelect/listGroupSelect.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<list-group-select></list-group-select>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the listGroupSelect directive');
  }));
});