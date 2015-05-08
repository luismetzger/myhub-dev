// jQuery Page Load for Homepage
    $(document).ready(function() {
      var isPhoneDevice = "ontouchstart" in document.documentElement;
      isPhoneDevice = $(window).width() < 768;
      if(!isPhoneDevice){
        $('#fullpage').fullpage({
            anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage', '6thPage'],
            navigation: true,
//            'verticalCentered': false,
            navigationPosition: 'right',
            navigationTooltips: ['Hello!', 'What is Myhub', 'Why Myhub', 'How it Works', 'Who it\'s for', 'Get Started'],


            afterLoad: function(anchorLink, index){
                var loadedSection  = $(this),
                        s6fc = loadedSection.find("#footer_container");
                loadedSection.find('.hbtmBtns').addClass('bounce animated');

                //using index
                if(index === 6){
                    /*set footer to bottom always*/
                    var hgt = $(window).height();
                    s6fc.css({
                        'top': hgt + 'px',
                        'marginTop': '-' + s6fc.outerHeight() + 'px'
                    });
                    loadedSection.addClass('active-trans');
                } else {
                    loadedSection.removeClass('active-trans');
                }

            }
            /*,onLeave: function(index, nextIndex, direction){
                var leavingSection = $(this);

                //after leaving section 2
                if(index == 6 && direction =='up'){
                    leavingSection.removeClass('active-trans');
                }
            }*/

        });
      } else {
        $("link[href*='jquery.fullPage.css']").attr("disabled", "disabled");
      }

      $('.venobox').venobox();

    });
    
    
    // Desktop Menu Dropdown
    $('.dropdown-toggle').dropdown();