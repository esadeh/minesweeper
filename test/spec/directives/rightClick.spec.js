'use strict';

describe('Directive: rightClick', function () {

  // load the directive's module
  beforeEach(function () {
    module('minesWeeperAppInternal');

    //add your mocks here
  });

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
//
//  it('should make hidden element visible', inject(function ($compile) {
//    element = angular.element('<right-click></right-click>');
//    element = $compile(element)(scope);
//    expect(element.text()).toBe('this is the rightClick directive');
//  }));

//  it('should make hidden element visible', inject(function ($compile) {
//    scope.board = {toggleFlag: jasmine.createSpy('toggleFlag')};
//    element = angular.element('<div right-click="title"> </div>');
//    element = $compile(element)(scope);
//    element.trigger('contextmenu');
//    expect(scope.board.toggleFlag).toHaveBeenCalled();
//  }));
});
