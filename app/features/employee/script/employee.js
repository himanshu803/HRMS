'use strict';

angular.module('myApp.employee', [
  'ngRoute',
  'myApp.employee.createId',
  'myApp.employee.changePassword',
  'myApp.employee.leaves',
  'myApp.employee.compensationBenefits'
])

  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.when('/employee', {
      resolve: {
        "check": function ($location, $rootScope) {
          if(!$rootScope.loggedIn) {
             $location.path('/');
          }
        }
      },
      templateUrl: 'features/employee/employee.html',
      controller: 'employeeCtrl'
    });
  }])

  .controller('employeeCtrl', [function() {

  }]);