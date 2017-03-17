'use strict';

angular.module('myApp.employee', [
  'ngRoute',
  'myApp.employee.createId',
  'myApp.employee.changePassword',
  'myApp.employee.leaves'
])

  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.when('/employee', {
      templateUrl: 'features/employee/employee.html',
      controller: 'employeeCtrl'
    });
  }])

  .controller('employeeCtrl', [function() {

  }]);