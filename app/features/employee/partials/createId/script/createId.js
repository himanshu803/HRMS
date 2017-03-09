'use strict';

angular.module('myApp.employee.createId', ['ngRoute','ngFileUpload'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/employee/createId', {
      templateUrl: 'features/employee/partials/createId/createId.html',
      controller: 'createIdCtrl'
    });
  }])

  .controller('createIdCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.formData = {
      employeeName : "",
      dateOfBirth : "",
      dateOfJoin : "",
      employeeEmail : "",
      currentAddress : "",
      designation : "",
      bloodGroup : "",
      contactNum : "",
      emergencyNum: "",
      uploadImage: ""
    };

    $scope.createId = function () {
      var idData = {
        "name" : $scope.formData.employeeName,
        "dateOfBirth" : $scope.formData.dateOfBirth,
        "dateOfJoin" : $scope.formData.dateOfBirth,
        "email" : $scope.formData.employeeEmail,
        "currentAddress" : $scope.formData.currentAddress,
        "designation" : $scope.formData.designation,
        "bloodGroup" : $scope.formData.bloodGroup,
        "contactNum" : $scope.formData.contactNum,
        "emergencyNum": $scope.formData.currentAddress,
        "uploadImage": $scope.formData.uploadImage
      }

    };



    $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: {username: $scope.username, file: file},
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  }])

  .directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }])

  .directive('validFile',function(){
    return {
      require:'ngModel',
      link:function(scope,el,attrs,ngModel){
        //change event is fired when file is selected
        el.bind('change',function(){
          scope.$apply(function(){
            ngModel.$setViewValue(el.val());
            ngModel.$render();
          });
        });
      }
    }
  });
