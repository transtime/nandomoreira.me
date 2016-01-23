/*
 * Infinite scroll
 */

//=require ../../../bower/jscroll/jquery.jscroll.min.js

;(function($) {
  'use strict';

  $(document).ready(function () {

    $('.posts').jscroll({
      contentSelector: '.posts',
      loadingHtml: '<img src="/assets/images/loading.gif" alt="Loading" />',
      padding: 10,
      nextSelector: '.next'
    });

  });

})(jQuery);
