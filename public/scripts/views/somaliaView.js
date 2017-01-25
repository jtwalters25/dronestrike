'use strict';

(function(module) {
  const somaliaView = {};

  somaliaView.makeMap = function() {
    var stylesArray = [
      {
        featureType: 'all',
        stylers: [
          { hue: '#00ffe6' },
          { saturation: -20 }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { lightness: 100 },
          { visibility: 'simplified' }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ];


    var mapOptions = {
      zoom: 4,
      styles: stylesArray,
      center: new google.maps.LatLng(6.480853, 45.197783),
      mapTypeId: google.maps.MapTypeId.STREET,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    google.maps.event.addDomListener(window, 'resize', function() {
      var center = {lat: 6.480853, lng: 45.197783};
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });

  }

// array.forEach(val => {
//   var lat = parseFloat(val.lat);
//   var lng = parseFloat(val.lon);
//   var marker = new google.maps.Marker({
//     position: {lat: lat, lng: lng},
//     map: map,
//   });
// })


  module.somaliaView = somaliaView;
})(window);
