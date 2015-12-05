'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the authApp
 */
angular.module('authApp')
    .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {


        $http.get(API_URL + 'jobs')
            .success(function (jobs) {

                $scope.jobs = jobs;

            })
            .error(function (error) {

                alert('warning', "Unable to get jobs", error.message);

            });
    });
