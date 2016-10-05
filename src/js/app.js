'use strict';

var $ = require('jquery/dist/jquery');
require('jquery.transit/jquery.transit.js');

(function() {
    $(document).ready(function() {
        $('#splash-logo h1 img').transition({ y: '-20px', opacity: 1 }, 1000);
        
        var $header = $('#app header');
        if ($(document).scrollTop() > $(window).height()-70) {
            if ($header.css('position') != 'fixed') {
                $header.css({ position: 'fixed', marginTop: 0, top: 0, width: '100%', left: 0, marginLeft: 0 });
            }
        }
        $header.find('.bar').width((($(document).scrollTop()-$(window).height()-60) / ($('#app').height()-$(window).height())) * $(window).width());
        
        $(document).scroll(function() {
            var scrollTop = $(this).scrollTop();
            $('#splash-image').css({ backgroundPosition: "0px " + (Math.max($('#splash-image').scrollTop(), scrollTop) / 4) + "px"}); 
            
            var $header = $('#app header');
            if (scrollTop > $(window).height()-70) {
                if ($header.css('position') != 'fixed') {
                    $header.css({ position: 'fixed', marginTop: 0, top: 0, left: '50%', marginLeft: '-'+($header.width()/2)+'px' });
                    $header.stop().animate({ width: '100%', left: 0, marginLeft: 0 }, 200);
                }
            } else {
                $header.css({ position: 'static', margin: '0 auto', marginTop: '-70px', marginBottom: '10px' });
                $header.stop().animate({ width: '95%' }, 200);
            }
            
            $header.find('.bar').width(((scrollTop-$(window).height()+60) / ($('#app').height()-$(window).height())) * $(window).width());
        });
        
        $('a[href^="#"]').click(function(event){
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 60
            }, 500);
            
            return false;
        });
    });
})();