'use strict';

(function(mod) {
  const mapController = {};
  mapController.index = function() {
    console.log('in mapcontroller index');
    $('html').css({'height':'100%', 'margin':'0px', 'padding':'0'});
    $('body').css({'height':'100%', 'margin':'0px', 'padding':'0'});
    $('section').fadeOut();
    mapView.makeMap();
    $('#map').fadeIn();
  };

  mod.mapController = mapController;
})(window);
