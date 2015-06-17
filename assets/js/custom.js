// Custom JQuery Methods
    
$(document).ready(function(){

    // Video Player

    $('.venobox').venobox();


    // Desktop Menu Dropdown
    
    var dContainer = $(".dropdown");
    dContainer.on('mouseenter', function(){
        dContainer.removeClass('open');
        $(this).addClass('open');
    });


    $('.dropdown-toggle').dropdown();
    $(".dropdown-menu").mouseleave(function(){
          $(".dropdown").removeClass("open");
      });

    // Active URL

    function locationHashChanged() {
    $('a').removeClass('active');
    $('a[href="' + location.hash + '"]').addClass('active');
}

window.onhashchange = locationHashChanged;
locationHashChanged(); // initial load

    // Affix Plugin - Jobs Page Side Nav

    if ($('jobs-list').length) {
    
    $('.jobs-list').affix({
    offset: {
        top: $('.jobs-list').offset().top
        }
    }); 
    } 

     // Mapbox - Contact Us
    /* global L */
    L.mapbox.accessToken = 'pk.eyJ1IjoiZWh1YmJlbGwiLCJhIjoidEdMVWRFZyJ9.o2xk7CcBRujSS-QIheBpwQ';
    var map = L.mapbox.map('map-canvas', 'mapbox.emerald')
    .setView([39.733536, -104.992611], 21);

    // Disable drag and zoom handlers.
    map.scrollWheelZoom.disable();

    // Disable tap handler, if present.
    if (map.tap) map.tap.disable();

    L.mapbox.featureLayer({
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [
          -104.992611,
          39.733536
        ]
    },
    properties: {
        title: 'Galvanize Golden Triangle',
        description: '1062 Delaware St. Denver, CO 80202',
        // one can customize markers by adding simplestyle properties
        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
        'marker-size': 'large',
        'marker-color': '#323a45',
    }
    }).addTo(map);



});