var map;
function initialize() {
  var usa = {'latitude': 40, 'logitude': -99};
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(usa['latitude'], usa['logitude']),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  createMarkers(map);  
}

function createMarkers(map) {
  var options = 'https://soda.demo.socrata.com/resource/earthquakes.json';

  $.get(options, function(response) {
    for (var i = 0; i < response.length; i++) {
      var location = response[i]['location'] 
    
      new google.maps.Marker({
        position: new google.maps.LatLng(location['latitude'], location['longitude']),
        map: map
      });
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
