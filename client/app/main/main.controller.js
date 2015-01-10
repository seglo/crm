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
      $scope.selectOrganization($scope.allOrganizations[0]);
    });

    // event: change selected org
    // TODO: when orgs and contacts are modified will this view get updated when you re-visit it?
    $scope.selectOrganization = function(org) {
      $scope.selectedOrganization = org;
      $scope.unassignedContacts = _.difference(allContacts, org.contacts);
    }

    $scope.addContacts = function() {
      $scope.selectedOrganization.contacts = moveContacts($scope.unassignedContacts, $scope.selectedOrganization.contacts);
    };

    $scope.removeContacts = function() {
      $scope.unassignedContacts = moveContacts($scope.selectedOrganization.contacts, $scope.unassignedContacts);
    };

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

    // $scope.addThing = function() {
    //   if ($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', {
    //     name: $scope.newThing
    //   });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
  });