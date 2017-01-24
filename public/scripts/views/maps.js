function makeChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Civilians',
        data: civilianArray,
        backgroundColor: 'rgba(11, 54, 124, 0.6)'
      }, {
        label: 'Children',
        data: childrenArray,
        backgroundColor: 'rgba(29, 147, 13, 0.6)'
      },
        {
          label: 'Militants',
          data: militantArray,
          backgroundColor: 'rgba(240, 147, 13, 0.6)'
        }]
    }
  });
}
