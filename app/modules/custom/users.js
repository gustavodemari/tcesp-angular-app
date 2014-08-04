/* Users Services */
var API_URL = 'http://localhost:5000/api';

var UsersSvc = angular.module('tcesp-angular-app.services.users', ['ngResource']);

UsersSvc.factory('Users', ['$resource', function($resource){
  return $resource(API_URL + '/users/:userId', {}, {
    list: {
      method: 'GET', 
      isArray: true
    },
    update: {method: 'PUT'}
  });
}]);

/* Users Controller */
var UsersCtrl = angular.module('tcesp-angular-app.controllers.users', []);

UsersCtrl.controller('UsersListCtrl', ['$scope', 'Users', function($scope, Users){
  $scope.users = Users.list();
}]);

UsersCtrl.controller('UsersDetailCtrl', ['$scope', '$routeParams','Users', function($scope, $routeParams, Users){
  $scope.user = Users.get({userId: $routeParams.userId});

  $scope.form = {};
  $scope.form.status = '';

  $scope.editUser = function(){
    Users.update(
      {userId: $routeParams.userId}, 
      {user: $scope.user}, 
      function(data){
        $scope.form.status = 'OK';
      },
      function(error){
        $scope.form.status = 'REQUEST_ERROR';
      }
    );
  }
}]);