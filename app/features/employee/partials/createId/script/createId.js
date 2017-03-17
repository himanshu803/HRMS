'use strict';

angular.module('myApp.employee.createId', ['ngRoute','ngFileUpload'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/employee/createId', {
      templateUrl: 'features/employee/partials/createId/createId.html',
      controller: 'createIdCtrl'
    });
  }])

  .controller('createIdCtrl', ['$rootScope','$scope', 'Upload', '$timeout','creteIdService', function ($rootScope,$scope, Upload, $timeout, creteIdService) {
    $scope.workStatus =["Active", "Inactive"];

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
      var idData = {
        "emp_id" : $scope.formData.employeeId,
        "emp_name" : $scope.formData.employeeName,
        "emp_dob" : $scope.formData.dateOfBirth,
        "emp_date_of_joining" : $scope.formData.dateOfJoin,
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
        alert(response.data.message);
      })

    };

    //ng-file-upload
    $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'http://itech-pc:8080/HRMS/hrms_REST/submitIDFormImage',
        data: {'emp_id': $scope.formData.employeeId, file: file}
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
      return $http.post("http://itech-pc:8080/HRMS/hrms_REST/submitIDForm", data);
    };

    return _this;
  }]);
