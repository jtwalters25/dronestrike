'use strict';

page('/',
  Data.fetchAll,
  dataController.loadAll,
  dataController.index);


// page('/map', blah.blah, blah.blah);
//
// page('/pakistan', blah.blah, blah.blah);
//
// page('/somalia', blah.blah, blah.blah);
//
// page('/yemen', blah.blah, blah.blah);

// page('/about', aboutController.index);
// page('/admin', adminController.index);
//
// page('/data/:id',
//   dataController.loadById,
//   dataController.index);

// Redirect home if the default filter option is selected:
// page('/category', '/');
// page('/country', '/');
//
// page('/country/:countryName',
//   dataController.loadByCountry,
//   dataController.index);
//

page('/map', mapController);
page('/stats', chartView.makeChart);


// page('/data/:_id',
//   dataController.loadById,
//   dataController.index);

// Redirect home if the default filter option is selected:
// page('/category', '/');
// page('/author', '/');
//
// page('/author/:authorName',
//   dataController.loadByAuthor,
//   dataController.index);
// page('/category/:categoryName',
//   dataController.loadByCategory,
//   dataController.index);

page('*', function(){
  $('body').text('Not found!');
});

page();
