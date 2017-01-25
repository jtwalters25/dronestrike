'use strict';

(function(mod) {
  const mapController = {};
  mapController.index = function() {
    console.log('in map controller');
    $('nav').hide();
    mapView.makeMap();
  };

  mod.mapController = mapController;
})(window);
