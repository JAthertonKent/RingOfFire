function renderMap() {
  var map = getBlankMap();
  populate(map);
}

function getBlankMap() {
  var usa = {'latitude': 40, 'logitude': -99};
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(usa['latitude'], usa['logitude']),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  return new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function populate(map) {
  var options = 'https://soda.demo.socrata.com/resource/earthquakes.json';

  $.get(options, function(response) {
    for (var i = 0; i < response.length; i++) {
      createMarker(map, response[i]);
    }
  });
}

function createMarker(map, earthquake) {
  var location = earthquake['location'];
  return new google.maps.Marker({
    position: new google.maps.LatLng(location['latitude'], location['longitude']),
    map: map
  });
}

$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', renderMap);
});
