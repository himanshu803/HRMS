'use strict';

angular.module('myApp.employee.changePassword', ['ngRoute', 'angular-growl'])

  .config(['$routeProvider','growlProvider', function($routeProvider, growlProvider) {
    $routeProvider.when('/employee/changePassword', {
      templateUrl: 'features/employee/partials/changePassword/changePassword.html',
      controller: 'changePasswordCtrl'
    });
    growlProvider.globalTimeToLive(10000);
    growlProvider.onlyUniqueMessages(false);
  }])

  .controller('changePasswordCtrl', ['$rootScope','$scope','$http','growl', function ($scope, $rootScope, $http, growl) {
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

      $http.get("http://192.168.100.101:8080/hrms/hrms_REST/changePassword/?id="+changePasswordData.id+"&oldPassword="+changePasswordData.oldPassword+"&newPassword="+changePasswordData.newPassword+"")
        .then(function(response) {
          $rootScope.returnData = response.data;
          growl.success(response.data.message, {title: "Success!"});
        });
    }

  }]);

