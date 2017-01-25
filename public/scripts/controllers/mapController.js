'use strict';

(function(mod) {
  const mapController = {};
  mapController.index = function() {
    console.log('in mapcontroller index');
    $('#map').css('height', '100%');
    $('html').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('body').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('section').fadeOut();
    mapView.makeMap();
    $('#map').fadeIn();
  };

  mod.mapController = mapController;
})(window);
