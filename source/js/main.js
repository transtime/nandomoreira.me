
//=require bower/jquery/dist/jquery.min.js
//=require parallax.js

(function($) {
  'use strict';

  $(document).ready(function() {
    $('.parallax').sparallax();

    $('.menu-toggle').on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass('close');

      var $nav = $('.navbar'),
          $body = $('body');

      if ($nav.hasClass('is-open')) {
        $nav.removeClass('is-open').addClass('is-close');
        $body.removeClass('nav-open');
      } else {
        $body.addClass('nav-open');
        $nav.removeClass('is-close').addClass('is-open');
      }
    });
  });

})(jQuery);
