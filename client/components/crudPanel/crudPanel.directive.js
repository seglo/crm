'use strict';

angular.module('crmApp')
  .directive('crudPanel', function() {
    return {
      templateUrl: 'components/crudPanel/crudPanel.html',
      restrict: 'EA',
      scope: {
        modelName: "@",
        endpoint: "@"
      },
      link: function(scope, element, attrs) {},
      controller: function($scope, $http) {
        $http.get($scope.endpoint).then(function(res) {
          $scope.allModels = res.data;
        });

        $scope.selectModel = function(org) {
          $scope.formSuccess = null;
          $scope.selectedModel = org;
          $scope.mode = 'update';
        };

        $scope.newModel = function(org) {
          $scope.formSuccess = null;
          $scope.selectedModel = {
            "name": ""
          };
          $scope.mode = 'new';
        };

        $scope.create = function() {
          $http.post($scope.endpoint, {
            name: $scope.selectedModel.name
          }).then(function(res) {
            $scope.allModels.push(res.data);
            $scope.selectedModel = null;
            $scope.formSuccess = 'Created ' + $scope.modelName;
          }, handleError);
        };

        $scope.update = function() {
          $http.put($scope.endpoint + '/' + $scope.selectedModel.id, {
            name: $scope.selectedModel.name
          }).then(function(res) {
            $scope.selectedModel = null;
            $scope.formSuccess = 'Updated ' + $scope.modelName;
          }, handleError);
        };

        $scope.delete = function() {
          $http.delete($scope.endpoint + '/' + $scope.selectedModel.id)
            .then(function(res) {
              _.remove($scope.allModels, function(o) {
                return o.id === $scope.selectedModel.id;
              });
              $scope.selectedModel = null;
              $scope.formSuccess = 'Deleted ' + $scope.modelName;
            }, handleError);
        };

        function handleError(err) {
          console.log('error', err);
          if (err && err.data && err.data.message) {
            $scope.formError = err.data.message;
          }
        }
      }
    };
  });