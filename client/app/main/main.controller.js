'use strict';

angular.module('crmApp')
  .controller('MainCtrl', function($scope, $http, $q) {
    var allContacts = [];
    $scope.selectedContacts = null;
    $scope.selectedOrganization = null;

    $q.all([$http.get('/api/contacts'), $http.get('/api/organizations')]).then(function(res) {
      allContacts = res[0].data;
      $scope.allOrganizations = res[1].data;

      // delete me later, don't want to pre-select an org
      $scope.selectedOrganization = $scope.allOrganizations[0];

      resetContacts();
    });

    function resetContacts() {
      $scope.allContacts = angular.copy(allContacts);
    }

    $scope.organizationContacts = [];

    $scope.addContacts = function() {
      $scope.organizationContacts = moveContacts($scope.allContacts, $scope.organizationContacts);
    };

    $scope.removeContacts = function() {
      $scope.allContacts = moveContacts($scope.organizationContacts, $scope.allContacts);
    };

    function moveContacts(source, destination) {
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


    $scope.selectContact = function(contact) {
      contact.selected = true;
    }

    $scope.selectOrganization = function(organization) {
      $scope.selectedOrganization = organization;
    }


    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });