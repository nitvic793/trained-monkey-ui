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
    .then(function success(result){
        if(result.data.code==='OK'){
            cb(result.data.data, null);
        }
        else{
            cb(null, {status:'error'});
        }        
    },
    function error(err){
        cb(null, err);
    });
}

function post($http, data, url, cb){
    $http.post(url, data)
    .then(function success(result){
        if(result.data.code==='CREATED'){
            cb(result.data.data,null);
        }
        else{
            cb(null,{status:"error"});
        }
    }, function error(err){
        cb(null, err);
    });
}

function postUpdate($http, data, url, cb){
    $http.post(url, data)
    .then(function success(result){
        if(result.data.code=='OK'){
            cb(result.data.data,null);
        }
        else{
            cb(null,{status:"error"});
        }
    }, function error(err){
        cb(null, err);
    });
}

angular.module('trainedMonkeyUiApp')
.constant('config', {
    appName: 'My App',
    appVersion: 2.0,
    apiUrl: 'http://localhost:3000/v1'
})
  .service('ApiService', ['$http', 'config', function ($http, config) {
      var base = config.apiUrl;
     this.getUser = function(id, cb){
         var url = base+'/users/find?user='+id;
         get($http,url,cb);
     };
     this.postAnswer = function postAnswer(answer, cb){
         var url = base+'/answers/create';
         post($http,answer,url, cb);
     };
     this.updateQuestion = function updateQuestion(question, cb){
         console.log(question);
         var url = base+'/questions/update/'+question.id;
         postUpdate($http,question,url,cb);
     }
     
     this.getAnswer = function getAnswer(id,cb){
         var url = base+'/answers/'+id;
         get($http,url,cb);
     }
     
     this.getFinalAnswer = function getFinalAnswer(userId,cb){
         var url = base + '/finalanswers?user=' + userId;
         get($http, url, cb);
     }
     
     this.updateFinalAnswer = function updateFinalAnswer(answer, cb){
         var url = base + '/finalanswers/update/'+answer.id;
         postUpdate($http,answer,url,cb);
     }
     
     this.getAllUsers = function getAllUsers(cb){
         var url = base + '/users/find';
     }
  }]);
