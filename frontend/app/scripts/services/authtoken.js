'use strict';

/**
 * @ngdoc service
 * @name authApp.authToken
 * @description
 * # authToken
 * Factory in the authApp.
 */
angular.module('authApp')
    .factory('authToken', function ($window) {


        var storage = $window.localStorage;
        var cachedToken;

        var setToken = function (token) {

            cachedToken = token;
            storage.setItem('userToken', token);
        };

        var getToken = function () {

            if(!cachedToken){

                cachedToken = storage.getItem('userToken');
            }

            return cachedToken;
        };

        var isAuthenticated = function () {

            return !!getToken();

        }

        var removeToken = function () {

            cachedToken = null;
            storage.removeItem('userToken');
        }


        return {
            setToken: setToken,
            getToken: getToken,
            isAuthenticated: isAuthenticated,
            removeToken: removeToken
        };
    });
