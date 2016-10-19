var app = angular.module('my-app',['ngRoute']);

//var BASE_URL =
var API_KEY = 'fec8b5ab27b292a68294261bb21b04a5';

app.config(function($routeProvider) {
     $routeProvider
     .when('/', {
          controller: 'MainController',
          templateUrl: 'main.html'
     })
     .when('/:movieID', {
          controller: 'DetailsController',
          templateUrl: 'details.html'
     });
});

app.factory('searchService', function($http) {
     var counter = 0;
     return {
          more: function() {
               $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + "&page="+ counter).success(function(movies) {
                    $scope.movies = movies.results;
                    if (counter < movies.total_pages){
                         console.log(movies.total_pages);
                         counter++;
                    } else {
                         counter = 0;
                    }
                    //console.log(movies.results[1])
               });
                    console.log("you clicked");
                    console.log(counter);
               }
     };
});

app.controller('MainController', function($scope, $http, searchService) {
     var counter = 2;
     // $http.get("http://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY)

     // $scope.imgURL = 'http://image.tmdb.org/t/p/w382';

     $scope.dataResults = [];
     var x = []
     $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY)
          .success(function(movies) {

               $scope.movies = movies.results;
               console.log(movies);

               searchService.more()

               $scope.more = function() {
                    $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + "&page="+ counter).success(function(movies) {
                         $scope.movies = movies.results
                         //console.log(movies.results[1])
                    });
                    console.log("you clicked");

                    if (counter < movies.total_pages){
                         console.log(movies.total_pages)
                         counter++;
                    } else {
                         counter = 0;
                    }
                    console.log(counter)
               };
               // $scope.movies = movies;
          });
});

app.controller('DetailsController', function($scope, $http, $routeParams) {
     $scope.movieID = $routeParams.movieID;
     var url = 'http://api.themoviedb.org/3/movie/' +
          $routeParams.movieID + '?api_key=' + API_KEY;
     $http.get(url)
     .success(function(data){
          console.log("data: " , data);
          $scope.movieID = $routeParams.movieID;
          $scope.data = data;
     });
});
