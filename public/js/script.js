jQuery(document).ready(function(){

    // $('#hide').click(function(){
    //     $('div#login-contain').hide();
    //     $('div#register-contain').show();
    // });
    // $("#hide-register").click(function(){
    //     $('div#login-contain').show();
    //     $('div#register-contain').hide();
    // });
    // $("#register-patient").click(function(){
    //     $('div#register-contain').css('display','block');
    //     $('div#login-contain').hide();
    // });
    function animate(){
        jQuery('div #call-ambulance').mouseenter(function(){
            $('div #call-ambulance').addClass('animated pulse');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #call-ambulance').mouseleave(function(){
            $('div #call-ambulance').removeClass('animated pulse');
           // $('div .dash-text').removeClass('animated pulse');
        });
        jQuery('div #logo-box').mouseenter(function(){
            $('div #hospitant-logo').addClass('animated rubberBand');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #logo-box').mouseleave(function(){
            $('div #hospitant-logo').removeClass('animated rubberBand');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #nearest-hospital').mouseenter(function(){
            $('div #nearest-hospital').addClass('animated pulse');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #nearest-hospital').mouseleave(function(){
            $('div #nearest-hospital').removeClass('animated pulse');
           // $('div .dash-text').removeClass('animated pulse');
        });
        jQuery('div #your-hospital').mouseenter(function(){
            $('div #your-hospital').addClass('animated pulse');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #your-hospital').mouseleave(function(){
            $('div #your-hospital').removeClass('animated pulse');
           // $('div .dash-text').removeClass('animated pulse');
        });
        jQuery('div #best-hospital').mouseenter(function(){
            $('div #best-hospital').addClass('animated pulse');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #best-hospital').mouseleave(function(){
            $('div #best-hospital').removeClass('animated pulse');
           // $('div .dash-text').removeClass('animated pulse');
        });
        jQuery('div #nearest-pharma').mouseenter(function(){
            $('div #nearest-pharma').addClass('animated pulse');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #nearest-pharma').mouseleave(function(){
            $('div #nearest-pharma').removeClass('animated pulse');
           // $('div .dash-text').removeClass('animated pulse');
        });
        jQuery('div #appoint-doctor').mouseenter(function(){
            $('div #appoint-doctor').addClass('animated pulse');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #appoint-doctor').mouseleave(function(){
            $('div #appoint-doctor').removeClass('animated pulse');
           // $('div .dash-text').removeClass('animated pulse');
        });
        jQuery('div #invest').mouseenter(function(){
            $('div #invest').addClass('animated pulse');
            //$('div .dash-text').addClass('animated pulse');
        });
        jQuery('div #invest').mouseleave(function(){
            $('div #invest').removeClass('animated pulse');
           // $('div .dash-text').removeClass('animated pulse');
        });
        
    }
    animate();
});

