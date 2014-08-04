/* Main App Angular*/
var app = angular.module('tcesp-angular-app.core',[
  'ngRoute',
  'tcesp-angular-app.services',
  'tcesp-angular-app.controllers'
  ]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/users', {templateUrl:'views/users.html', controller: 'UsersListCtrl'});
  $routeProvider.when('/users/:userId', {templateUrl:'views/users_detail.html', controller: 'UsersDetailCtrl'});
  $routeProvider.when('/despesas', {templateUrl:'views/despesas.html', controller: 'DespesasMunicipiosCtrl'});
  $routeProvider.when('/despesas/:municipioId', {templateUrl:'views/despesas_detail.html', controller: 'DespesasMunicipiosDetailCtrl'});
  $routeProvider.when('/despesas/:municipioId/:orgaoId/:ano', {templateUrl:'views/despesas_orgaos.html', controller: 'DespesasOrgaosCtrl'});
}])

