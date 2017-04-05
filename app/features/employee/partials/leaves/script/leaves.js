'use strict';

angular.module('myApp.employee.leaves', ['ngRoute','ui.bootstrap', 'angularMoment', 'angular-growl'])

  .config(['$routeProvider','growlProvider', function($routeProvider, growlProvider) {
    $routeProvider.when('/employee/leaves', {
      templateUrl: 'features/employee/partials/leaves/leaves.html',
      controller: 'leavesCtrl'
    });
    growlProvider.globalTimeToLive(2000);
    growlProvider.onlyUniqueMessages(false);
  }])

  .controller('leavesCtrl', ['$scope','growl', function ($scope, growl) {
    $scope.maxDate = new moment().add(100, 'y');

    // start date
    $scope.startDateClear = function() {
      $scope.startDate = null;
    };

    $scope.startDateOpen = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.startDateOpened = true;
    };

    //Full Day
    $scope.fullDays = [];

    $scope.addAnotherFullLeave = function () {
      var startFullDay = angular.copy($scope.fullStartDate);
      var endFullDay = angular.copy($scope.fullEndDate);
      $scope.fullDays.push({'startDate': startFullDay, 'endDate': endFullDay, 'openFrom':false, 'openTo':true});
      $scope.fullDate = null;
    };

    $scope.removedAnotherFullLeave = function(index) {
      $scope.fullDays.splice(index,1);
    };

    $scope.fullDateClear = function() {
      $scope.fullDays = [];
    };

    $scope.fullDateOpenForLoopFun = function ($event, fullDay) {
      $event.preventDefault();
      $event.stopPropagation();

      fullDay.openFrom = !fullDay.openFrom;
      fullDay.openTo = !fullDay.openTo;
    };

    //Half Day
    $scope.halfDays = [];

    $scope.addAnotherHalfLeave = function () {
      var anotherHalfDay = angular.copy($scope.halfDate);
      $scope.halfDays.push({'date': anotherHalfDay, 'isOpen':false});
      $scope.halfDate = null;
    };

    $scope.removedAnotherHalfLeave = function(index) {
      $scope.halfDays.splice(index,1);
    };

    $scope.halfDateOpen = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.halfDateOpened = true;
    };

    $scope.halfDateOpenForLoopFun = function ($event, halfDay) {
      $event.preventDefault();
      $event.stopPropagation();

      halfDay.isOpen = !halfDay.isOpen;
    };

    // end date
    $scope.endDateClear = function() {
      $scope.endDate = null;
    };

    $scope.endDateOpen = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.endDateOpened = true;
    };

    // generic functions
    $scope.toggleMin = function() {
      $scope.minDate = new moment();
    };
    $scope.toggleMin();

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

    // duration
    $scope.getDuration = function(start, end) {
      var startDate = moment.utc(start, 'dd.MM.yyyy').local().format('DD-MM-YYYY');
      var endDate = moment.utc(end, 'dd.MM.yyyy').local().format('DD-MM-YYYY');
      try {
        if (startDate == "Invalid date" || endDate == "Invalid date") {
          var date = ($scope.halfDays.length / 2);
          return (date + " Day");
        }
        else if (startDate == endDate) {
            var date = ($scope.halfDays.length / 2) + 1;
            return (date + " Day");
        }
        else {
          var daysDiff = (moment.duration(end - start))._data.days;
          var finalDate = daysDiff + ($scope.halfDays.length / 2);
          return (finalDate + " Days");
        }
      } catch (e) {
        return "Cant evaluate"
      }
    };



    $scope.leaveSummary = [
      {date: "10th March 2017 to 20th March 2017", totalLeave: "10.5 Days", halfDays: "21st March 2017", description: "Brother's marriage", status: "pending"},
      {date: "5th Feb 2017 to 11th Feb 2017", totalLeave: "6 Days", halfDays: "12th Feb 2017, 6th Feb 2017", description: "Health Issue", status: "Approved"}
      ];

    $scope.applyLeave = function () {
      $scope.halfDates = [];
      //Halfday leave to get dates
      $scope.halfDays.forEach(function(days) {
        //get the value of name
        var val = days.date;
        var halfDateFormat = moment.utc(val, 'dd.MM.yyyy').local().format('Do MMMM YYYY');
        //push the name string in the array
        $scope.halfDates.push(halfDateFormat);
      });
      var startDate = moment.utc($scope.startDate, 'dd.MM.yyyy').local().format('Do MMMM YYYY');
      var endDate = moment.utc($scope.endDate, 'dd.MM.yyyy').local().format('Do MMMM YYYY');
      var duration  =  $scope.getDuration($scope.startDate, $scope.endDate);
      var leaveData = {
        "date": startDate +" to "+ endDate,
        "totalLeave": duration,
        "halfDays": $scope.halfDates.toString(),
        "description": $scope.description,
        "status": "pending"
      };

      $scope.leaveSummary.push(leaveData);
      growl.success("<strong style='color:#7314bf'>Leave applied</strong><h1 style='color:#06682c'>Successfully</h1>", {title: "Success!"});
      /*alert("Leave applied successfully");*/
    }
  }]);


