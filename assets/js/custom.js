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
    if ($('#map-canvas').length) {

    L.mapbox.accessToken = 'pk.eyJ1IjoiZWh1YmJlbGwiLCJhIjoidEdMVWRFZyJ9.o2xk7CcBRujSS-QIheBpwQ';
    // Create a map in the div #map
    L.mapbox.map('map-canvas', 'mapbox.emerald')
    zoomControl: false
    .setView([39.733, -104.992], 17);
    }

    // Disable tap handler, if present.
    if (map.tap) map.tap.disable();

});