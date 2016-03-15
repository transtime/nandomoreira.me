//=require bower/classie/classie.js
//=require lightbox.js

;(function() {
  'use strict';

  var menuToggle, isMobile,
      titleParallax, gallery,
      headerFixed;

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
    postHeader : document.querySelector('.post-header'),

    init: function() {
      this.menu.addEventListener("click", function (e) {
        e.preventDefault();
        menuToggle.nav.style.height = menuToggle.postHeader.offsetHeight + 'px';
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
    parallax  : document.querySelector('.parallax'),
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
      this.parallax.style['-webkit-transform'] = 'translateY('+ (scroll * .6) +'px)';
      this.parallax.style['-moz-transform'] = 'translateY('+ (scroll * .6) +'px)';
      this.parallax.style['transform'] = 'translateY('+ (scroll * .6) +'px)';
      this.parallax.style['opacity'] = (1 - ( scroll * .002 ));
    }
  };

  headerFixed = {
    header     : document.querySelector('.header'),
    postHeader : document.querySelector('.post-header'),

    init: function() {
      window.addEventListener("scroll", function(event) {
        headerFixed.update(this.scrollY);
      }, false);
    },
    update: function(scroll) {
      if (scroll >= this.postHeader.offsetHeight) {
        classie.add( this.header, 'header-white' );
      } else {
        classie.remove( this.header, 'header-white' );
      }
    }
  };

  gallery = {
    init: function() {
      return new lightBox();
    }
  };

  menuToggle.init();
  headerFixed.init();
  titleParallax.init();
  gallery.init();

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
