var civilianArray =[2,4,13];
var childrenArray =[1,3,5];
var militantArray =[2,6,9];



function makeChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bush', 'obama', 'trump'],
      datasets: [{
        label: 'Civilians',
        data: [2,3,4,5,6],
        backgroundColor: 'rgba(11, 54, 124, 0.6)'
      }, {
        label: 'Children',
        data: [3,5,6,7,8],
        backgroundColor: 'rgba(29, 147, 13, 0.6)'
      }, {
        label: 'Militants',
        data: [3,4,5,6,7],
        backgroundColor: 'rgba(240, 147, 13, 0.6)'
      }]
    }
  });
}

makeChart();
