/* Despesas Services */
var API_URL = 'http://localhost:5000/api';

var DespesasSvc = angular.module('tcesp-angular-app.services.despesas', ['ngResource']);

DespesasSvc.factory('Despesas', ['$resource', function($resource){
  return $resource(API_URL + '/despesas/:municipioId/:orgaoId/:ano/:tipoDespesa', {}, {
    list: {method: 'GET', isArray: true}
  });
}]);

/* Despesas Controller */
var DespesasCtrl = angular.module('tcesp-angular-app.controllers.despesas', []);

DespesasCtrl.controller('DespesasMunicipiosCtrl', ['$scope', 'Despesas', function($scope, Despesas){
  $scope.despesas = Despesas.list();
}]);

DespesasCtrl.controller('DespesasMunicipiosDetailCtrl', ['$scope', '$routeParams', 'Despesas', function($scope, $routeParams, Despesas){
  $scope.despesas = Despesas.list({municipioId: $routeParams.municipioId});
}]);

DespesasCtrl.controller('DespesasOrgaosCtrl', ['$scope', '$routeParams', 'Despesas', function($scope, $routeParams, Despesas){
  $scope.anos = [2014, 2013, 2012, 2011, 2010, 2009, 2008];
  $scope.ano = $routeParams.ano;

  $scope.despesas = Despesas.list({
      municipioId: $routeParams.municipioId, 
      orgaoId: $routeParams.orgaoId,
      ano: $routeParams.ano
    });
}]);

//http://jsfiddle.net/m6er5/