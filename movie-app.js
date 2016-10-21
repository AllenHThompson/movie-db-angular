var app = angular.module('my-app',['ngRoute']);

var tempArray = [];
var arr = [];

//var BASE_URL =
var API_KEY = 'fec8b5ab27b292a68294261bb21b04a5';

app.config(function($routeProvider) {
     $routeProvider
     .when('/', {
          controller: 'MainController',
          templateUrl: 'main.html'
     })
     .when('/counter/:counter', {
          controller: 'BackController',
          templateUrl: 'main.html'
     })
     .when('/cache', {
          controller: 'CacheController',
          templateUrl: 'main.html'
     })
     .when('/:movieID', {
          controller: 'DetailsController',
          templateUrl: 'details.html'
     });
});

app.factory('counterService', function($http) {
     return {
          counter:       2,
          getCounter:    function() {
                              return this.counter;
                         },
          setCounter:    function(counter) {
                              this.counter = counter;
                         }
          };
});

app.controller('CacheController', function($scope, $http){
     //console.log("CacheController is here");
     for (var i = 1; i <= 10; i++) {
          //var url = 'http://api.themoviedb.org/3/movie/now_playing?api_key='+API_KEY+'&page='+i
          var url = "http"
          var fun = $http.get(url).success(function(movies) {
               // tempArray.push(movies)
               // arr.push(tempArray)
          })
          console.log("interation"+i)

          setInterval(fun, 5000);
     }
     //console.log("arr: ", arr);
});

app.controller('MainController', function($scope, $http, counterService) {
     var counter = 2;
     //var x = []

     // $http.get("http://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY)

     // $scope.imgURL = 'http://image.tmdb.org/t/p/w382';

     //$scope.dataResults = [];

     //VVVV ALTERNATIVE HTTP CALL VVVV
     // $http({
     //      method: 'GET',
     //      url: 'http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY,
     // })
     // .success(function (movies, status, headers, config) {
     //      $scope.movies = movies.results;
     // })
     // .error(function (movies, status, headers, config) {
     //      console.log(status)
     //      return {"status": false};
     // });

     $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY)
          .success(function(movies) {
               $scope.movies = movies.results;
               tempArray.push(movies);
               console.log(movies);
               console.log("tempArray: ",tempArray);
               //return x
               $scope.more = function(tempArray) {
                    $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + "&page="+ counter).success(function(movies) {
                         var tempArray = [];
                         $scope.movies = movies.results;
                         console.log("you clicked");
                         tempArray.push(movies);
                         arr.push(tempArray);
                         console.log("tempArray: ",tempArray);
                         console.log("tempArray[0].results: ", tempArray.results)
                         console.log("arr: ", arr)
                         console.log("arr[0][0].results[2].id: ",arr[0][0].results[2].id)
                         console.log("arr[0][0].page: ",arr[0][0].page)
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
          counterService.setCounter(counter);
});

app.controller('DetailsController', function($scope, $http, $routeParams, counterService) {
     var counter;
     counter = counterService.counter;
     $scope.movieID = $routeParams.movieID;
     var url = 'http://api.themoviedb.org/3/movie/' +
          $routeParams.movieID + '?api_key=' + API_KEY;
     $http.get(url)
     .success(function(data){
          console.log("data: ", data);
          $scope.movieID = $routeParams.movieID;
          $scope.data = data;

          $scope.back = function(){
               console.log("you clicked the back button")
               console.log(counter)

               $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + "&page="+ 9).success(function(movies) {
                    console.log("back movies: ", movies)
                    $scope.movies = movies.results
                    console.log("get back method")
               });
          }
     });
});
