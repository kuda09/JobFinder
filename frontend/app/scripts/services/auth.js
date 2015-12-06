'use strict';

/**
 * @ngdoc service
 * @name authApp.auth
 * @description
 * # auth
 * Service in the authApp.
 */
angular.module('authApp')
    .factory('auth', function auth( $http, authToken, API_URL) {


        var loginURL = API_URL + "login";
        var registerURL = API_URL + "register";
        var user;

        var login = function (email, password) {

            user = {

                email: email,
                password: password
            };

             return $http.post(loginURL, user, {headers: {'Content-Type': 'application/json'}});

        }


        var register = function (email, password) {

            user = {

                email: email,
                password: password
            };


            return $http.post(registerURL, user, {headers: {'Content-Type': 'application/json'}});

        }

        return {

            login: login,
            register: register
        }

    });
