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

        $scope.selectModel = function(model) {
          reset();
          $scope.selectedModel = model;
          $scope.name = angular.copy(model.name);
          $scope.mode = 'update';
        };

        $scope.newModel = function() {
          reset();
          $scope.selectedModel = {
            "name": ""
          };
          $scope.mode = 'new';
        };

        $scope.create = function() {
          $http.post($scope.endpoint, {
            name: $scope.name
          }).then(function(res) {
            $scope.allModels.push(res.data);
            handleSuccess('Created');
          }, handleError);
        };

        $scope.update = function() {
          $http.put($scope.endpoint + '/' + $scope.selectedModel.id, {
            name: $scope.name
          }).then(function(res) {
            $scope.selectedModel.name = $scope.name;
            handleSuccess('Updated');
          }, handleError);
        };

        $scope.delete = function() {
          $http.delete($scope.endpoint + '/' + $scope.selectedModel.id)
            .then(function(res) {
              _.remove($scope.allModels, function(o) {
                return o.id === $scope.selectedModel.id;
              });
              handleSuccess('Deleted');
            }, handleError);
        };

        function reset() {
          $scope.formSuccess = null;
          $scope.formError = null;
          $scope.selectedModel = null;
          $scope.name = "";
        }

        function handleSuccess(formSuccessMessage) {
          reset();
          $scope.formSuccess = formSuccessMessage + ' ' + $scope.modelName;
        }

        function handleError(err) {
          console.log('error', err);
          if (err && err.data && err.data.message) {
            $scope.formError = err.data.message;
          }
        }
      }
    };
  });