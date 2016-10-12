'use strict';

var $ = require('jquery/dist/jquery');
window.jQuery = $;
require('jquery.transit/jquery.transit.js');
require('jquery.stellar/jquery.stellar.js'); 
require('bootstrap/dist/js/bootstrap.min.js');
var Masonry = require('masonry-layout/masonry.js');

(function() {
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

        var grid = document.querySelector('.sponsor-list');
        var msnry = new Masonry(grid, {
          itemSelector: 'img',
          gutter: 10
        });
    });
})();