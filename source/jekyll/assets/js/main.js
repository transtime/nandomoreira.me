!function(e){"use strict";function t(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function n(e,t){var n=a(e,t)?i:s;n(e,t)}var a,s,i;"classList"in document.documentElement?(a=function(e,t){return e.classList.contains(t)},s=function(e,t){e.classList.add(t)},i=function(e,t){e.classList.remove(t)}):(a=function(e,n){return t(n).test(e.className)},s=function(e,t){a(e,t)||(e.className=e.className+" "+t)},i=function(e,n){e.className=e.className.replace(t(n)," ")});var o={hasClass:a,addClass:s,removeClass:i,toggleClass:n,has:a,add:s,remove:i,toggle:n};"function"==typeof define&&define.amd?define(o):"object"==typeof exports?module.exports=o:e.classie=o}(window),function(e){"use strict";var t,n,a;n={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return n.Android()||n.BlackBerry()||n.iOS()||n.Opera()||n.Windows()}},t={menu:document.querySelector(".menu-toggle"),nav:document.querySelector(".navbar"),body:document.querySelector("body"),init:function(){this.menu.addEventListener("click",function(e){e.preventDefault(),classie.toggle(this,"close"),classie.has(t.nav,"is-open")?(classie.remove(t.nav,"is-open"),classie.remove(t.body,"nav-open"),classie.add(t.nav,"is-close")):(classie.add(t.body,"nav-open"),classie.add(t.nav,"is-open"),classie.remove(t.nav,"is-close"))})}},a={postTitle:document.querySelector(".post-title"),container:document.querySelector(".post-header"),init:function(){n.any()||"parallax"!=this.container.getAttribute("data-effect")||window.addEventListener("scroll",function(e){a.update(this.scrollY)},!1)},update:function(e){this.postTitle.style["-webkit-transform"]="translateY("+.5*e+"px)",this.postTitle.style["-moz-transform"]="translateY("+.5*e+"px)",this.postTitle.style.transform="translateY("+.5*e+"px)",this.postTitle.style.opacity=1-.005*e}},t.init(),a.init()}();var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date;!function(){var e=document.createElement("script"),t=document.getElementsByTagName("script")[0];e.async=!0,e.src="//embed.tawk.to/56d848fc67d1eaa9294f62cf/default",e.charset="UTF-8",e.setAttribute("crossorigin","*"),t.parentNode.insertBefore(e,t)}();