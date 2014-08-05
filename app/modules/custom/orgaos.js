var API_URL = 'http://localhost:5000/api';

var OrgaosSvc = angular.module('tcesp-angular-app.services.orgaos', ['ngResource']);

OrgaosSvc.factory('Orgaos', ['$resource', function($resource){
  return $resource(API_URL + '/orgaos', {}, {
    list: {method: 'GET', isArray: true}
  });
}]);


var OrgaosCtrl = angular.module('tcesp-angular-app.controllers.orgaos', []);

OrgaosCtrl.controller('OrgaosListCtrl', ['$scope', '$window','Orgaos', function($scope, $window, Orgaos){
  function getStoredOrgaos(){
    var orgaosLocal = JSON.parse($window.localStorage.getItem("orgaos"));
    var actualDate = (new Date());
    if(orgaosLocal){
      if(new Date(orgaosLocal.expirationDate) > actualDate){
        return orgaosLocal.data;
      }
    }
    return '';
  }

  function storeOrgaos(){
    var expirationDate = (new Date());
    expirationDate.setDate(expirationDate.getDate()+30);
    var orgaosLocal = {expirationDate: expirationDate, data: $scope.orgaos};
    $window.localStorage.setItem("orgaos", JSON.stringify(orgaosLocal));
  }  

  $scope.orgaos =  getStoredOrgaos() || Orgaos.list(storeOrgaos);

}])