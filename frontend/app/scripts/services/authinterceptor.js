'use strict';

/**
 * @ngdoc service
 * @name authApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the authApp.
 */
angular.module('authApp')
    .factory('authInterceptor', function (authToken) {


        var request = function (config) {

            var token = authToken.getToken();

            if(token){

                config.headers.Authorization = token;
            }

            return config;
        }

        var response = function (response) {

            return response;
        }

        return {
            request: request,
            response: response
        };
    });
