;$(document).ready(function(){



    $(window).scroll(function() {
        addClassforFooter($(this));
    });


    var $wrap = $("#pushy_wrapper.section"),
        $fullHeightBox = $('.full-height');

    function setHeight(){
        var getWindowHeight = $(window).height();
        $wrap.css('min-height', getWindowHeight + 'px');
        $fullHeightBox.css('min-height', getWindowHeight + 'px');
        if ( $(window).width() > 768 ) {
          $wrap.css('max-height', '700px');
          $fullHeightBox.css('max-height', '700px');
        }
    }
    setHeight();
    $(window).resize(function(){
        setHeight();
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
            console.log('ok');
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
    })




});
