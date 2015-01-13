'use strict';

describe('Directive: listGroupSelect', function() {
  // Patch since PhantomJS does not implement click() on HTMLElement. In some 
  // cases we need to execute the native click on an element. However, jQuery's 
  // $.fn.click() does not dispatch to the native function on <a> elements, so we
  // can't use it in our implementations: $el[0].click() to correctly dispatch.
  if (!HTMLElement.prototype.click) {
    HTMLElement.prototype.click = function() {
      var ev = document.createEvent('MouseEvent');
      ev.initMouseEvent(
        'click',
        /*bubble*/
        true, /*cancelable*/ true,
        window, null,
        0, 0, 0, 0, /*coordinates*/
        false, false, false, false, /*modifier keys*/
        0 /*button=left*/ , null
      );
      this.dispatchEvent(ev);
    };
  }

  // load the directive's module and view
  beforeEach(module('crmApp'));
  beforeEach(module('components/listGroupSelect/listGroupSelect.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('empty list message', function() {
    var emptyListGroup;

    beforeEach(inject(function($compile) {
      scope.list = [];
      element = angular.element('<div list-group-select ng-model="list"></div>');
      element = $compile(element)(scope);
      scope.$apply();

      emptyListGroup = angular.element('.list-group.empty', element);
    }));

    it('should say \'No items\' when empty', function() {
      expect(angular.element('.list-group-item.disabled', emptyListGroup).text()).toBe('No items');
    });

    it('should not be hidden', function() {
      expect(emptyListGroup.hasClass('ng-hide'), false); // 'No items' is visible
    });
  });

  describe('one item list', function() {
    var listGroup;
    beforeEach(inject(function($compile) {
      scope.list = [{
        "id": 1,
        "name": "rumplestiltskin"
      }];
      element = angular.element('<div list-group-select ng-model="list"></div>');
      element = $compile(element)(scope);
      scope.$apply();

      listGroup = angular.element('.list-group.items', element);
    }));

    it('should hide \'No items\' message', function() {
      expect(angular.element('.list-group.empty', element).hasClass('ng-hide'), true); // 'No items' is not visible
    });

    it('should show 1 item in model list', function() {
      var items = angular.element('a', listGroup);
      expect(items.length).toBe(1);
    });

    it('should list item with correct name', function() {
      var items = angular.element('a', listGroup);
      expect(items[0].text).toBe("rumplestiltskin");
    });
  });

  describe('multi selection', function() {
    var items;
    beforeEach(inject(function($compile) {
      scope.list = [{
        "id": 1,
        "name": "rumplestiltskin"
      }, {
        "id": 2,
        "name": "grimm"
      }];
      element = angular.element('<div list-group-select ng-model="list"></div>');
      element = $compile(element)(scope);
      scope.$apply();

      items = angular.element('.list-group.items a', element);
    }));

    it('should make item active when selected', function() {
      var item = angular.element(items[0]);
      expect(item.hasClass('active'), false);
      expect(scope.list[0].active, false);
      items[0].click();
      expect(item.hasClass('active'), true);
      expect(scope.list[0].active, true);
    });

    it('should be able to multiselect more than 1 item', function() {
      var item1El = items[0];
      var item2El = items[1];

      var item1 = angular.element(items[0]);
      var item2 = angular.element(items[1]);

      item1El.click();
      item2El.click();

      expect(item1.hasClass('active'), true);
      expect(item2.hasClass('active'), true);
    });
  });

  describe('single selection', function() {
    var items;
    beforeEach(inject(function($compile) {
      scope.list = [{
        "id": 1,
        "name": "rumplestiltskin"
      }, {
        "id": 2,
        "name": "grimm"
      }];
      element = angular.element('<div list-group-select multi-select="false" ng-model="list"></div>');
      element = $compile(element)(scope);
      scope.$apply();

      items = angular.element('.list-group.items a', element);
    }));

    it('should only allow 1 selection in group', function() {
      var item1El = items[0];
      var item2El = items[1];
      var item1 = angular.element(item1El);
      var item2 = angular.element(item2El);

      expect(item1.hasClass('active'), false);
      expect(item2.hasClass('active'), false);

      item1El.click();

      expect(item1.hasClass('active'), true);
      expect(item2.hasClass('active'), false);

      item2El.click();

      expect(item1.hasClass('active'), false);
      expect(item2.hasClass('active'), true);
    });
  });

  describe('custom messages', function() {
    it('should have custom title', inject(function($compile) {
      scope.list = [];
      element = angular.element('<div list-group-select list-title="Ahoy" ng-model="list"></div>');
      element = $compile(element)(scope);
      scope.$apply();

      expect(angular.element('div h4', element).text()).toBe('Ahoy');
    }));

    it('should have custom no items message', inject(function($compile) {
      scope.list = [];
      element = angular.element('<div list-group-select no-items-message="沒有項目" ng-model="list"></div>');
      element = $compile(element)(scope);
      scope.$apply();

      expect(angular.element('.list-group.empty .list-group-item.disabled', element).text()).toBe('沒有項目');
    }));
  });
});