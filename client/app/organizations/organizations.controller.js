'use strict';

angular.module('crmApp')
  .controller('OrganizationsCtrl', function($scope, $http) {
    $http.get('/api/organizations').then(function(res) {
      $scope.allOrganizations = res.data;
    });

    $scope.selectOrganization = function(org) {
      $scope.formSuccess = null;
      $scope.selectedOrganization = org;
      $scope.mode = 'update';
    };

    $scope.newOrganization = function(org) {
      $scope.formSuccess = null;
      $scope.selectedOrganization = {
        "name": ""
      };
      $scope.mode = 'new';
    };

    $scope.create = function() {
      $http.post('/api/organizations', {
        name: $scope.selectedOrganization.name
      }).then(function(res) {
        $scope.allOrganizations.push(res.data);
        $scope.selectedOrganization = null;
        $scope.formSuccess = 'Created organization';
      }, handleError);
    };

    $scope.update = function() {
      $http.put('/api/organizations/' + $scope.selectedOrganization.id, {
        name: $scope.selectedOrganization.name
      }).then(function(res) {
        $scope.selectedOrganization = null;
        $scope.formSuccess = 'Updated organization';
      }, handleError);
    };

    $scope.delete = function() {
      $http.delete('/api/organizations/' + $scope.selectedOrganization.id)
        .then(function(res) {
          _.remove($scope.allOrganizations, function(o) {
            return o.id === $scope.selectedOrganization.id;
          });
          $scope.selectedOrganization = null;
          $scope.formSuccess = 'Deleted organization';
        }, handleError);
    };

    function handleError(err) {
      console.log('error', err);
      if (err && err.data && err.data.message) {
        $scope.formError = err.data.message;
      }
    }
  });