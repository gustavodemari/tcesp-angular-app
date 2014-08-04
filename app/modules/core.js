/* Main App Angular*/
var app = angular.module('angular-rest-api.core',[
  'ngRoute',
  'angular-rest-api.services',
  'angular-rest-api.controllers'
  ]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/users', {templateUrl:'views/users.html', controller: 'UsersListCtrl'});
  $routeProvider.when('/users/:userId', {templateUrl:'views/users_detail.html', controller: 'UsersDetailCtrl'});
}])