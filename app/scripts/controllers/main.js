'use strict';

/**
 * @ngdoc function
 * @name trainedMonkeyUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainedMonkeyUiApp
 */
angular.module('trainedMonkeyUiApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log('test');
    $scope.onClick = function(){
        window.history.back();
    }
    $scope.testData =  this.awesomeThings;
  }]);
