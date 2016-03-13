//=require bower/classie/classie.js

(function($) {
  'use strict';

  var menuToggle,
      isMobile,
      titleParallax;

  isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  menuToggle = {
    menu : document.querySelector('.menu-toggle'),
    nav  : document.querySelector('.navbar'),
    body : document.querySelector('body'),

    init: function() {
      this.menu.addEventListener("click", function (e) {
        e.preventDefault();

        classie.toggle( this, 'close' );

        if (classie.has( menuToggle.nav, 'is-open' )) {
          classie.remove( menuToggle.nav, 'is-open' );
          classie.remove( menuToggle.body, 'nav-open' );
          classie.add( menuToggle.nav, 'is-close' );
        } else {
          classie.add( menuToggle.body, 'nav-open' );
          classie.add( menuToggle.nav, 'is-open' );
          classie.remove( menuToggle.nav, 'is-close' );
        }
      });
    }
  };

  titleParallax = {
    postTitle : document.querySelector('.post-title'),
    container : document.querySelector('.post-header'),

    init: function() {
      if( isMobile.any() || this.container.getAttribute('data-effect') != 'parallax' ) {
        return;
      }

      window.addEventListener("scroll", function(event) {
        titleParallax.update(this.scrollY);
      }, false);
    },
    update: function(scroll) {
      this.postTitle.style['-webkit-transform'] = 'translateY('+ (scroll * .5) +'px)';
      this.postTitle.style['-moz-transform'] = 'translateY('+ (scroll * .5) +'px)';
      this.postTitle.style['transform'] = 'translateY('+ (scroll * .5) +'px)';
      this.postTitle.style['opacity'] = (1 - ( scroll * .005 ));
    }
  };

  menuToggle.init();
  titleParallax.init();

})();

var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();

(function() {
  var s1 = document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = '//embed.tawk.to/56d848fc67d1eaa9294f62cf/default';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1, s0);
})();
