'use strict';

angular.module('myApp.employee.compensationBenefits', ['ngRoute', 'angular-growl'])

  .config(['$routeProvider','growlProvider', function($routeProvider, growlProvider) {
    $routeProvider.when('/employee/compensationBenefits', {
      templateUrl: 'features/employee/partials/compensationBenefits/compensationBenefits.html',
      controller: 'compensationBenefitsCtrl'
    });
    growlProvider.globalTimeToLive(10000);
    growlProvider.onlyUniqueMessages(false);
  }])

  .controller('compensationBenefitsCtrl', ['$rootScope','$scope','$http','growl', function ($scope, $rootScope, $http, growl) {

  }]);

