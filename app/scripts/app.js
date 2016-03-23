'use strict';

/**
 * @ngdoc overview
 * @name trainedMonkeyUiApp
 * @description
 * # trainedMonkeyUiApp
 *
 * Main module of the application.
 */
angular
  .module('trainedMonkeyUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngLoadingSpinner',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/scorecard', {
        templateUrl: 'views/scorecard.html',
        controller: 'ScorecardCtrl',
        controllerAs: 'scorecard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
