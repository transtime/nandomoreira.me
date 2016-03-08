//=require bower/classie/classie.js

(function($) {
  'use strict';

  var menu = document.querySelector('.menu-toggle'),
      nav  = document.querySelector('.navbar'),
      body = document.querySelector('body');

  menu.addEventListener("click", function (e) {
    e.preventDefault();

    classie.toggle( this, 'close' );

    if (classie.has( nav, 'is-open' )) {
      classie.remove( nav, 'is-open' ).add( nav, 'is-close' );
      classie.remove( body, 'nav-open' );
    } else {
      classie.add( body, 'nav-open' );
      classie.add( nav, 'is-open' );
    }
  });

})();