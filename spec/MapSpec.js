describe("Player", function() {
  var map;

  it("display blank map", function() {
    map = getBlankMap(document.createElement('div'));
    expect(map.getZoom()).toEqual(4);
  });

});
