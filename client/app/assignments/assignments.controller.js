'use strict';

angular.module('crmApp')
  .controller('AssignmentsCtrl', function($scope, $http, $q) {
    var allContacts = [];
    $scope.selectedContacts = null;
    $scope.selectedOrganization = null;

    $q.all([$http.get('/api/contacts'), $http.get('/api/organizations')]).then(function(res) {
      allContacts = res[0].data;
      $scope.allOrganizations = res[1].data;
      if ($scope.allOrganizations.length > 0) {
        $scope.selectOrganization($scope.allOrganizations[0]);
      }
    });

    $scope.selectOrganization = function(org) {
      $scope.selectedOrganization = org;
      // i would love to use _.difference here, but it uses strict equality (===)
      $scope.unassignedContacts = _.filter(allContacts, function(c) {
        return !_.findWhere(org.contacts, {
          id: c.id
        });
      });
    }

    $scope.addContacts = function() {
      _.forEach(selectedContacts($scope.unassignedContacts), function(c) {
        $http.post('/api/organizations/' + $scope.selectedOrganization.id + '/assign/' + c.id);
      });
      $scope.selectedOrganization.contacts = moveContacts($scope.unassignedContacts, $scope.selectedOrganization.contacts);
    };

    $scope.removeContacts = function() {
      _.forEach(selectedContacts($scope.selectedOrganization.contacts), function(c) {
        $http.delete('/api/organizations/' + $scope.selectedOrganization.id + '/unassign/' + c.id);
      });
      $scope.unassignedContacts = moveContacts($scope.selectedOrganization.contacts, $scope.unassignedContacts);
    };

    function selectedContacts(source) {
      return _.filter(source, {
        selected: true
      });
    }

    function moveContacts(source, destination) {
      // remove from source coll and de-activate 'select' state
      var selectedContacts = _.remove(source, function(contact) {
        if (contact.selected) {
          contact.selected = false;
          return true;
        }
        return false;
      });
      if (selectedContacts.length > 0) {
        console.log('moving', selectedContacts.length, 'contacts');
        return _.union(destination, selectedContacts);
      }
      console.log('select a contact');
      return destination;
    };
  });