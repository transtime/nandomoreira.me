//= require vendor/jquery.min.js

(function($) {
  'use strict';

  $(document).on('click', '[data-toggle="nav"], .nav-opened .site-main', function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-opened');
  });

  var titleParallax = {
    textParallax : document.querySelector('.text-parallax'),

    init: function() {
      window.addEventListener("scroll", function(event) {
        titleParallax.update(this.scrollY);
      }, false);
    },
    update: function(scroll) {
      this.textParallax.style['-webkit-transform'] = 'translateY('+ (scroll * .5) +'px)';
      this.textParallax.style['-moz-transform'] = 'translateY('+ (scroll * .5) +'px)';
      this.textParallax.style['transform'] = 'translateY('+ (scroll * .5) +'px)';
      this.textParallax.style['opacity'] = (1 - ( scroll * .005 ));
    }
  };

  titleParallax.init();

})(jQuery);
