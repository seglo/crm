'use strict';

angular.module('crmApp')
.directive('listGroupSelect', function () {
  return {
    templateUrl: 'components/listGroupSelect/listGroupSelect.html',
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      multiSelect: "@",
      noItemsMessage: "@",
      title: "=",
      model: "=ngModel"
    },
    link: function (scope, element, attrs) {
    }
  };
});