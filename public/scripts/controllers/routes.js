'use strict';
page('/',
Data.fetchAll,
dataController.loadAll,
dataController.index);

page('/map', mapController.index);
page('/stats', chartController.index);
page('/about', aboutController.index);

page();
