describe("Player", function() {
  var map;

  it("display blank map", function() {
    map = getBlankMap(document.createElement('div'));
    expect(map.getZoom()).toEqual(4);
  });

  it("should extract positions of earthquakes", function() {
    var earthquakes = [
      {'location': {'latitude':1, 'longitude':2}},
      {'location': {'latitude':3, 'longitude':4}}
    ];
    var positions = extractPositions(earthquakes);
    expect(positions[0].equals(new google.maps.LatLng(1, 2))).toBeTruthy();
    expect(positions[1].equals(new google.maps.LatLng(3, 4))).toBeTruthy();
  });

});
