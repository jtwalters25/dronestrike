'use strict';
page('/',
homeController.index,
Data.fetchAll,
dataController.loadAll,
dataController.index);

page('/map', mapController.index);
page('/stats', chartController.index);
page('/about', aboutController.index);

page('/map/:countryName',
  countryController.loadByCountry,
  countryController.index);

page();
