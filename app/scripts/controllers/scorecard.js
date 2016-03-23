'use strict';

/**
 * @ngdoc function
 * @name trainedMonkeyUiApp.controller:ScorecardCtrl
 * @description
 * # ScorecardCtrl
 * Controller of the trainedMonkeyUiApp
 */
angular.module('trainedMonkeyUiApp')
    .controller('ScorecardCtrl', ['$scope', 'ApiService', function($scope, api) {
        $scope.users = [];
        $scope.finalAnswers = [];

        function calculateScore() {
            $scope.users.forEach(function(v, i, a) {
                var answeredCount = 0;
                var date = Date.parse(v.questionIds[0].updatedAt);
                for (var index = 0; index < v.questionIds.length; ++index) {
                    if (v.questionIds[index].answered) {
                        answeredCount++;
                        if (date < Date.parse(v.questionIds[index].updatedAt)) {
                            console.log(v.questionIds[index].updatedAt);
                            date = Date.parse(v.questionIds[index].updatedAt);
                        }
                    }
                }
                $scope.users[i].answeredCount = answeredCount;
                $scope.users[i].latestUpdated = date;
                console.log(date);
            });
        }
        api.getAllUsers(function onFinish(data, err) {
            $scope.users = data;
            calculateScore();
            $scope.users.forEach(function(v, i, a) {
                //Populate answer models
                v.questionIds.forEach(function(q, ind, arr) {
                    api.getAnswer(q.answer, function onGet(result, err) {
                        $scope.users[i].questionIds[ind].answer = result;
                    });
                });
            });
            api.getAllFinalAnswers(function onFinish(data, err) {
                $scope.finalAnswers = data;
                console.log(data);
            });

        });

        $scope.calculateScore = calculateScore;

    }]);
