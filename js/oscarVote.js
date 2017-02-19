var ovoteApp = angular.module('ovoteApp', []);
ovoteApp.controller('VoteController', ['$scope','$http', function($scope,$http) {
  $scope.message = '';
  $scope.years = [];
  $scope.categories= [];
  $scope.year = '';
  $scope.category = '';
  $scope.selections = [];
  $scope.selection = '';

$scope.myData = [10,20,30,40,60];


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
    $scope.message = 'Vote cast for ' + $scope.year +' '+ $scope.category + ' ' + $scope.selection;
  };

  $scope.loadSelections = function() {
    var url = '';
    if ($scope.category != '') {
      url = '/candidates/year/category/' + $scope.year + '.' + $scope.category;
    } else {
      url = '/candidates/year/'+$scope.year;
    }

    $http.get(url).success(function(data, status, headers, config) {
      $scope.selections = data;
      $scope.message = "All Good: " + url + " = "  + data.length + "!";
    }).
    error(function(data,status,headers,config) {
      // TO-DO: Need to fill in.
      $scope.message = "Error!";
    });
  };

}]);
ovoteApp.directive('barsChart', function ($parse) {
     //explicitly creating a directive definition variable
     //this may look verbose but is good for clarification purposes
     //in real life you'd want to simply return the object {...}
     var directiveDefinitionObject = {
         //We restrict its use to an element
         //as usually  <bars-chart> is semantically
         //more understandable
         restrict: 'E',
         //this is important,
         //we don't want to overwrite our directive declaration
         //in the HTML mark-up
         replace: false,
         scope: {data: '=chartData'},
         link: function (scope, element, attrs) {
           //converting all data passed thru into an array
//           var data = attrs.chartData.split(',');
           //in D3, any selection[0] contains the group
           //selection[0][0] is the DOM node
           //but we won't need that this time
           var chart = d3.select(element[0]);
           //to our original directive markup bars-chart
           //we add a div with out chart stling and bind each
           //data entry to the chart
            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.data).enter().append("div")
//             .transition().ease("cubicInOut")
             .style("width", function(d) { return "50%"; })
             .text(function(d) { return d.category + "%"; });

            scope.$watch('data',function (newData, oldData) { 
              chart.selectAll('*').remove();
              chart.append("div").attr("class", "chart")
               .selectAll('div')
               .data(newData).enter().append("div")
  //           .transition().ease("cubicInOut")
               .style("width", function(d) { return "50%"; })
               .text(function(d) { return d.category + "%"; });

            });
/*
            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.data).enter().append("div")
             //.transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
*/
           //a little of magic: setting it's width based
           //on the data value (d) 
           //and text all with a smooth transition
         } 
      };
      return directiveDefinitionObject;
   });
