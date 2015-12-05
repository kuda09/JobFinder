
'use strict';

var LoginCtrl = function ($scope, $http, alert, authToken, $state, $timeout, API_URL, auth) {

    $scope.submit = function () {

        var handleFormSubmitSuccess = function (response) {

            alert('success', 'Account logged in', 'Welcome' + response.user.email + "!");
            authToken.setToken(response.token);


            $timeout(function () {

                $state.go('main');

            }, 3000);

        }

        var handleFormSubmitError = function (error) {

            alert('warning', 'Oops', 'Cound not login' + error.message);

        };

        auth.login($scope.email, $scope.password)
            .success(handleFormSubmitSuccess)
            .error(handleFormSubmitError);

    }
};


LoginCtrl.$inject = ['$scope', '$http', 'alert', 'authToken', '$state', '$timeout', 'API_URL', 'auth'];
/**
 * @ngdoc function
 * @name authApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the authApp
 */
angular.module('authApp')
    .controller('LoginCtrl', LoginCtrl);


