'use strict';

var RegisterCtrl = function ($scope, $http, alert, authToken, $state, $timeout, API_URL, auth) {

    $scope.submit = function () {

        var handleFormSubmitSuccess = function (response) {

            alert('success', 'Account created', 'Welcome' + response.user.email + "!");
            authToken.setToken(response.token);


            $timeout(function () {

                $state.go('main');

            }, 3000);

        }

        var handleFormSubmitError = function (error) {

            alert('warning', 'Oops', 'Cound not register');

        }

        auth.register($scope.email, $scope.password)
            .success(handleFormSubmitSuccess)
            .error(handleFormSubmitError);

    }
};


RegisterCtrl.$inject = ['$scope', '$http', 'alert', 'authToken', '$state', '$timeout', 'API_URL', 'auth'];
/**
 * @ngdoc function
 * @name authApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the authApp
 */
angular.module('authApp')
    .controller('RegisterCtrl', RegisterCtrl);
