'use strict';

angular.module('myApp.admin.createEmployee', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin/createEmployee', {
      templateUrl: 'features/admin/partials/createEmployee/createEmployee.html',
      controller: 'createEmployeeCtrl'
    });
  }])

  .controller('createEmployeeCtrl', [function() {

  }]);