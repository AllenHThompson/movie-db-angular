var app = angular.module('my-app',['ngRoute']);
const what = [];
const arr = [];
var y = []

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

app.factory('counterService', function() {
     return {
          counter:  function(){
                         return 2;
                    }
          };
});

app.controller('MainController', function($scope, $http) {
     var counter = 2;
     //var x = []

     // $http.get("http://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY)

     // $scope.imgURL = 'http://image.tmdb.org/t/p/w382';

     //$scope.dataResults = [];


     $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY)
          .success(function(movies) {

               $scope.movies = movies.results;



               arr.push(movies);

               console.log(movies);

               console.log("arr: ",arr);


               //return x


               $scope.more = function(arr) {

                    $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + "&page="+ counter).success(function(movies) {

                         var arr = [];
                         $scope.movies = movies.results;

                         console.log("you clicked");
                         y.push(arr);
                         arr.push(movies);
                         console.log("arr: ",arr);
                         console.log("arr.results: ", arr.results)
                         console.log("y: ", y)
                         console.log("y.page: ",y[0].page)

                         //console.log(movies.results[1])
                    });

                    if (counter < movies.total_pages) {
                         console.log(movies.total_pages);
                         counter++;
                    } else {
                         counter = 0;
                    }
                    x = counter;
                    console.log(counter);
               };

               // $scope.movies = movies;
          });
});

app.controller('DetailsController', function($scope, $http, $routeParams, counterService) {
     var counter;
     counter = counterService.counter();
     $scope.movieID = $routeParams.movieID;
     var url = 'http://api.themoviedb.org/3/movie/' +
          $routeParams.movieID + '?api_key=' + API_KEY;
     $http.get(url)
     .success(function(data){
          console.log("data: " , data);
          $scope.movieID = $routeParams.movieID;
          $scope.data = data;
          $scope.back = function(){
               console.log("you clicked the back button")
               console.log(counter)

               $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY +  "&page="+ counter).success(function(movies) {
                    $scope.movies = movies.results
                    //console.log(movies.results[1])
               });

          }
     });
});
