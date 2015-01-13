'use strict';

angular.module('crmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('assignments', {
        url: '/',
        templateUrl: 'app/assignments/assignments.html',
        controller: 'AssignmentsCtrl'
      });
  });