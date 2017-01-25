
'use strict';

(function(module) {
    const chartView = {};

  chartView.makeChart = function() {

    var civilianArray =[2,4,13];
    var childrenArray =[1,3,5];
    var militantArray =[2,6,9];
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['bush', 'obama', 'trump'],
        datasets: [{
          label: 'Civilians',
          data: [2,3,4,5,6],
          backgroundColor: 'rgba(11, 16, 124, 1)'
        }, {
          label: 'Children',
          data: [3,5,6,7,8],
          backgroundColor: 'rgba(208, 2, 2, 1)'
        }, {
          label: 'Militants',
          data: [3,4,5,6,7],
          backgroundColor: 'rgba(242, 255, 0, 0.89)'
        }]
      }
    });
  }

  module.chartView = chartView;

})(window);
