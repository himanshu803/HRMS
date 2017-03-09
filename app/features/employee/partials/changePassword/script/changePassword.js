'use strict';

angular.module('myApp.employee.changePassword', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/employee/changePassword', {
      templateUrl: 'features/employee/partials/changePassword/changePassword.html',
      controller: 'changePasswordCtrl'
    });
  }])

  .controller('changePasswordCtrl', ['$rootScope','$scope','$http', function ($scope, $rootScope, $http) {
    $scope.formData = {
      employeeId: "",
      employeeOldPassword: "",
      employeeNewPassword: ""
    };


    $scope.changePassword = function () {
      var changePasswordData = {
        "id" : $scope.formData.employeeId,
        "oldPassword" : $scope.formData.employeeOldPassword,
        "newPassword": $scope.formData.employeeNewPassword
      };

      $http.get("http://itech-pc:8080/HRMS/hrms_REST/changePassword/?id="+changePasswordData.id+"&oldPassword="+changePasswordData.oldPassword+"&newPassword="+changePasswordData.newPassword+"")
        .then(function(response) {
          $rootScope.returnData = response.data;
          alert(response.data.message);
        });
    }

  }]);

