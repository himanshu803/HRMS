'use strict';

angular.module('myApp.employee.createId', ['ngRoute','ngFileUpload', 'angularMoment', 'angular-growl'])

  .config(['$routeProvider','growlProvider', function($routeProvider, growlProvider ) {
    $routeProvider.when('/employee/createId', {
      templateUrl: 'features/employee/partials/createId/createId.html',
      controller: 'createIdCtrl'
    });
    growlProvider.globalTimeToLive(2000);
    growlProvider.onlyUniqueMessages(false);
  }])

  .controller('createIdCtrl', ['$rootScope','$scope', 'Upload', '$timeout','creteIdService','growl', function ($rootScope,$scope, Upload, $timeout, creteIdService, growl) {
    $scope.workStatus =["Active", "Inactive"];

    $scope.resetForm = {};

    $scope.reset = function () {
      $scope.formData = angular.copy($scope.resetForm);
    };

    $scope.formData = {
      employeeId : "",
      employeeName : "",
      dateOfBirth : "",
      dateOfJoin : "",
      employeeOfficialEmail : "",
      employeePersonalEmail : "",
      currentAddress : "",
      permanentAddress : "",
      designation : "",
      bloodGroup : "",
      contactNum : "",
      emergencyNum: "",
      selectedStatus:''
    };

    $scope.createId = function () {
      var dateOfBirth = moment.utc($scope.formData.dateOfBirth, 'dd.MM.yyyy').local().format('YYYY-MM-DD');
      var dateOfJoin = moment.utc($scope.formData.dateOfJoin, 'dd.MM.yyyy').local().format('YYYY-MM-DD');
      var idData = {
        "emp_id" : $scope.formData.employeeId,
        "emp_name" : $scope.formData.employeeName,
        "emp_dob" : dateOfBirth,
        "emp_date_of_joining" : dateOfJoin,
        "emp_official_email_id" : $scope.formData.employeeOfficialEmail,
        "emp_personal_email_id" : $scope.formData.employeePersonalEmail,
        "emp_current_address" : $scope.formData.currentAddress,
        "emp_permanent_address" : $scope.formData.permanentAddress,
        "emp_designation" : $scope.formData.designation,
        "emp_blood_group" : $scope.formData.bloodGroup,
        "emp_mobile_no" : $scope.formData.contactNum,
        "emp_emergency_contact_no": $scope.formData.emergencyNum,
        "emp_working_status" : $scope.formData.selectedStatus
      };

      creteIdService.createId(idData).then(function (response) {
        $rootScope.returnData = response.data;
        $scope.reset();
        growl.success(response.data.message, {title: "Success!"});
      })

    };

    //ng-file-upload
    $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'http://192.168.1.127:8080/hrms/hrms_REST/submitIDFormImage',
        data: {'id': $scope.formData.employeeId, file: file}
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

  /*.directive("fileModel",function() {
    return {
      restrict: 'EA',
      scope: {
        setFileData: "&"
      },
      link: function(scope, ele, attrs) {
        ele.on('change', function() {
          scope.$apply(function() {
            var val = ele[0].files[0];
            scope.setFileData({ value: val });
          });
        });
      }
    }
  })*/

  /*.directive("fileread", [function () {
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
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }])*/

  .service('creteIdService',['$http',function ($http) {
    var _this = this;

    _this.createId = function (data) {
      return $http.post("http://192.168.1.127:8080/hrms/hrms_REST/submitIDForm", data);
    };

    return _this;
  }]);
