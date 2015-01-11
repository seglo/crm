'use strict';

angular.module('crmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('organizations', {
        url: '/organizations',
        templateUrl: 'app/organizations/organizations.html',
        controller: 'OrganizationsCtrl'
      });
  });