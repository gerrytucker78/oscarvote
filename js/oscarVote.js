var ovoteApp = angular.module('ovoteApp', []);
ovoteApp.controller('VoteController', ['$scope','$http', function($scope,$http) {
  $scope.message = '';
  $scope.years = [];
  $scope.categories= [];
  $scope.year = '';
  $scope.category = '';
  $scope.candidates = [];
  $scope.candidate = '';
  $scope.data = [];

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

  $scope.viewResults = function() {
    if ($scope.year != "" && $scope.category !="") {
      var url = '/votes/year/category/'+$scope.year+'.'+$scope.category;

      $http.get(url).success(function(data, status, headers, config) {
        $scope.data = data;

        // Process Vote Data
        var procData = [];
        var totalVotes = 0;

        for (i = 0; i < $scope.data.length; i++) {
          totalVotes = data[i].votes + totalVotes;
        }

        for (i = 0; i < $scope.data.length; i++) {
          $scope.data[i].pTotal = ($scope.data[i].votes/totalVotes)*100;
        }

        showResults(true);
      }).
      error(function(data,status,headers,config) {
        $scope.message = "Error attempting to retrieve results.  Make sure a year and category are selected and try again.";
        successMessageOn(false);
        errorMessageOn(true);
      });
    } else {
        $scope.message = "Error attempting to retrieve results.  Make sure a year and category are selected and try again.";
        successMessageOn(false);
        errorMessageOn(true);
    }
  };

  $scope.vote = function() {
    if ($scope.year != "" && $scope.year != "-- Select Year --" && $scope.category !="" && $scope.category != "-- Select Category --" && $scope.candidate != "" && $scope.candidate != null) {
      var url = '/votes/add/'+$scope.year+'.'+$scope.category+"."+$scope.candidate.name;

      $http.get(url).success(function(data, status, headers, config) {
        $scope.message = data;
        successMessageOn(true);
      }).
      error(function(data,status,headers,config) {
        $scope.message = "Error attempting to cast vote.  Make sure a year, category, and candidate are selected and try again.";
        successMessageOn(false);
        errorMessageOn(true);
      });

      //$scope.message = 'Vote cast for ' + $scope.year +' '+ $scope.category + ' ' + $scope.candidate.name;
      $scope.candidates = [];
      $scope.loadSelections();
        $scope.viewResults();
    } else {
        $scope.message = "Error attempting to cast vote.  Make sure a year, category, and candidate are selected and try again.";
        successMessageOn(false);
        errorMessageOn(true);
    }
  };

  $scope.resetMessages = function() {
    successMessageOn(false);
    errorMessageOn(false);
    showResults(false);
  };

  $scope.loadSelections = function() {
    var url = '';
    successMessageOn(false);
    errorMessageOn(false);
    showResults(false);
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

ovoteApp.directive('barsChart', function ($parse) {
     var directiveDefinitionObject = {
         restrict: 'E',
         replace: false,
         scope: {data: '=data'},
         link: function (scope, element, attrs) {
           var chart = d3.select(element[0]);

            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.data).enter().append("div")
             .style("width", function(d) { return d.pTotal + "%"; })
             .text(function(d) { return d.name; });

            scope.$watch('data',function (newData, oldData) {
              chart.selectAll('*').remove();
              chart.append("div").attr("class", "chart")
               .selectAll('div')
               .data(newData).enter().append("div")
               .style("width", function(d) { return d.pTotal + "%"; })
               .text(function(d) { return d._id + " (" + d.votes + ")"; });

            });
         } 
      };
      return directiveDefinitionObject;
});

function showResults(flag) {
  if (flag) {
    document.getElementById('resultsChart').style.display = 'block';
  } else {
    document.getElementById('resultsChart').style.display = 'none';
  }
}


function successMessageOn(flag) {
  if (flag) {
    document.getElementById('messageSuccess').style.display = 'block';
  } else {
    document.getElementById('messageSuccess').style.display = 'none';
  }
}


function errorMessageOn(flag) {
  if (flag) {
    document.getElementById('messageFail').style.display = 'block';
  } else {
    document.getElementById('messageFail').style.display = 'none';
  }
}

