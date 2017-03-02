'use strict';

var myApp = angular.module('myApp.admin.viewAllEmployee', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin/viewAllEmployee', {
      templateUrl: 'features/admin/partials/viewAllEmployee/viewAllEmployee.html',
      controller: 'viewAllEmployeeCtrl'
    });
  }])

  .controller('viewAllEmployeeCtrl', ['$scope', function($scope) {
     // $scope.employees = [];
      $scope.employees = [
        {id: '182', name:'Sachin Bahety', email:'sachin@gmail.com', password:'Sachin@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'},
        {id: '124', name:'Vishal Thakur', email:'vishal@gmail.com', password:'Vishal@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'},
        {id: '174', name:'Shivani Sharan', email:'shivani@gmail.com', password:'Shivani@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'},
        {id: '193', name:'Jaya Swamy', email:'jaya@gmail.com', password:'Jaya@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'},
      ]
  }]);