'use strict';

angular.module('crmApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Assignments',
      'stateName': 'main'
    },{
      'title': 'Contacts',
      'stateName': 'contacts'
    },{
      'title': 'Organizations',
      'stateName': 'organizations'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });