'use strict';

angular.module('crmApp')
  .controller('OrganizationsCtrl', function ($scope, $http) {
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

    $scope.save = function() {
      // TODO
      // post selected organization to /organization/create
      // then: success: selectedOrganization = null, set formSuccess, push onto allOrganizations, 
      // then: error: populate $scope.formError
    };

    $scope.update = function() {
      // TODO
      // post selected organization to /organization/update
      // then: success: selectedOrganization = null, populate successful operation method
      // then: error: populate $scope.formError
    };

    $scope.delete = function() {
      // TODO
      // post selected organization to /organization/delete
      // then: success: selectedOrganization = null, populate successful operation method
      // then: error: populate $scope.formError
    };
  });
