'use strict';

page('/',
  dataController.loadAll,
  dataController.index);

page('/');
// page('/aboutUs', aboutController.index);
page('/strikes', mapController.index);

page('/data/:_id',
  dataController.loadById,
  dataController.index);

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
