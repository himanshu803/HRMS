'use strict';

angular.module('myApp.employee.grievance', ['ngRoute','ui.bootstrap', 'angularMoment', 'angular-growl'])

  .config(['$routeProvider','growlProvider', function($routeProvider, growlProvider) {
    $routeProvider.when('/employee/grievance', {
      templateUrl: 'features/employee/partials/grievance/grievance.html',
      controller: 'grievanceCtrl'
    });
    growlProvider.globalTimeToLive(2000);
    growlProvider.onlyUniqueMessages(false);
  }])

  .controller('grievanceCtrl', ['$scope','growl', function ($scope, growl) {

  }]);


