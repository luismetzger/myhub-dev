// Custom JQuery Methods
    
$(document).ready(function(){

    // Video Player

    $('.venobox').venobox();


    // Desktop Menu Dropdown

    $('.dropdown-toggle').dropdown();
    $(".dropdown-menu").mouseleave(function(){
          $(".dropdown").removeClass("open");
      });


    // Sticky Side Bar - Jobs Page

    $("#sidebar").stick_in_parent();


});