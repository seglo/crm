'use strict';

angular.module('crmApp')
.controller('MainCtrl', function($scope, $http, $q) {
  $scope.selectedContact = null;

  $q.all([$http.get('/api/contacts'), $http.get('/api/organizations')]).then(function(res) {
    console.log(res);
    $scope.allContacts = res[0].data;
    $scope.allOrganizations = res[1].data;
  });

  $scope.organizationContacts = [];

  $scope.addContact = function() {
    if ($scope.selectedContact) {
      console.log('adding', $scope.selectedContact.name);
      $scope.organizationContacts.push($scope.selectedContact);
    } else {
      console.log('select a contact to add');
    }
  };

  $scope.selectContact = function(contact) {
    $scope.selectedContact = contact;
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