var USA_CENTER = new google.maps.LatLng(40, -99);
var ZOOM = 4;
var MAP_TYPE = google.maps.MapTypeId.SATELLITE;

function renderMap() {
  var map = getBlankMap(document.getElementById('map-canvas'));
  populateHeatmap(map);
}

function getBlankMap(element) {
  var mapOptions = {
    zoom: ZOOM,
    center: USA_CENTER,
    mapTypeId: MAP_TYPE
  };
  return new google.maps.Map(element, mapOptions);
}

function populate(map) {
  var options = 'https://soda.demo.socrata.com/resource/earthquakes.json';
  $.get(options, function(response) { createMarkers(map, response); });
}

function populateHeatmap(map) {
  var options = 'https://soda.demo.socrata.com/resource/earthquakes.json';
  $.get(options, function(response) {
    var heatmapData = extractPositions(response);
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);
  });
}

function extractPositions(earthquakeList) {
  var earthquake;
  var positionsList = [];
  for (var i = 0; i < earthquakeList.length; i++) {
    earthquake = earthquakeList[i];
    positionsList.push(new google.maps.LatLng(earthquake['location']['latitude'], earthquake['location']['longitude']));
  }
  return positionsList;
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
