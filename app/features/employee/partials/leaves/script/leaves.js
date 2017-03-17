'use strict';

angular.module('myApp.employee.leaves', ['ngRoute','ui.bootstrap', 'angularMoment'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/employee/leaves', {
      templateUrl: 'features/employee/partials/leaves/leaves.html',
      controller: 'leavesCtrl'
    });
  }])

  .controller('leavesCtrl', ['$scope', function ($scope) {
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
      try {
        return ((moment.duration(end - start)).humanize());
      } catch (e) {
        return "Cant evaluate"
      }
    };

  }]);

