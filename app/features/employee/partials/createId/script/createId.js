'use strict';

angular.module('myApp.employee.createId', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/employee/createId', {
      templateUrl: 'features/employee/partials/createId/createId.html',
      controller: 'createIdCtrl'
    });
  }])

  .controller('createIdCtrl', [function() {

  }]);