var API_URL = 'http://localhost:5000/api';

var OrgaosSvc = angular.module('tcesp-angular-app.services.orgaos', ['ngResource']);

OrgaosSvc.factory('Orgaos', ['$resource', function($resource){
  return $resource(API_URL + '/orgaos', {}, {
    list: {method: 'GET', isArray: true}
  });
}]);


var OrgaosCtrl = angular.module('tcesp-angular-app.controllers.orgaos', []);