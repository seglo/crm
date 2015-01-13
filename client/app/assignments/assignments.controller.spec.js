'use strict';

describe('Controller: AssignmentsCtrl', function() {

  // load the controller's module
  beforeEach(module('crmApp'));

  var AssignmentsCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/contacts')
      .respond([{
        "id": 1,
        "name": "Batman"
      }, {
        "id": 2,
        "name": "Robin"
      }, {
        "id": 3,
        "name": "Joker"
      }]);

    $httpBackend.expectGET('/api/organizations')
      .respond([{
        "id": 1,
        "name": "Batcave",
        "contacts": [{
          "id": 1,
          "name": "Batman"
        }, {
          "id": 2,
          "name": "Robin"
        }]
      }, {
        "id": 2,
        "name": "Joker's hideout",
        "contacts": []
      }]);

    scope = $rootScope.$new();
    AssignmentsCtrl = $controller('AssignmentsCtrl', {
      $scope: scope
    });
    $httpBackend.flush();
  }));

  describe('initialization', function() {
    it('should have 2 organizations', function() {
      expect(scope.allOrganizations.length).toBe(2);
    });

    it('should have 1 unassigned contacts at the batcave', function() {
      expect(scope.unassignedContacts.length).toBe(1);
    });

    it('should have the batcave as the selected organization', function() {
      expect(scope.selectedOrganization.name).toBe('Batcave');
    });

    it('should have 2 assigned contacts assigned to selected organization', function() {
      expect(scope.selectedOrganization.contacts.length).toBe(2);
    });
  });

  describe('assign contact', function() {
    beforeEach(function() {
      $httpBackend.expectPOST('/api/organizations/1/assign')
        .respond();

      scope.unassignedContacts[0].selected = true;
      scope.addContacts();
      $httpBackend.flush();
    });

    it('should have 3 assigned contacts', function() {
      expect(scope.selectedOrganization.contacts.length).toBe(3);
    });

    it('should have 0 unassigned contacts', function() {
      expect(scope.unassignedContacts.length).toBe(0);
    });
  });

  describe('unassign contact', function() {
    beforeEach(function() {
      $httpBackend.expectPOST('/api/organizations/1/unassign')
        .respond();

      scope.selectedOrganization.contacts[0].selected = true;
      scope.removeContacts();
      $httpBackend.flush();
    });

    it('should have 1 assigned contacts', function() {
      expect(scope.selectedOrganization.contacts.length).toBe(1);
    });

    it('should have 2 unassigned contacts', function() {
      expect(scope.unassignedContacts.length).toBe(2);
    });
  });
});