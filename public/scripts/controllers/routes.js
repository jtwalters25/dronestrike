'use strict';

page('/',
Data.fetchAll,
dataController.loadAll,
dataController.index);

page('/map', mapController.index);
page('/stats', chartView.makeChart);
page('/about')

page('*', function(){
  $('body').text('Not found!');
});

page();
