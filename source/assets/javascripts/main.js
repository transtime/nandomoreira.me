//= require vendor/jquery.min.js

(function($) {
  $(document).on('click', '[data-toggle="nav"], .nav-opened .site-main', function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-opened');
  });
})(jQuery);

