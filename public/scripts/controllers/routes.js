'use strict';
page('/', homeController.index);

page('/map', mapController.index);
page('/stats', chartController.index);
page('/about', aboutController.index);

page();
