'use strict';

(function(module) {
  const lineChartView = {};

  lineChartView.makeChart = () => {

    $.get('/scripts/models/biggerdata.json')
     .then(strikes => {
       strikes.forEach(strike => {
         let tempString = strike.date;
         strike.date = parseInt(tempString.slice(0,4));
         strike.deaths_max = parseInt(strike.deaths_max);
       })
       var annualArray = [2002, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
       var num = [];
       var averageDeaths = [];
       var annualDeaths = [];
       var pStrikes = [];

       annualArray.forEach(val => {
         var totalDeaths =  0;
         var tempYear = (strikes.filter(strike => {return strike.date === val}));
         pStrikes.push(tempYear.filter(strike => {return strike.country.indexOf('P') === 0}).length);
         num.push(tempYear.length);
         tempYear.forEach(strike => {
           totalDeaths += strike.deaths_max;
         });
         annualDeaths.push(totalDeaths);
         averageDeaths.push(Math.trunc(100*totalDeaths/tempYear.length)/100);
       });
       var ctx = document.getElementById('lineChart').getContext('2d');

       var data = {
           labels: ['2002', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
           datasets: [
               {
                   label: '# Drone Strikes',
                   backgroundColor: 'blue',
                   data: num
               },
               {
                   label: 'Average # of Deaths',
                   backgroundColor: 'red',
                   data: averageDeaths
               },
               {
                 label: '# Drone Strikes in Pakistan',
                   backgroundColor: 'cyan',
                   data: pStrikes
               }
           ]
       };

       var myBarChart = new Chart(ctx, {
           type: 'bar',
           data: data,
           options: {
               barValueSpacing: 20,
               scales: {
                   yAxes: [{
                       ticks: {
                           min: 0,
                       }
                   }]
               }
           }
       });

     })
  }

  module.lineChartView = lineChartView;
})(window);
