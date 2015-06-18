

/*Start the create section*/

/*Create modal start*/
$body.on('click', '.create_init', function(e){
    e.preventDefault();
    create_modal_trigger();
});

function create_modal_trigger(){
    var actionBtn = $('[data-type="modal-trigger"]'),
        scaleValue = retrieveScale(actionBtn.next('.cd-modal-bg'));

    actionBtn.addClass('to-circle');
    actionBtn.next('.cd-modal-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
    });

    //if browser doesn't support transitions...
    if(actionBtn.parents('.no-csstransitions').length > 0 ) animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);

    setTimeout(function(){
        window.location = "Create_What.html";
    }, 2000);
}

$body.on('click', '[data-type="modal-trigger"]', function(){
    var actionBtn = $(this),
        scaleValue = retrieveScale(actionBtn.next('.cd-modal-bg'));

    actionBtn.addClass('to-circle');
    actionBtn.next('.cd-modal-bg').addClass('is-visible')/*.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
     animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
     })*/;
    animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);

    //if browser doesn't support transitions...
    if(actionBtn.parents('.no-csstransitions').length > 0 ) animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
});


$(window).on('resize', function(){
    //on window resize - update cover layer dimention and position
    if($('.cd-section.modal-is-visible').length > 0) window.requestAnimationFrame(updateLayer);
});

function retrieveScale(btn) {
    var btnRadius = btn.width()/2,
        left = btn.offset().left + btnRadius,
        top = btn.offset().top + btnRadius - $(window).scrollTop(),
        scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

    btn.css('position', 'fixed').velocity({
        top: top - btnRadius,
        left: left - btnRadius,
        translateX: 0
    }, 0);

    return scale;
}

function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
    var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
        maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
    return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
}

function animateLayer(layer, scaleVal, bool) {
    layer.velocity({ scale: scaleVal }, 400, function(){
        $('body').toggleClass('overflow-hidden', bool);
        (bool)
            ? layer.parents('.cd-section').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend')
            : layer.removeClass('is-visible').removeAttr( 'style' ).siblings('[data-type="modal-trigger"]').removeClass('to-circle');
    });
}

function updateLayer() {
    var layer = $('.cd-section.modal-is-visible').find('.cd-modal-bg'),
        layerRadius = layer.width()/2,
        layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
        layerLeft = layer.siblings('.btn').offset().left + layerRadius,
        scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());

    layer.velocity({
        top: layerTop - layerRadius,
        left: layerLeft - layerRadius,
        scale: scale
    }, 0);
}
/*Create modal end*/



$(window).load(function(){
    $('.cr_map_wrap').removeClass("only_hide").addClass("hide");
});
var $page_number = 0,
    $nextPrev = "";
/*Create page transition start*/
$body.on('click', '.create_slide_btn', function(e){
    e.preventDefault();
    //$body.children('.cr_footer').hide(0);
    $(".modal").modal('hide');
    var $url = $(this).attr("href"),
    //var $url = $(this).attr("href"),
        $contantWrap = $("#createContAjaxWrap");
    $nextPrev = $(this).attr("data-pagen");
    $page_number = 1 * $(this).attr("data-pageid");

    updateHeaderFooter();

    loadAjaxCont($url,  " .ccaw_inner", $contantWrap, $nextPrev);

});

function updateHeaderFooter(){
    $('.cr_footer').eq($page_number).removeClass("hide")
        .siblings().addClass("hide");
    $(".cr_header").eq($page_number).removeClass('hide')
        .siblings(".cr_header").addClass('hide');
}

function loadAjaxCont($url, $context, $container, $nextPrev){
    $body.addClass('overflow-hidden');
    var $leftx = "100%",
        $rightx = "-100%";
    if($nextPrev == "next"){
        $leftx = "-100%";
        $rightx = "100%";
    }

    if($page_number == 1 || $page_number == 3){
        $(".cr_map_wrap").velocity(
            {
                translateX : $leftx
            }, {
                easing: "easeOut",
                duration: 600,
                complete : function(){
                    $container.removeClass('hide');
                    $(".cr_map_wrap").addClass('hide');
                }
            });
    }

    $container.velocity(
        {
            translateX : $leftx
        }, {
            easing: "easeOut",
            duration: 600,
            complete : function(){
                $container.load($url + $context, function( response, status, xhr ) {
                    if(status == "success"){
                        funcToRunOnAjax($url);
                        $container.css('opacity', '0');
                        $container.velocity(
                            {
                                translateX : $rightx
                            }, {
                                duration: 0,
                                complete : function(){
                                    $container.css('opacity', '1');
                                    $container.velocity(
                                        {
                                            translateX : "0"
                                        }, {
                                            easing: "easeIn",
                                            duration: 700,
                                            complete: function(){
                                                //$container.css('transform', 'none');
                                                //$body.children('.cr_footer').remove();
                                                //$container.find('.cr_footer').appendTo("body");

                                                $body.removeClass('overflow-hidden');
                                            }
                                        });
                                }
                            });

                        window.history.pushState("/", "", $url);
                    }
                });
            }
        });
}

