'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the authApp
 */
angular.module('authApp')
    .controller('AboutCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
