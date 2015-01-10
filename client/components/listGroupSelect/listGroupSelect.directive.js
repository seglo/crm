'use strict';

angular.module('crmApp')
.directive('listGroupSelect', function () {
  return {
    templateUrl: 'components/listGroupSelect/listGroupSelect.html',
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      model: "=ngModel",
      noItemsMessage: "@?",
      listTitle: "@?",
      multiSelect: "=?"      
    },
    link: function (scope, element, attrs) {
      if (angular.isUndefined(scope.noItemsMessage)) {
        scope.noItemsMessage = "No items"
      }
      if (angular.isUndefined(scope.multiSelect)) {
        scope.multiSelect = true;
      }

      scope.select = function(clickedItem) {
        if (!scope.multiSelect) {
          scope.model.forEach(function(item) {
            if (item !== clickedItem) {
              item.selected = false;
            }
          });
        }
        clickedItem.selected = !clickedItem.selected;
      };
    }
  };
});