'use strict';

/**
 * @ngdoc function
 * @name trainedMonkeyUiApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the trainedMonkeyUiApp
 */
angular.module('trainedMonkeyUiApp')
  .controller('UserCtrl', ['$scope','ApiService',function ($scope,api) {
    var questions = [];
    $scope.questions = [];
        
    questions.push(
        {
            id:1,
            question: 'This is a question',
            answers: ['A','B', 'C'],
            hints:['X','Y','Z'],
            user:'1',
            answered:false,
            order:1
        }
    );
    questions.push(
        {
            id:2,
            question: 'This is question 2',
            answers: ['A','B', 'C'],
            hints:['X','Y','Z'],
            user:'1',
            order:2,
            answered:false, 
        }
    );
 
    for(var i=0;i<questions.length;++i){
        questions[i].showMessage = false;
        questions[i].status = {};
    }
    
    $scope.showMessage = false;
    $scope.status = {};
    $scope.currentAnswer = '';
    $scope.finalAnswer = '';
    $scope.allowFinalAnswer = false;
   
    
    var checkForFinalAnswer = function(){
        for(var i=0;i<questions.length;++i){
            if(!questions[i].answered){
                return;
            }
        }   
        
        $scope.allowFinalAnswer = true;     
    };
    var userId = '';
    $scope.onChange = function onChange(question, ans){
        var qIndex = questions.indexOf(question);      
        for(var i=0;i<question.answers.length;++i){
            if(question.answers[i]===ans){
                console.log('right');
                var answerPayload = {
                    answer:ans,
                    question:question.id,
                    user:userId
                };
                //Create answer record
                //On success, disable field
                questions[qIndex].answered = true;            
            }
        }
        if(questions[qIndex].answered){
            var status = {
                title:'Success',
                message:'That\'s right'
            };
            questions[qIndex].status = status;
            questions[qIndex].showMessage = true;
        }
        checkForFinalAnswer();
    };
    
    $scope.onFinalClick = function(){
        console.log('test');
        if(!$scope.allowFinalAnswer){
            $scope.showMessage = true;
            $scope.status = {
              title:'LOL',
              message:'Answer the other questions first'  
            };
        }
    }
   
    $scope.questions = questions;
  }]);
