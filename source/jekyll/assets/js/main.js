/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );

/*
  .__  .__       .__     __ ___.
  |  | |__| ____ |  |___/  |\_ |__   _______  ___
  |  | |  |/ ___\|  |  \   __\ __ \ /  _ \  \/  /
  |  |_|  / /_/  >   Y  \  | | \_\ (  <_> >    <
  |____/__\___  /|___|  /__| |___  /\____/__/\_ \
         /_____/      \/         \/            \/

        by Łukasz Duda
        License: GPLv3
*/

/* MAIN */
var lightBox = function () {
  //VARS
  this.elements; //holder for all images
  this.width; //length of all container
  this.images = Array(); //list of all links
  this.body = document.querySelector("body");
  this.value = 0; //value of transition
  this.transform;
  this.slidesBox;
  this.active;
  this.left;
  this.touchStart;
  this.touchEnd;
  this.buttonRight;
  this.buttonLeft;
  this.loadingAnimation;
  this.html = '<div class="lightbox-background"><div class="lightbox-loader" title="2"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml"attributeName="transform"type="rotate"from="0 25 25"to="360 25 25"dur="0.6s"repeatCount="indefinite"/></path></svg></div><div class="lightbox-slides"></div><div class="lightbox-exit"></div><div class="lightbox-buttons"><div class="lightbox-button-left lightbox-inactive"></div><div class="lightbox-button-right"></div></div></div>';

  this.initLightBox();
};

/* INIT FUNCTION */
lightBox.prototype.initLightBox = function () {
  this.elements = document.querySelectorAll(".lightbox"); //get all elements

  this.transform = 100; //set transform value

  for(var i = 0, len = this.elements.length; i<len; i++) {

    /* Push all links inside array */

    this.images.push(this.elements[i].getAttribute("href"));

    /* and set click event */
    this.elements[i].addEventListener("click", function (e) {
      e.preventDefault();

      e.target.classList.add("lightbox-clicked");

      //hide overflow
      this.body.style.overflow = "hidden";

      if(this.body.innerHTML += this.html) {

        //get slides container
        this.slidesBox = document.querySelector(".lightbox-slides");

        //get loading Animation
        this.loadingAnimation = document.querySelector(".lightbox-loader");

        //set buttons handler
        this.buttonRight = document.querySelector(".lightbox-button-right");
        this.buttonLeft = document.querySelector(".lightbox-button-left");

          /* button handler */
          this.buttonRight.addEventListener("click", function () {
            this.slideRight();
          }.bind(this));

          this.buttonLeft.addEventListener("click", function () {
            this.slideLeft();
          }.bind(this));

          window.addEventListener("keydown", function(e) {
            if(e.keyCode === 27) {
              //escape
              this.close();
            }

            if(e.keyCode === 39) {
              //right
              this.slideRight();
            }

            if(e.keyCode === 37) {
              //left
              this.slideLeft();
            }
          }.bind(this));

          //touch
          window.addEventListener("touchstart", function (e) {
            this.touchStart = e.changedTouches[0].pageX;
          }.bind(this));

          window.addEventListener("touchend", function (e) {
            this.touchEnd = e.changedTouches[0].pageX;

            if((this.touchEnd - this.touchStart) > 0) {
              this.slideLeft();
            } else {
              this.slideRight();
            }
          }.bind(this));

        //Run next Function
        this.putAllImages();

        document.querySelector(".lightbox-exit").addEventListener("click", function() {
          this.close();
        }.bind(this));
      }
    }.bind(this));
  };
};

lightBox.prototype.putAllImages = function () {
  for(var i = 0, len = this.elements.length; i<len; i++) {

    if(this.elements[i].children[0].classList.contains("lightbox-clicked")) {
      this.left = -(i*100);
    }

    //show loading anim
    this.loadingAnimation.style.opacity = 1;
    this.slidesBox.style.opacity = 0;

    var self = this;
    setTimeout(function() {
      //hide loading anim
      self.loadingAnimation.style.opacity = 0;
      self.slidesBox.style.opacity = 1;
    }, 100*this.elements.length);

    //put new slide
    if(this.elements[i].dataset.caption != undefined && this.elements[i].dataset.caption != "") {
      this.caption = '<div class="lightbox-caption">'+this.elements[i].dataset.caption+'</div>';
    } else {
      this.caption = "";
    }

    this.slidesBox.innerHTML += '<div class="lightbox-slide" style="left:'+i*100+'%"><img src="'+this.elements[i].getAttribute("href")+'">'+this.caption+'</div>';

    if(i+1 === len) {
      if(this.value = this.left) {
        this.transform = 0;
        this.slideRight();
        this.transform = 100;
      }
    }

  }
}

lightBox.prototype.close = function() {
  //set overflow for body
  this.body.style.overflow = "auto";

  //remove all lightbox
  document.querySelector(".lightbox-background").remove();

  //CLEAN
  this.clean();

  //run new instance of lightbox;
  this.initLightBox();
}

/* CLEAN */
lightBox.prototype.clean = function () {
  /* RESET VARIABLES */
  this.elements = 0; //holder for all images
  this.width = 0; //length of all container
  this.images = Array(); //list of all links
  this.slidesBox = undefined;
  this.value = 0; //value of transition
  this.transform = undefined;
  this.left = 0;
  document.querySelector(".lightbox-clicked").classList.remove("lightbox-clicked");
  this.loadingAnimation = undefined;
  this.buttonRight = undefined;
  this.buttonLeft = undefined;
};

lightBox.prototype.slideLeft = function () {
  if(this.value >= 0) {
  //do nothing
    } else {
      this.buttonRight.classList.remove("lightbox-inactive");
      this.value += this.transform;
      this.slidesBox.style.transform = "translate("+this.value+"%, 0)";
    if(this.value >= 0) {
      this.buttonLeft.classList.add("lightbox-inactive");
    }
  }
}

lightBox.prototype.slideRight = function () {
  if (this.elements !== undefined) {
    if(-this.value >= (this.elements.length*100)-this.transform) {
      //do nothing
      } else {
        this.buttonLeft.classList.remove("lightbox-inactive");
        this.value -= this.transform;
        this.slidesBox.style.transform = "translate("+this.value+"%, 0)";
      if(-this.value >= (this.elements.length*100)-100) {
        this.buttonRight.classList.add("lightbox-inactive");
      }
    }
  }
}


;(function() {
  'use strict';

  var menuToggle, isMobile,
      titleParallax, gallery;

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

  gallery = {
    init: function() {
      return new lightBox();
    }
  };

  menuToggle.init();
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
