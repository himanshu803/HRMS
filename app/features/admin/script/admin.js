'use strict';

angular.module('myApp.admin', [
  'ngRoute',
  'myApp.admin.createEmployee',
  'myApp.admin.viewEmployee',
  'myApp.admin.viewAllEmployee'
])

  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.when('/admin', {
      /*resolve: {
        "check": function ($location, $rootScope) {
          if(!$rootScope.loggedIn) {
            $location.path('/');
          }
        }
      },*/
      templateUrl: 'features/admin/admin.html',
      controller: 'adminCtrl'
    });
  }])

  .controller('adminCtrl', [function() {

  }]);