'use strict';

angular.module('myApp.employee', [
  'ngRoute',
  'myApp.employee.createId',
  'myApp.employee.changePassword'
])

  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.when('/employee', {
      templateUrl: 'features/employee/employee.html',
      controller: 'employeeCtrl'
    });
  }])

  .controller('employeeCtrl', [function() {

  }]);