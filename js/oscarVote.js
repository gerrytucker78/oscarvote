var ovoteApp = angular.module('ovoteApp', []);
ovoteApp.controller('VoteController', ['$scope','$http', function($scope,$http) {
  $scope.message = '';
  $scope.years = [];
  $scope.categories= [];
  $scope.year = '';
  $scope.category = '';
  $scope.candidates = [];
  $scope.candidate = '';

  var yearsUrl = '/candidates/years';
  var categoriesUrl = '/candidates/categories';

  $http.get(yearsUrl).success(function(data, status, headers, config) {
    $scope.years= data;
  }).
  error(function(data,status,headers,config) {
    // TO-DO: Need to fill in.
  });

  $http.get(categoriesUrl).success(function(data, status, headers, config) {
    $scope.categories= data;
  }).
  error(function(data,status,headers,config) {
    // TO-DO: Need to fill in.
  });

  $scope.vote = function() {
    var url = '/votes/add/'+$scope.year+'.'+$scope.category+"."+$scope.candidate.name;

    $http.get(url).success(function(data, status, headers, config) {
      $scope.candidates = data;
      $scope.message = data;
    }).
    error(function(data,status,headers,config) {
      // TO-DO: Need to fill in.
      $scope.message = "Error!";
    });

    $scope.message = 'Vote cast for ' + $scope.year +' '+ $scope.category + ' ' + $scope.candidate.name;
    $scope.category = '';
    $scope.candiates = [];
    $scope.loadSelections();
  };

  $scope.loadSelections = function() {
    var url = '';
    if ($scope.category != '') {
      url = '/candidates/year/category/' + $scope.year + '.' + $scope.category;
      $http.get(url).success(function(data, status, headers, config) {
        $scope.candidates = data;
      }).
      error(function(data,status,headers,config) {
        // TO-DO: Need to fill in.
      });
    } else {
      //url = '/candidates/year/'+$scope.year;
    }

  };

}]);
