/* Despesas Services */
var API_URL = 'http://localhost:5000/api';

var DespesasSvc = angular.module('tcesp-angular-app.services.despesas', ['ngResource']);

DespesasSvc.factory('Despesas', ['$resource', function($resource){
  return $resource(API_URL + '/despesas/:municipioId/:orgaoId/:ano/:tipoDespesa', {}, {
    list: {method: 'GET', isArray: true}
  });
}]);

/* Despesas Controllers */
var DespesasCtrl = angular.module('tcesp-angular-app.controllers.despesas', []);

DespesasCtrl.controller('DespesasMunicipiosCtrl', ['$scope', 'Despesas', function($scope, Despesas){
  $scope.despesas = Despesas.list();
}]);

DespesasCtrl.controller('DespesasMunicipiosDetailCtrl', ['$scope', '$routeParams', 'Despesas', function($scope, $routeParams, Despesas){
  $scope.despesas = Despesas.list({municipioId: $routeParams.municipioId});
}]);

DespesasCtrl.controller('DespesasOrgaosCtrl', ['$scope', '$routeParams', 'Despesas', function($scope, $routeParams, Despesas){
  $scope.anos = [2014, 2013, 2012, 2011, 2010, 2009, 2008];
  $scope.meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  $scope.ano = $routeParams.ano || new Date().getUTCFullYear();

  function formatCurrency(value){
    value = value.split(/[.,]/).join('')/100;
    value = Math.round( value * 100/( Math.pow(10,6) ) )/100;
    return value;
  }

  $scope.chartSeries = [{
                name: 'Empenhado',
                data: []
            },{
                name: 'Liquidado',
                data: []
            },{
                name: 'Pago',
                data: []
            }];

  $scope.despesas = Despesas.list({
      municipioId: $routeParams.municipioId, 
      orgaoId: $routeParams.orgaoId,
      ano: $scope.ano
    }, function(){
      var arr = [[],[],[]];
      $scope.despesas.forEach(function(value, index){
        arr[0].push(formatCurrency(value.vl_empenhado));
        arr[1].push(formatCurrency(value.vl_liquidado));
        arr[2].push(formatCurrency(value.vl_pago));
      })
      $scope.chartSeries[0].data= arr[0];
      $scope.chartSeries[1].data= arr[1];
      $scope.chartSeries[2].data= arr[2];
    });

  $scope.ideas = [
        ['ideas1', 1],
        ['ideas2', 8],
        ['ideas3', 5]
    ];

}]);

/* Despesas Directives */
var DespesasDtv = angular.module('tcesp-angular-app.directives.despesas', []);


DespesasDtv.directive('hcPie', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
        items: '='
    },
    controller: function ($scope, $element, $attrs) {
        console.log(2);
    },
    template: '<div id="containerChart" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {
        console.log(3);
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'containerChart',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Browser market shares at a specific website, 2010'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    animation:true,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: scope.items
            }]
        },function(chart){
            $('#addPoint').click(function(){
                chart.series[0].addPoint(1);
            });
        });
        
        scope.$watch("items", function (newValue) {
            chart.series[0].setData(newValue, true);
        }, true);

      }
    }
});


DespesasDtv.directive('hcStacked', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
        items: '=',
        title: '='
    },
    controller: function ($scope, $element, $attrs) {
        console.log(2);
    },
    template: '<div id="containerChart1" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {
        console.log(3);
        var options = {
            chart: {
                type: 'column',
                renderTo: 'containerChart1',
                animation: true
            },
            title: {
                text: 'Despesas - NOME DO ORGAO, ANO'
            },
            xAxis: {
                categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'em milhões de R$'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                pointFormat: "{point.y:.2f} MM"
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: scope.items
        };
        var chart = new Highcharts.Chart(options);
        
        scope.$watch("items", function (newValue) {
          console.log(newValue);
          // console.log(chart);
          if(newValue){
            newValue.forEach(function(value, index){
              chart.series[index].setData(newValue[index].data, true);
            });
          }
        }, true);
      }
    }
});

//http://jsfiddle.net/m6er5/
//http://jsfiddle.net/sbochan/csTzc/64/