'use strict';

/**
 * @ngdoc service
 * @name authApp.alert
 * @description
 * # alert
 * Service in the authApp.
 */
angular.module('authApp')
    .service('alert', function alert($rootScope, $timeout) {

        var alertTimeout;

        return function (type, title, message, timeout) {

            $rootScope.alert = {

                hasBeenShow: true,
                show: true,
                type: type,
                message: message,
                title: title
            };

            $timeout.cancel(alertTimeout);

            alertTimeout = $timeout(function () {

                $rootScope.alert.show = false;

            }, timeout || 1500);

        }
    });
