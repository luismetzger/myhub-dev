
function mapInit(){
    if($(".map_canvas").length){

        var options = {
            map: ".map_canvas",
            location: "Denver, CO, United States",
            mapOptions: {
                mapTypeControl : false,
                panControl : false,
                rotateControl : false,
                scaleControl : false,
                overviewMapControl : false,
                zoomControl : false
            },
            markerOptions: {
                icon: "http://cordantsolutions.com/assets/images/map_marker.png"
            }
        };

        var $geoComplete = $("#geocomplete");

        $geoComplete.geocomplete(options);

        $(".ciw_ric").removeClass('hide');

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

    }
}

$(function(){

    mapInit();

});