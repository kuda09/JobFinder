'use strict';

/**
 * @ngdoc service
 * @name authApp.auth
 * @description
 * # auth
 * Service in the authApp.
 */
angular.module('authApp')
    .service('auth', function auth($scope, $http, alert, authToken, $state, $timeout, API_URL) {


        var loginURL = API_URL + "login";
        var registerURL = API_URL + "register";
        var user;

        this.login = function (email, password) {

            user = {

                email: email,
                password: password
            };

             return $http.post(loginURL, JSON.stringify(user), {headers: {'Content-Type': 'application/json'}});

        }


        this.register = function (email, password) {

            user = {

                email: email,
                password: password
            };


            return $http.post(registerURL, JSON.stringify(user), {headers: {'Content-Type': 'application/json'}});

        }

    });
