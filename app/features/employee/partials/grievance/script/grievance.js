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

    $scope.grievances = [
      {grievanceType:"Department",grievanceName: "Akash C", grievanceDetail:"Misbehavior with employees", actionSuggested:"Suspend for sometime of period", grievanceStatus:"Open"},
      {grievanceType:"Employee",grievanceName: "Rajesh D", grievanceDetail:"Misbehavior with employees", actionSuggested:"Suspend for sometime of period", grievanceStatus:"Close"}
      ];

    var grievanceData = {
      "grievanceType": $scope.grievanceType,
      "grievanceName": $scope.grievanceName,
      "grievanceDetail": $scope.grievanceDetail,
      "actionSuggested": $scope.actionSuggested,
      "grievanceStatus": "Open"
    };

    $scope.submitGrievance = function () {
      $scope.grievances.push(grievanceData);
      growl.success("<strong style='color:#7314bf'>Grievance Raised</strong><h1 style='color:#06682c'>Successfully</h1>", {title: "Success!"});
    }

  }]);


