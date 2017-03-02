'use strict';

angular.module('myApp.admin.viewEmployee', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin/viewEmployee', {
      templateUrl: 'features/admin/partials/viewEmployee/viewEmployee.html',
      controller: 'viewEmployeeCtrl'
    });
  }])

  .controller('viewEmployeeCtrl',['$scope', function($scope) {

       $scope.employees = [
      {id: '182', name:'Sachin Bahety', email:'sachin@gmail.com', password:'Sachin@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'},
      {id: '124', name:'Vishal Thakur', email:'vishal@gmail.com', password:'Vishal@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'},
      {id: '174', name:'Shivani Sharan', email:'shivani@gmail.com', password:'Shivani@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'},
      {id: '193', name:'Jaya Swamy', email:'jaya@gmail.com', password:'Jaya@123', role:'Employee', company:'I-tech Software Solution Pvt Ltd'}
    ];

    var employees= []=  $scope.employees;

      $scope.getEmployee =  function () {
      var a = $scope.employeeId;
        for (var i=0; i<4; i++) {
          if (a == employees[i].id) {
            $scope.selectedEmployee = employees[i];
          }
        }
    }
  }]);