'use strict';

angular.module('myApp.admin.createEmployee', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin/createEmployee', {
      templateUrl: 'features/admin/partials/createEmployee/createEmployee.html',
      controller: 'createEmployeeCtrl'
    });
  }])

  .controller('createEmployeeCtrl', ['$rootScope','$scope','$location','createEmployeeService', function($rootScope, $scope, $location, createEmployeeService) {
     $scope.companies = ["I-tech Software Solution Pvt Ltd", "Java R&D Labs", "Shri Ganesh"];
     $scope.roles =["Admin", "Employee"];

     $scope.formData = {
       employeeId : "",
       employeePassword : "",
       employeeName : "",
       employeeEmail : "",
       selectedCompany : "",
       selectedRole : ""
    };

    $scope.createNewEmployee = function () {
      var employeeData = {
        "id": $scope.formData.employeeId,
        "name": $scope.formData.employeeName,
        "password": $scope.formData.employeePassword,
        "email": $scope.formData.employeeEmail,
        "company": $scope.formData.selectedCompany,
        "role": $scope.formData.selectedRole
      };

      createEmployeeService.createNewEmployee(employeeData).then(function (response) {
        $rootScope.returnData = response.data;
        if (response.data.message == "Registered Successfully! ") {
          alert("Employee Registered Successfully");
          $scope.formData.reset();
        } else {
          alert("Employee already registered");
          return false;
        }
      });
    }
  }])

  .service('createEmployeeService', ['$http', function ($http) {
    var _this = this;

    _this.createNewEmployee = function (data) {
      return $http.post('http://itech-pc:8080/HRMS/hrms_REST/register', data)
    };

    return _this;
  }])