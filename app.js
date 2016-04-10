'use strict';

// Declare app level module which depends on views, and components
angular
.module('myApp', [
  'ngRoute',
  'myApp.accountlist',
  'myApp.version',
  'ngMaterial'
])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/accountlist'
  });
}])
.controller('IndexController', function($scope, $timeout, $mdSidenav, $log) {
  this.yearList = ['2016', '2017'];

  $scope.selectedYear = '2016';
  $scope.selectYear = function(targetYear) {
    $scope.selectedYear = targetYear;
    $mdSidenav('left').close();
  };

  $scope.close = function () {
    $mdSidenav('left').close();
  };

  $scope.toggleMenu = buildDelayedToggler('left');

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
})
