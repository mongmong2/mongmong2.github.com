'use strict';

angular.module('myApp.accountlist', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/accountlist', {
      templateUrl: 'accountlist/accountlist.html',
      controller: 'AccountListController'
    });
  }])
  .controller('AccountListController', ['$scope', '$mdMedia', '$mdDialog', '$window', '$routeParams', function ($scope, $mdMedia, $mdDialog, $window, $routeParams, $http) {
    angular.element(document).ready(function () {
      $scope.monthList = [{
        "name": "Jan",
        "value": "1"
      }, {
        "name": "Feb",
        "value": "2"
      }, {
        "name": "Mar",
        "value": "3"
      }, {
        "name": "Apr",
        "value": "4"
      }, {
        "name": "May",
        "value": 5
      }, {
        "name": "Jun",
        "value": 6
      }, {
        "name": "Jul",
        "value": 7
      }, {
        "name": "Aug",
        "value": 8
      }, {
        "name": "Sep",
        "value": 9
      }, {
        "name": "Oct",
        "value": 10
      }, {
        "name": "Nov",
        "value": 11
      }, {
        "name": "Dec",
        "value": 12
      }];

      $scope.loadAccountBookItems(1);
      renderFooter($window);
    });

    $scope.loadAccountBookItems = function(monthValue) {
      // TODO: 임시로 데이터를 불러옴
      if (monthValue == 1) {
        $scope.accountBookItems = [{
          "day": "03",
          "title": "이월",
          "accountPlusMinus": "+",
          "accountAmount": "450000"
        }, {
          "day": "13",
          "title": "1월 모임",
          "href": "http://www.naver.com",
          "accountPlusMinus": "-",
          "accountAmount": "200000"
        }, {
          "day": "15",
          "title": "회비 입금",
          "subtitle": "A언니",
          "accountPlusMinus": "+",
          "accountAmount": "10000"
        }, {
          "day": "17",
          "title": "회비 입금",
          "subtitle": "B언니",
          "accountPlusMinus": "+",
          "accountAmount": "10000"
        }];
      } else {
        $scope.accountBookItems = [];
      }
    };

    $scope.showDetail = function (ev) {
      var sourceElement = angular.element(ev.srcElement);
      console.log(sourceElement);
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'meetingDetail.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true,
        openFrom: sourceElement,
        closeTo: sourceElement
      })
    };

    $scope.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog1.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (answer) {
        }, function () {
        });
    };

    function renderFooter($window) {
      var listContent = angular.element(document.getElementById('listContent'));
      var windowHeight = $window.innerHeight;

      listContent.css('height', windowHeight + "px");

      var elementAddButtonSrc = document.getElementById('elementAddButton');
      var elementAddButtonBackgroundSrc = document.getElementById('elementAddButtonBackground');
      var elementAddButton = angular.element(elementAddButtonSrc);
      var elementAddButtonBackground = angular.element(elementAddButtonBackgroundSrc);
      var windowWidth = $window.innerWidth;
      var buttonPositionX = (windowWidth / 2) - 28;
      var backgroundPositionX = (windowWidth / 2) - 25;

      elementAddButton.css('left', buttonPositionX + 'px');
      elementAddButtonBackground.css('left', backgroundPositionX + 'px');
    }

  }]);

function DialogController($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}