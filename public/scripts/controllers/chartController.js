'use strict';

(function(mod) {
  const chartController = {};
  chartController.index = function() {
    $('html').css({'height':'100%', 'margin':'auto', 'padding':'inherit'});
    $('section').hide();
    $('#strikeStats').show()
    chartView.makeChart();
  };

  mod.chartController = chartController;
})(window);
