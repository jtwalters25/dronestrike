'use strict';

(function(mod) {
  const chartController = {};
  chartController.index = function() {
    $('html').css({'height':'100%', 'margin':'auto', 'padding':'inherit'});
    $('section').fadeOut();
    chartView.makeChart();
    $('#strikeStats').fadeIn();
  };

  mod.chartController = chartController;
})(window);
