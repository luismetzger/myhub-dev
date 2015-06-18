;$(document).ready(function(){

    $.ajaxSetup ({
        // Disable caching of AJAX responses
        cache: false
    });
    var $body = $('body');

    /*CHeck email*/
    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $(window).scroll(function() {
        addClassforFooter($(this));
    });


    var $wrap = $("#pushy_wrapper.section"),
        $fullHeightBox = $('.full-height'),
        $wrap2 = $('.full-page-wrap');

    function setHeight(){
        var getWindowHeight = $(window).height();
        $wrap.css('min-height', getWindowHeight + 'px');
        $wrap2.css('min-height', getWindowHeight-240 + 'px');
        $fullHeightBox.css('min-height', getWindowHeight + 'px');
        if ( $(window).width() > 768 ) {
          $wrap.css('max-height', '700px');
          $fullHeightBox.css('max-height', '700px');
        }
    }


    function setMapHeight($cont){
        var $window = $(window);
        if($(window).width() < 767){
            $cont.css('height', $(window).height() - 100 + 'px');
        } else {
            $cont.css('height', $(window).height() - 195 + 'px');
        }
    }
    setMapHeight($('.cr_map_wrap'));


    setHeight();
    $(window).resize(function(){
        setHeight();
        setMapHeight($('.cr_map_wrap'));
    });

    $('.menu-btn').on('click', function(e){
        e.preventDefault();
        $wrap.addClass('container-push');
    });
    $('.site-overlay,  .pushy a').click(function(){
        $wrap.removeClass('container-push');
    });

    /*add twiolio SMS popup*/

    var ppStatus = $("#pp_status"),
        ppSmsCont = $(".twilow_sms");
    $(".nav-wrapper .downlo").click(function(e) {
        e.preventDefault();
        $("#downloadAppModal").modal();
        //https://itunes.apple.com/us/app/myhub/id598502707?mt=8
    });

    $("#downloadAppModal").on("show.bs.modal", function() {
        ppStatus.addClass('hide');
        ppSmsCont.removeClass('hide');
        $(".download-app-form")[0].reset();
    });

    $("#twillow_submit").on("click",function(e){
        e.preventDefault();
        var phone=$("#modalSmsInput").val();
//alert(name+email);
        var data={'mobileNumber':phone};
        $.ajax({ url: "assets/twilio_sms.php",
            data: data,
            type: 'post',

            success: function(response) {
                //alert(response);
                ppSmsCont.addClass('hide');
                ppStatus.html(response).removeClass('hide');
                window.setTimeout(function(){
                    $('#downloadAppModal').modal('hide');
                }, 2000);

            }
        });
    });
    $("#twillow_submitb").on("click",function(e){
        e.preventDefault();
        var phoneInput=$("#modalSmsInputb"),
            phone = phoneInput.val();
//alert(name+email);
        var data={'mobileNumber':phone};
        $.ajax({ url: "assets/twilio_sms.php",
            data: data,
            type: 'post',

            success: function(response) {
                //alert(response);
                phoneInput.css('color','blue').val(response);
                setTimeout(function(){ phoneInput.css('color','#a4a8b3').val(''); }, 2000);
            }
        });
    });

    $('.hbtmBtns').on('click', 'a', function(e){
        e.preventDefault();
        var sectonNo = $(this).attr('date-mvto');
        $.fn.fullpage.moveTo(sectonNo);
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $($(this).attr('href'));
        //
        //$(target).css('left','-'+$(window).width()+'px');
        //var left = $(target).offset().left;
        //$(target).css({left:left}).animate({"left":"0px"}, "10");
        target.fadeTo( 1 , 0);
        target.fadeTo( 1000
            , 1);
    });


    $(window).load(function(){
        var hideSvgsForlinkbg = $('.app_store_svgs, .footer_socials li embed');
        hideSvgsForlinkbg.parent().html('');
        hideSvgsForlinkbg.hide();
    });

    /*venobox*/
    if(typeof $(window).venobox === 'function'){
        $('.venobox').venobox();
    }

    /**
     * Footer waypoint
     */
    var pgfooter = $("#page_footer_cont");
    function addClassforFooter(window){
        if(window.scrollTop() + window.height() > $(document).height() - 400) {
            pgfooter.addClass('active-trans');
        }
        if(pgfooter.hasClass('inner_footer')){
            var getfooterHgt = pgfooter.find("#footer_container").outerHeight();
            pgfooter.css('padding-top', getfooterHgt + 'px')
        }
    }
    /*$("#page_footer_cont").waypoint(function(direction){
        $(this).addClass('active-trans');
    }, { offset: '40%' });*/

    $(".hwi_tablinks").on('click', 'li a', function(e){
        e.preventDefault();
        var parentLi = $(this).parent('li'),
            liIndex = parentLi.index();
        if(parentLi.hasClass('active')){
            return false;
        }
        parentLi.siblings('li').removeClass('active');
        parentLi.addClass('active');
        $('#hwi_tab').find('li:eq(' + liIndex +') a').tab('show')
    });

    /**
     * dropdown on mouse enter
     */
    var dContainer = $(".dropdown");
    dContainer.on('mouseenter', function(e){
        dContainer.removeClass('open');
        $(this).addClass('open');
    });


  var $profile_list_wrap = $(".profile-list"),
      $following_btns = $profile_list_wrap.find('.pl-hover a:not(.not-following)'),
      $not_following_btns = $profile_list_wrap.find('.pl-hover a.not-following');

    $body.on('click', '.pl-hover a', function(e){

        e.preventDefault();

        var $this = $(this);

        if ($this.closest('.cr_invite_cont_wrap').length) {

            $this.animate({
                opacity: 0
            }, 500, function () {
                $this.toggleClass('not-following');
                $this.animate({
                    opacity: 1
                }, 500, function () {
                    // Animation complete.
                });
            });
        } else {
            if($this.hasClass('not-following')) {
                $this.hide("normal", function () {
                    $this.find('img').attr('src', 'assets/images/pimg_icons/User_Follow@3x.png');
                    $this.show('slow', function () {
                        $this.hide('normal', function () {
                            $this.find('img').attr('src', 'assets/images/pimg_icons/User_Pending@3x.png');
                            $this.show('slow', function () {
                                $this.removeClass('not-following');
                            });
                        });
                    });
                });
                $(this).animate({}, 5000, function () {
                    // Animation complete.
                });
            }
        }

    }).on('click', '.pl-hover a', function(e){
        e.preventDefault();
    });

    
    function checkInputs($tInput, $return){
        if(($tInput.attr('type') == 'email') && IsEmail($tInput.val())){
            $tInput.siblings('.icon-x').hide().end().
                siblings('.icon-checkmark').show();
        } else if($tInput.hasClass('pass_confirm') && $tInput.val().length > 2 && $tInput.val() == $mi_pass){
            $tInput.siblings('.icon-x').hide().end().
                siblings('.icon-checkmark').show();
        } else if($tInput.val().length > 2 && !($tInput.attr('type') == 'email') && (!$tInput.hasClass('pass_confirm'))){
            $tInput.siblings('.icon-x').hide().end()
                .siblings('.icon-checkmark').show();
        } else {
            $tInput.siblings('.icon-checkmark').hide().end()
                .siblings('.icon-x').show();
            $can_mform_submit = false;
            if($return){
                return $can_mform_submit;
            }
        }
    }
    
var $modal_wrap = $(".fmodal_wrap"),
    $modal_form = $modal_wrap.find('form'),
    $inputs = $modal_wrap.find('.modal_input').children('input'),
    $can_mform_submit = true,
    $mi_pass = false;
    $inputs.on('blur keyup', function(){
        var $this = $(this);
        if($this.hasClass('pass_input')){
            $mi_pass = $(this).val();
        }
        $this.parent().removeClass('mon-focus');
        checkInputs($this, false);
    });

    $inputs.on('focus', function(){
        $(this).parent().addClass('mon-focus');
    });

    $('form').on('submit', function(e){
        if(!$can_mform_submit){
            e.preventDefault();
            return false;
        }
    });

    if($modal_form.length > 0){
        $modal_form[0].reset();
    }

    var $mmodal_wrap = $('.mmodal_container'),
        $mmodal_wrap1 = $('.settings_modals_add_bank'),
        $mmodal_wrap2 = $('.settings_modals_add_card');
    $mmodal_wrap.modal('toggle');
    $body.on('click', '.close', function(e){
        e.preventDefault();
        $(this).closest('.modal').modal('hide');
    });

    var $input_checkbox = $('input.onoffswitch-checkbox');
    if($input_checkbox.length > 0){
        $input_checkbox.onoff();
    }

    $body.on('click', '.add_bank_link', function(e){
        e.preventDefault();
        $mmodal_wrap1.modal('show');
    }).on('click', '.add_card_link', function(e){
        e.preventDefault();
        $mmodal_wrap2.modal('show');
    });

    $('.mobile_container.hide').hide().removeClass('hide');

    /*$body.on('click', '.data-go', function(e){
        e.preventDefault();
        var getId = $(this).attr('data-go');
        $(this).closest('.mobile_container').addClass('hide');
        $("#" + getId).fadeIn();
    });*/
    $body.on('click', '.data-go', function(e){
        e.preventDefault();
        $(this).closest('.mobile_container').addClass('hide');
        $('.hidden_first').fadeIn().find('form').addClass('clearfix');
    });

    $('.eds_mail').on('click', 'a', function(e){
        e.preventDefault();
        $('.email_invite_modal').modal('show');
    });


    $(".join-alert").on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        if('function' === typeof sweetAlert){

            setTimeout(function(){
                $this.text('Joined!');
            }, 1000);

            swal({
                title: "",
                text: "We've added you to our guestlist!",
                timer: 1500,
                type: 'success',
                showConfirmButton: false
            });
        }

    });

    var $host_btm_links = $(".host_btm_links");
    $(".nav_settings_link").on('click', function(e){
        e.preventDefault();
        $host_btm_links.slideToggle();
    });

    $host_btm_links.siblings().on('click', function(e){
        if(e.currentTarget.className == "top-header"){
            e.stopImmediatePropagation();
        } else {
            $host_btm_links.slideUp();
        }
    });

    /*Set right sidebar fixed*/
    var get_offset,
        get_nav_offset,
        $right_sidebar = $(".ed_pc_fx_sidebar"),
        $ed_nav_wrap = $(".ed_nav_wrap"),
        $loaded = false;
    $(window).load(function(){
        get_offset = $right_sidebar.offset();
        get_nav_offset = $ed_nav_wrap.offset();
        $loaded = true;
    });
    $(window).scroll(function(){
        if($(this).width() > 767 && $loaded && (typeof get_nav_offset != 'undefined')) {
            if($(this).scrollTop() > get_nav_offset.top + 3){
                $('body').addClass('has_fixed_subnav');
                $right_sidebar.addClass('fixed_t').css('left', get_offset.left + 'px');
                $ed_nav_wrap.addClass('fixed_t').css('left', get_offset.left + 'px');
            } else {
                $('body').removeClass('has_fixed_subnav');
                $right_sidebar.removeClass('fixed_t').removeAttr('style');
                $ed_nav_wrap.removeClass('fixed_t').removeAttr('style');
            }
        }
        $host_btm_links.slideUp();
    });

    /*event detail modals*/

    $('.modal').on('hidden.bs.modal', function () {
        // do something…
        /*$('.modal').css('display', 'block').find('.modal-dialog').fadeOut(300, function(){
            $('.modal').hide().find('.modal-dialog').css('display', 'block');
        });*/

    });

    function hide_show_modal_event($btn, $modal){
        $btn.on('click', function(e){
            e.preventDefault();
            hide_show_modal($modal);
        });
    }

    function hide_show_modal($modal){
        $('.modal').modal('hide');
        $modal.modal('show');
    }

    /*$('.countribute_btn').on('click', function(e){
        e.preventDefault();
        $(".ED_checkout_modal").modal('show');
    });*/

    var $ed_add_card_modal = $(".ED_checkout_modals_add_card"),
        $ED_checkout_modal_wrap = $(".ED_checkout_modal_wrap");

    function addEventToModal(){
        hide_show_modal_event($('.countribute_btn'), $(".ED_checkout_modal"));
        hide_show_modal_event($('.show_card_modal'), $(".ED_checkout_modals_add_card"));
    }
    addEventToModal();

    $ed_add_card_modal.find('form').on('submit', function(e){
        e.preventDefault();
        hide_show_modal($('.ED_checkout_modal_card_added'));

        return false;
    });

    $body.on('click', '.ED_checkout_modals_add_card .mb_btn', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        hide_show_modal($('.ED_checkout_modal_card_added'));

        return false;
    });

    $ED_checkout_modal_wrap.find('form').on('submit', function(e){
        e.preventDefault();
        hide_show_modal($('.ED_checkout_modal_confirmation'));

        return false;
    });

    $body.on('click', '.ED_checkout_modal_wrap .mb_btn', function(e){
        hide_show_modal($('.ED_checkout_modal_confirmation'));

        return false;
    });

    $body.on('click', ".confirm_modal_open", function(e){
        hide_show_modal($('.ED_checkout_modal_confirmation'));

        return false;
    });

    function showCrossIcon($input, $icon){
        if($input.val() !== ''){
            $icon.removeClass('hide');
        } else {
            $icon.addClass('hide');
        }
    }
    var $iconInput = $(".cr_nostyle_input"),
        $cIcon = $iconInput.siblings('.ciw_ric');
    $body.on('click', '.ciw_ric', function(e){
        e.preventDefault();
        $(this).addClass('hide').siblings(".cr_nostyle_input").val("");
    });
    $body.on('keyup', ".cr_nostyle_input", function(){
        showCrossIcon($(this), $(this).siblings('.ciw_ric'));
    });

    $(window).load(function(){
        $iconInput.each(function(){
            showCrossIcon($(this), $(this).siblings('.ciw_ric'));
        });
    });
    $body.on('click', '.ui-datepicker-close', function(){

    });


    $('[data-toggle="tooltip"]').tooltip();



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




});
