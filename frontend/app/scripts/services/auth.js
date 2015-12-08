'use strict';

/**
 * @ngdoc service
 * @name authApp.auth
 * @description
 * # auth
 * Service in the authApp.
 */
angular.module('authApp')
    .factory('auth', function auth( $http, authToken, API_URL, $window, GOOGLE_AUTH_ENDPOINT, CLIENT_ID, $q) {


        var loginURL = API_URL + "login";
        var registerURL = API_URL + "register";
        var user;

        var login = function (email, password) {

            user = {

                email: email,
                password: password
            };

             return $http.post(loginURL, user, {headers: {'Content-Type': 'application/json'}});

        };


        var register = function (email, password) {

            user = {

                email: email,
                password: password
            };


            return $http.post(registerURL, user, {headers: {'Content-Type': 'application/json'}});

        };

        var urlBuilder = [];
        urlBuilder.push("response_type=code" , "client_id=" + CLIENT_ID , "redirect_uri=" + window.location.origin, 'scope=profile email')


        var googleAuth = function () {

            var url = GOOGLE_AUTH_ENDPOINT + "?" + urlBuilder.join('&');

            var options = "width=500, height=500, left="  + ($window.outerWidth - 500) / 2 +
                    " top= "+ ($window.outerHeight - 500) / 2.5;

            var deferred = $q.defer();

            var popUpWindow = $window.open(url,'', options );
            popUpWindow.focus();

            $window.addEventListener('message', function (event){


                if(event.origin === $window.location.origin) {

                    var authorizationCode = event.data;

                    popUpWindow.close();


                    $http.post(API_URL + "auth/google", {

                        authorizationCode: authorizationCode,
                        client_id: CLIENT_ID,
                        redirect_uri: API_URL
                    }, {headers: {'Content-Type': 'application/json'}}).success(function (response) {

                        alert('success', 'Account logged in', 'Welcome ' + response.user.displayName + "!");
                        authToken.setToken(response.token);

                        deferred.resolve(response);

                    });
                }

            });


            return deferred.promise

        }

        return {

            login: login,
            register: register,
            googleAuth: googleAuth
        }

    });
