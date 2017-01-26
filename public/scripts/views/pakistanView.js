'use strict';

(function(module) {
  const pakistanView = {};

  pakistanView.makeMap = function(array) {
    var stylesArray =
      [
        {
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#212121'
            }
          ]
        },
        {
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#212121'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'featureType': 'administrative.country',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e'
            }
          ]
        },
        {
          'featureType': 'administrative.land_parcel',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'administrative.locality',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#bdbdbd'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#181818'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#1b1b1b'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#2c2c2c'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#8a8a8a'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#373737'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#3c3c3c'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#4e4e4e'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#3d3d3d'
            }
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

    var map = new google.maps.Map(document.getElementById('map2'), mapOptions);

    google.maps.event.addDomListener(window, 'resize', function() {
      var center = {lat: 6.480853, lng: 45.197783};
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });

    $.get('/strikes/pakistan')
    .then(function(rows) {
      console.log('pakistan',rows);
      Data.loadAll(rows);
      array.forEach(val => {
        var lat = parseFloat(val.lat);
        var lng = parseFloat(val.lon);
        var marker = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
        });
        var infowindow = new google.maps.InfoWindow({
          content: `town: ${val.town}, location: ${val.location}, deaths: ${val.deaths}, injuries: ${val.injuries}`
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
    });
  }









  module.pakistanView = pakistanView;
})(window);
