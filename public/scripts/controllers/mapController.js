'use strict';

(function(mod) {
  const mapController = {};
  mapController.index = function() {
    console.log('in map controller');
    $('#map').css('height', '100%');
    $('html').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('body').css({'height':'100%', 'margin':'0', 'padding':'0'});
    $('#map').show().siblings().hide();
    mapView.makeMap();
  };

  mod.mapController = mapController;
})(window);
