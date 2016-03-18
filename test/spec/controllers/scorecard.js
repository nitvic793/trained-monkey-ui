'use strict';

describe('Controller: ScorecardCtrl', function () {

  // load the controller's module
  beforeEach(module('trainedMonkeyUiApp'));

  var ScorecardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScorecardCtrl = $controller('ScorecardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ScorecardCtrl.awesomeThings.length).toBe(3);
  });
});
