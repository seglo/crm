'use strict';

angular.module('crmApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Assignments',
      'stateName': 'assignments'
    },{
      'title': 'Contacts',
      'stateName': 'contacts'
    },{
      'title': 'Organizations',
      'stateName': 'organizations'
    }];

    $scope.isCollapsed = true;
  });