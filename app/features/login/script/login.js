'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'features/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$rootScope', '$scope','$window', '$location', 'loginService', function($rootScope, $scope, $window, $location, loginService) {
    $scope.formData = {
      userName : "",
      password : ""
    };


    $scope.doLogin = function(){
      var loginData = {
        "id":$scope.formData.userName,
        "password": $scope.formData.password
      }

      loginService.doLogin(loginData).then(function (response) {
        $rootScope.returnData = response.data;
        $window.alert(response.data.message);
        if (response.data.message == "You are Logged in as employee.... "){
          $location.path('/employee');
        }
        else if (response.data.message == "You are Logged in as admin.... "){
          $location.path('/admin');
        }
        else {
          return false;
        }
      });
    }
}])

.service('loginService', ['$http', function ($http) {
  var _this = this;

  _this.doLogin = function (data) {
     return $http.post('http://itech-pc:8080/HRMS/hrms_REST/login', data)
  };

  return _this;


  
}]);
