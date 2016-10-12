'use strict';

var $ = require('jquery/dist/jquery');
var imagesLoaded = require('imagesloaded/imagesloaded.js');
var jQueryBridget = require('jquery-bridget');
var Masonry = require('masonry-layout/masonry.js');

window.jQuery = $;
require('jquery.transit/jquery.transit.js');
require('jquery.stellar/jquery.stellar.js'); 
require('bootstrap/dist/js/bootstrap.min.js');

(function() {
    jQueryBridget('masonry', Masonry, $);
    imagesLoaded.makeJQueryPlugin($);
        
    $(document).ready(function() {
        $('#splash-logo h1 img').transition({ y: '-20px', opacity: 1 }, 1000);
        
        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 20
        });
        
        $('a[href^="#"]').click(function(event){
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 60
            }, 500);
            
            return false;
        });

        var $sponsorList = $('.sponsor-list');
        $sponsorList.imagesLoaded(function() {
            $sponsorList.masonry({
                itemSelector: 'img',
                gutter: 10,
                percentPosition: true
            })
        });
    });
})();