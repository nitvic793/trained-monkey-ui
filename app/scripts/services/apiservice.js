'use strict';

/**
 * @ngdoc service
 * @name trainedMonkeyUiApp.ApiService
 * @description
 * # ApiService
 * Service in the trainedMonkeyUiApp.
 */

function get($http, url, cb){
    $http.get(url)
    .then(function success(data){
        cb(data.data);
    },
    function error(err){
        cb(null);
    });
}

angular.module('trainedMonkeyUiApp')
.constant('config', {
    appName: 'My App',
    appVersion: 2.0,
    apiUrl: 'http://localhost:3000/v1'
})
  .service('ApiService', ['$http', 'config', function ($http, config) {
     this.getUser = function(id){
         console.log(config.apiUrl,id);
     };
  }]);
