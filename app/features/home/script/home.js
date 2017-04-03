'use strict';

var myAppHome = angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'features/home/home.html',
    controller: 'homeCtrl'
  });
}]);

