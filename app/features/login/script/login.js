'use strict';

angular.module('myApp.login', ['ngRoute', 'angular-growl'])

.config(['$routeProvider','growlProvider', function($routeProvider, growlProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'features/login/login.html',
    controller: 'loginCtrl'
  });
  growlProvider.globalTimeToLive(3000);
  growlProvider.onlyUniqueMessages(false);
}])

.controller('loginCtrl', ['$rootScope', '$scope','growl', '$location', 'loginService', function($rootScope, $scope, growl, $location, loginService) {
    $scope.formData = {
      userName : "",
      password : ""
    };


    $scope.doLogin = function(){
      var loginData = {
        "id":$scope.formData.userName,
        "password": $scope.formData.password
      };

      var successFun = function (response) {
        $rootScope.returnData = response.data;
        if (response.data.message == "You are Logged in as employee.... "){
          $rootScope.loggedIn = true;
          growl.success(response.data.message, {title: 'Success!'});
          $location.path('/employee');
        }
        else if (response.data.message == "You are Logged in as admin.... "){
          $rootScope.loggedIn = true;
          growl.success(response.data.message, {title: 'Success!'});
          $location.path('/admin');
        }
        else {
          $rootScope.loggedIn = true;
          growl.warning(response.data.message, {title: 'Warning!'});
          return false;
        }
      };

      var errorFun = function(error){
        var errorMessage = "Ooops... Something went wrong.!!!"
         if(error.status < 0){
           errorMessage = "Connection error!"
         }else{
           errorMessage = error.data.message;
         }
         growl.error(errorMessage, {title: 'Error'});
      };

      loginService.doLogin(loginData).then(successFun, errorFun);

    }
}])

.service('loginService', ['$http', function ($http) {
  var _this = this;

  _this.doLogin = function (data) {
     return $http.post('http://192.168.1.127:8080/hrms/hrms_REST/login', data)
  };

  return _this;

}]);
