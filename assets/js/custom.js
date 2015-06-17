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


    // Sticky Kit - Jobs Page Side Nav

    $("#sidebar").stick_in_parent();

    // Active URL

    function locationHashChanged() {
    $('a').removeClass('active');
    $('a[href="' + location.hash + '"]').addClass('active');
}

window.onhashchange = locationHashChanged;
locationHashChanged(); // initial load

    // Affix Plugin - Jobs Page Side Nav

     $('.jobs-list').affix({
    offset: {
        top: $('.jobs-list').offset().top
        }
    });






});