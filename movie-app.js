var app = angular.module('my-app',['ngRoute']);

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

app.controller('MainController', function($scope, $http) {
     // $http.get("http://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY)

     // $scope.imgURL = 'http://image.tmdb.org/t/p/w382';
     // $scope.dataResults = [];
     $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY).success(function(movies) {
          console.log(movies);
          console.log(movies.total_pages);
          $scope.movies = movies.results;
          // $scope.movies = movies;
     });

     $scope.click = function() {
          console.log("you clicked");
     };

});



app.controller('DetailsController', function($scope, $http, $routeParams) {
     $scope.movieID = $routeParams.movieID;
     var url = 'http://api.themoviedb.org/3/movie/' +
          $routeParams.movieID + '?api_key=' + API_KEY;
     $http.get(url)
     .success(function(data){
          console.log(data);
          $scope.movieID = $routeParams.movieID;
          $scope.data = data;
     });
});
