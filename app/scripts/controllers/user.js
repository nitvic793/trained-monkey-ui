'use strict';

/**
 * @ngdoc function
 * @name trainedMonkeyUiApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the trainedMonkeyUiApp
 */

function compare(a, b) {
    if (a.order < b.order) {
        return -1;
    }
    else if (a.order > b.order) {
        return 1;
    }
    else {
        return 0;
    }
}

angular.module('trainedMonkeyUiApp')
    .controller('UserCtrl', ['$scope', '$routeParams', 'ApiService', function($scope, $routeParams, api) {
        var questions = [];
        $scope.questions = [];
        var userId = $routeParams.userId;
        $scope.user = {};
        $scope.showMessage = false;
        $scope.status = {};
        $scope.currentAnswer = '';
        $scope.finalAnswer = '';
        $scope.allowFinalAnswer = false;
        $scope.showLoader = false;
        $scope.finalAnswered = false;
        var finalAnswer;

        api.getUser(userId, function getCallback(data, err) {
            if (!err) {
                questions = data[0].questionIds;
                $scope.user = data[0];
                $scope.questions = questions;
                checkForFinalAnswer();

                questions.forEach(function forEach(v, i, a) {
                    if (v.answered) {
                        api.getAnswer(v.answer, function onFinish(data, err) {
                            questions[i].currentAnswer = data.answer;
                        });
                    }
                });
                for (var i = 0; i < questions.length; ++i) {
                    questions[i].showMessage = false;
                    questions[i].status = {};
                    questions[i].currentAnswer = '';
                    questions[i].showLoader = false;
                }

                questions.sort(compare);
            }
            else {
                console.log(err, userId);
            }
        });


        var checkForFinalAnswer = function() {
            for (var i = 0; i < questions.length; ++i) {
                if (!questions[i].answered) {
                    return;
                }
            }
            $scope.allowFinalAnswer = true;
            $scope.showMessage = true;
            $scope.status = {
                title: 'Well',
                message: 'Now you can answer this'
            };
            api.getFinalAnswer($scope.user.id, function onFinish(data, err) {
                if (!err) {
                    finalAnswer = data[0];
                    console.log(finalAnswer);
                    if (finalAnswer.answered) {
                        $scope.finalAnswer = finalAnswer.answer;
                        $scope.allowFinalAnswer = false;
                        $scope.status = {
                            title: 'Kya baat hai',
                            message: 'You actually did it'
                        };
                    }
                }
            });
        };

        $scope.onChange = function onChange(question, ans) {
            var qIndex = questions.indexOf(question);
            questions[qIndex].showLoader = true;
            for (var i = 0; i < question.answers.length; ++i) {
                if (qIndex != 0) {
                    if (!questions[qIndex - 1].answered) {
                        var status = {
                            title: 'Come on',
                            message: 'Answer the previous question please!'
                        };
                        questions[qIndex].status = status;
                        questions[qIndex].showMessage = true;
                    }
                }

                if (question.answers[i].toLowerCase() === ans.toLowerCase()) {
                    console.log('right');
                    var status = {
                        title: 'Success',
                        message: 'That\'s right'
                    };
                    questions[qIndex].status = status;
                    questions[qIndex].showMessage = true;
                    var answerPayload = {
                        answer: ans,
                        question: question.id,
                        user: $scope.user.id
                    };
                    api.postAnswer(answerPayload, function onFinish(data, err) {
                        console.log(data);
                        if (!err) {
                            questions[qIndex].answered = true;
                            questions[qIndex].answer = data.id;
                            api.updateQuestion(questions[qIndex], function onFinish(data, err) {
                                if (!err) {
                                    if (questions[qIndex].answered) {

                                        checkForFinalAnswer();
                                    }
                                }
                                else {
                                    var status = {
                                        title: 'Error',
                                        message: 'Could not update. Check connectivity'
                                    };
                                    questions[qIndex].status = status;
                                    questions[qIndex].showMessage = true;
                                }
                                questions[qIndex].showLoader = false;
                            });
                        }
                        else {
                            questions[qIndex].showLoader = false;
                            var status = {
                                title: 'Error',
                                message: 'Could not update. Check connectivity'
                            };
                            questions[qIndex].status = status;
                            questions[qIndex].showMessage = true;
                        }
                    });
                    return;
                }
                else {
                    questions[qIndex].showLoader = false;
                }

            }

            for (var i = 0; i < question.hints.length; ++i) {
                if (question.hints[i].toLowerCase() == ans.toLowerCase()) {
                    var status = {
                        title: 'Warmer',
                        message: 'You\'re getting close'
                    };
                    questions[qIndex].status = status;
                    questions[qIndex].showMessage = true;
                    return;
                }
            }
            var status = {
                title: 'Na',
                message: 'Wrong, answer'
            };
            questions[qIndex].status = status;
            questions[qIndex].showMessage = true;
            questions[qIndex].showLoader = false;
        };

        $scope.onFinalClick = function() {
            if (!$scope.allowFinalAnswer) {
                if (!finalAnswer || !finalAnswer.answered) {
                    $scope.showMessage = true;
                    $scope.status = {
                        title: 'LOL',
                        message: 'Answer the other questions first'
                    };
                }

            }
        }

        $scope.onFinalChange = function onFinalChange() {
            if ($scope.finalAnswer.toLowerCase() === finalAnswer.answer.toLowerCase()) {
                $scope.showLoader = true;
                console.log("right");
                $scope.allowFinalAnswer = false;
                finalAnswer.answered = true;
                api.updateFinalAnswer(finalAnswer, function onFinish(data, err) {
                    $scope.showLoader = false;
                    if (!err) {
                        console.log(finalAnswer, data);
                        $scope.showMessage = true;
                        $scope.status = {
                            title: 'Success',
                            message: 'Congratulations, you finished it!'
                        };
                    }
                    else {
                        $scope.showMessage = true;
                        $scope.status = {
                            title: 'Error',
                            message: 'Connectivity issue!'
                        };
                        $scope.allowFinalAnswer = true;
                    }

                });
            }
        }
        $scope.questions = questions;
    }]);
