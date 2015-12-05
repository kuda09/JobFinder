(function () {

    'use strict';

    /**
     * @ngdoc overview
     * @name authApp
     * @description
     * # authApp
     *
     * Main module of the application.
     */
    angular
        .module('authApp')
        .config(function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};

            $httpProvider.interceptors.push('authInterceptor');


            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: '/views/main.html'
                })
                .state('register', {

                    url: '/register',
                    templateUrl: '/views/register.html',
                    controller: 'RegisterCtrl'
                })
                .state('logout', {

                    url: '/logout',
                    templateUrl: '/views/logout.html',
                    controller: 'LogoutCtrl'
                })
                .state('contact', {

                    url: '/contact',
                    templateUrl: '/views/contact.html'
                })
                .state('login', {

                    url: '/login',
                    templateUrl: '/views/login.html',
                    controller: 'LoginCtrl'
                })
                .state('jobs', {
                    url: '/jobs',
                    templateUrl: '/views/jobs.html',
                    controller: 'JobsCtrl'
                });



        })
        .constant('API_URL', 'http://localhost:3000/');
})();