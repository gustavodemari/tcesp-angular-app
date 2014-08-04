/* Despesas Services */
var API_URL = 'http://localhost:5000/api';

var DespesasSvc = angular.module('tcesp-angular-app.services.despesas', ['ngResource']);

DespesasSvc.factory('Despesas', ['$resource', function($resource){
  return $resource(API_URL + '/despesas/:municipioId', {}, {
    list: {method: 'GET', isArray: true}
  });
}]);

/* Despesas Controller */
var DespesasCtrl = angular.module('tcesp-angular-app.controllers.despesas', []);

DespesasCtrl.controller('DespesasMunicipiosCtrl', ['$scope', 'Despesas', function($scope, Despesas){
  $scope.despesas = 'teste';
}]);