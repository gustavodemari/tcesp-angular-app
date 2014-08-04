/* Users Services */
var API_URL = 'http://localhost:5000/api';

var UsersSvc = angular.module('angular-rest-api.services.users', ['ngResource']);

UsersSvc.factory('Users', ['$resource', function($resource){
  return $resource(API_URL + '/users/:userId', {}, {
    list: {method: 'GET', isArray: true}
  });
}]);

/* Users Controller */
var UsersCtrl = angular.module('angular-rest-api.controllers.users', []);

UsersCtrl.controller('UsersListCtrl', ['$scope', 'Users', function($scope, Users){
  $scope.users = Users.list();
}]);

UsersCtrl.controller('UsersDetailCtrl', ['$scope', '$routeParams','Users', function($scope, $routeParams, Users){
  $scope.user = Users.get({userId: $routeParams.userId});
}]);