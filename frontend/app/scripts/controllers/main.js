'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the authApp
 */
angular.module('authApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
