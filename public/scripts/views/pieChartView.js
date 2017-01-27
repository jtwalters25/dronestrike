'use strict';

(function(module) {
  const pieChartView = {};

  pieChartView.makeChart = function() {

    var yemenTotal = 0;
    var pakistanTotal = 0;
    var somaliaTotal = 0;

    $.get('/scripts/models/biggerdata.json', function(data){
      // pieChartView.countries = data
      data.forEach(function(country){
        if (country.country === 'Yemen') {
          yemenTotal +=1;
        }
        if (country.country === 'Somalia') {
          somaliaTotal +=1;
        }
        if (country.country === 'Pakistan') {
          pakistanTotal +=1;
          console.log(pakistanTotal);
        }
      })
      localStorage.shit = JSON.stringify([yemenTotal, somaliaTotal, pakistanTotal])
    })
    // console.log(pakistanTotal);

    // .then(){
    var ctx = document.getElementById('pieChart').getContext('2d');
    var shit = JSON.parse(localStorage.shit)
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['yemen', 'somalia', 'pakistan'],
        datasets: [{
            // data: [yemenTotal, pakistanTotal, somaliaTotal],
          data: shit,
          backgroundColor: ['rgba(11, 16, 124, 1)','rgba(208, 2, 2, 1)','rgba(242, 255, 0, 0.89)']
        }]
      }
    })
    // }
  }
  module.pieChartView = pieChartView;

})(window);
