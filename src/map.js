var USA_CENTER = new google.maps.LatLng(40, -99);
var ZOOM = 4;
var MAP_TYPE = google.maps.MapTypeId.SATELLITE;

function renderMap() {
  var map = getBlankMap();
  populate(map);
}

function getBlankMap() {
  var mapOptions = {
    zoom: ZOOM,
    center: USA_CENTER,
    mapTypeId: MAP_TYPE
  };
  return new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function populate(map) {
  var options = 'https://soda.demo.socrata.com/resource/earthquakes.json';
  $.get(options, function(response) { createMarkers(map, response); });
}

function createMarkers(map, earthquakeList) {
  for (var i = 0; i < earthquakeList.length; i++) {
    createMarker(map, earthquakeList[i]);
  }
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
