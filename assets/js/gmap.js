$(function(){

    var options = {
        map: ".map_canvas",
        location: "Denver, CO, United States"
    };

    var $geoComplete = $("#geocomplete");

    $geoComplete.geocomplete(options);

    $("body").on('click', '.show_location', function(e){
        e.preventDefault();

        $.get("http://ipinfo.io", function (response) {
            console.log(response);

            var $address = response.city + ", " + response.region + ", " + response.country;

            $geoComplete.val($address);
            $geoComplete.trigger("geocode");

        }, "jsonp");

        $(this).closest('.modal').modal('hide');

    }).on('click', '.close_modal', function(e){
            e.preventDefault();
            $(this).closest('.modal').modal('hide');
        });


});