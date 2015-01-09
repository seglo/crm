'use strict';

angular.module('crmApp')
.controller('MainCtrl', function($scope, $http, $q) {
  $scope.awesomeThings = [];

  $http.get('/api/things').success(function(awesomeThings) {
    $scope.awesomeThings = awesomeThings;
  });

  $q.all([$http.get('/api/contacts'), $http.get('/api/organizations')]).then(function(res) {
    console.log(res);
  });


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