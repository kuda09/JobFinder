'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the authApp
 */
angular.module('authApp')
    .controller('LogoutCtrl', function (authToken, $state) {


        var init = function () {

            authToken.removeToken();

           $state.go('main');

        }

        init();
    });
