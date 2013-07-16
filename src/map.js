var USA_CENTER = new google.maps.LatLng(40, -99);
var ZOOM = 4;
var MAP_TYPE = google.maps.MapTypeId.SATELLITE;
var markers = [];
var heatmap;

function renderMap() {
  var map = getBlankMap(document.getElementById('map-canvas'));
  populate(map);
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
  $.get(options, function(response) {
    createMarkers(map, response);

    var heatmapData = extractPositions(response);
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        dissipating: true,
        radius: 30
    });
    heatmap.setMap(map);
  });
}

function extractPositions(earthquakeList) {
  var earthquake;
  var positionsList = [];
  for (var i = 0; i < earthquakeList.length; i++) {
    earthquake = earthquakeList[i];
    positionsList.push(
        new google.maps.LatLng(earthquake['location']['latitude'], earthquake['location']['longitude'])
      );
  }
  return positionsList;
}

function createMarkers(map, earthquakeList) {
  var marker;
  for (var i = 0; i < earthquakeList.length; i++) {
    marker = createMarker(map, earthquakeList[i]);
    markers.push(marker);
  }
}

function createMarker(map, earthquake) {
  var location = earthquake['location'];
  return new google.maps.Marker({
    position: new google.maps.LatLng(location['latitude'], location['longitude']),
    map: map,
    visible: false
  });
}

function toggleMap() {
  if (heatmap.get('opacity') == 0) {
    heatmap.setOptions({opacity: 1});
    for (var i = 0; i < markers.length; i++) {
      markers[i].setVisible(false);
    }
  } else {
    heatmap.setOptions({opacity: 0});
    for (var i = 0; i < markers.length; i++) {
      markers[i].setVisible(true);
    }
  }
}

$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', renderMap);
  $("#the_button").click(toggleMap);
});