function loadMapOnAjax($pageName){
    if(($('.cr_map_wrap').length) && ($page_number == 2)){
        //mapInit();

        $body.addClass('overflow-hidden');
        $('.cr_map_wrap').addClass('hide');
        $("#createContAjaxWrap").addClass('hide');
        var $mapToShow = $(".create_cont_wrap").find('.cr_map_wrap').removeClass('hide').css('opacity', '0');
        setMapHeight($mapToShow);

        var $leftx = "100%",
            $rightx = "-100%";
        if($nextPrev == "next"){
            $leftx = "-100%";
            $rightx = "100%";
        }

        $mapToShow.velocity(
            {
                translateX : $rightx
            }, {
                duration: 0,
                complete : function(){
                    $mapToShow.css('opacity', '1');
                    $mapToShow.velocity(
                        {
                            translateX : "0"
                        }, {
                            easing: "easeIn",
                            duration: 700,
                            complete: function(){
                                $body.removeClass('overflow-hidden');
                                $(".cre_map_modal").modal('show');
                            }
                        });
                }
            });

    }
}

function funcToRunOnAjax($url){
    var $urln = $url.substr($url.lastIndexOf("/") + 1);

    setAjaxHeight();

    if($('.timePicker').length){
        $('.timePicker').datetimepicker({
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>',
            beforeShow: function(input, inst) {
                var newclass = 'smart-forms';
                var smartpikr = inst.dpDiv.parent();
                if (!smartpikr.hasClass('smart-forms')){
                    inst.dpDiv.wrap('<div class="'+newclass+'"></div>');
                }
            }

        });
    }

    if($('#editor').length){
        $('#editor').wysiwyg();
    }

    if($('[data-toggle="tooltip"]').length){
        $('[data-toggle="tooltip"]').tooltip();
    }


    if($(".chosen-select").length){
        $(".chosen-select").chosen({no_results_text: "Oops, nothing found!"});
    }



    $(".cr_nostyle_input").each(function(){
        showCrossIcon($(this), $(this).siblings('.ciw_ric'));
    });

    /**
     * todo this will be removed
     */
    if (typeof mapInit !== 'undefined' && $.isFunction(mapInit) && false) {
        if($('.cr_map_wrap').length){
            //mapInit();
            setMapHeight($('.cr_map_wrap'));
            $(".cre_map_modal").modal('show');
            setTimeout(function(){
                $("#geocomplete").trigger("geocode");
                $(window).resize();
                //window.resizeTo ($(window).width(), $(window).height());
                if(typeof Event == "function"){
                    window.dispatchEvent(new Event('resize'));
                }
            }, 1000);

        }
    }

    loadMapOnAjax($urln);

    if($urln == "Create_Advanced_Preview.html" || $urln == "Create_Share.html"){
        addEventToModal();
        $(".cre_confirmation_modal").modal('show');
    }
}

function setAjaxHeight(){
    $("#createContAjaxWrap").css('minHeight', $(window).height() - 200 + 'px');
}
setAjaxHeight();

$(window).resize(function(){
    setAjaxHeight();
});

/*Create page transition end*/


/*tab changin on create advance start*/
$body.on('click', '.tab_change a', function(e){
    e.preventDefault();
    var $parent = $(this).closest('li');
    $parent.siblings().removeClass('active');
    if(!$parent.hasClass('active')){
        tabShow($($(this).attr("href")), $("#tabWrap"));
    }
    $parent.addClass('active');
});

$body.on('change', '.tab_input_change input[type="radio"]', function(){
    tabShow($($(this).attr("data-active")), $("#tabWrap"));
});

function tabShow($item, $wrap){
    $body.addClass('overflow-hidden');
    $wrap.velocity(
        {
            translateX : "-100%"
        }, {
            easing: "easeOut",
            duration: 400,
            complete : function(){
                $wrap.css('opacity', '0')
                    .velocity(
                    {
                        translateX : "100%"
                    }, {
                        duration: 0,
                        complete : function(){
                            $item.removeClass('hide')
                                .siblings().addClass('hide');
                            $wrap.css('opacity', '1')
                                .velocity(
                                {
                                    translateX : "0"
                                }, {
                                    easing: "easeOut",
                                    duration: 400,
                                    complete : function(){
                                        $body.removeClass('overflow-hidden');
                                    }
                                });
                        }
                    });
            }
        });

    $(".cr_nostyle_input").each(function(){
        showCrossIcon($(this), $(this).siblings('.ciw_ric'));
    });
}
/*tab changin on create advance ends*/


/*end the create section*/

if($(".chosen-select").length){
    $(".chosen-select").chosen({no_results_text: "Oops, nothing found!"});
}

