'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the authApp
 */
angular.module('authApp')
    .controller('HeaderCtrl', function ($scope, authToken) {

        $scope.isAuthenticated = function () {

            return authToken.isAuthenticated();
        }

    });
