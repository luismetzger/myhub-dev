;$(document).ready(function(){

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

    var $noFooterCont = $('.create_cont_wrap');
    function setHeightNoFooter($cont){
        $cont.css('minHeight', $(window).height() - 55 + 'px');
    }
    setHeightNoFooter($noFooterCont);



    setHeight();
    $(window).resize(function(){
        setHeight();
        setHeightNoFooter($noFooterCont);
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
        console.log(sectonNo);
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

    $body.on('click', '.pl-hover a.not-following', function(e){

        e.preventDefault();

        var $this = $(this);


        $this.hide( "normal", function() {
            $this.find('img').attr('src', 'assets/images/pimg_icons/User_Follow@3x.png');
            $this.show('slow',function(){
                $this.hide('normal', function(){
                    $this.find('img').attr('src', 'assets/images/pimg_icons/User_Pending@3x.png');
                    $this.show('slow', function(){
                        $this.removeClass('not-following');
                    });
                });
            });
        });
        $(this).animate({
        }, 5000, function() {
            // Animation complete.
        });
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

    hide_show_modal_event($('.countribute_btn'), $(".ED_checkout_modal"));
    hide_show_modal_event($('.show_card_modal'), $ed_add_card_modal);

    $ed_add_card_modal.find('form').on('submit', function(e){
        e.preventDefault();
        hide_show_modal($('.ED_checkout_modal_card_added'));

        return false;
    });

    $ed_add_card_modal.on('click', '.mb_btn', function(e){
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

    $ED_checkout_modal_wrap.on('click', '.mb_btn', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        hide_show_modal($('.ED_checkout_modal_confirmation'));

        return false;
    });


    $('[data-toggle="tooltip"]').tooltip();


});
