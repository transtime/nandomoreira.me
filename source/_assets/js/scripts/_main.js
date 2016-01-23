(function($) {
  'use strict';

  var $form = $('#contactForm'),
      $body = $('body');

  $(document).ready(function () {

    $('.show-disqus').on('click', function (e) {
      e.preventDefault();
      var $btn = $('.disqus-hidden');

      $.ajax({
        type: "GET",
        url: "http://" + disqus_shortname + ".disqus.com/embed.js",
        dataType: "script",
        cache: true,
        beforeSend: function() {
          $btn.html('Carregando..');
        }
      }).done(function() {
        $btn.delay(1200).fadeOut().delay(500).html('');
      });
    });

    $('.light-off, .overlay-popup').on('click', function (e) {
      e.preventDefault();
      var $container = $(this).parent(),
          $lights = $('.light-off .fa');

      $container.stop(true, false).toggleClass('lights');

      if($lights.hasClass('fa-close')) {
        $lights.removeClass('fa-close').addClass('fa-lightbulb-o');
      } else {
        $lights.removeClass('fa-lightbulb-o').addClass('fa-close');
      }

      if($body.hasClass('full-video')) {
        $body.removeClass('full-video');
      } else {
        $body.addClass('full-video');
      }
    });

    $('.hanburg').on('click', function (e) {
      e.preventDefault();

      if($body.hasClass('close-sidebar') || $body.hasClass('no-sidebar')) {
        $body.removeClass('close-sidebar no-sidebar').addClass('open-sidebar');
        $(this).removeClass('is-active');
      } else {
        $body.addClass('close-sidebar').removeClass('open-sidebar');
        $(this).addClass('is-active');
      }
    });

    $('p').selectionSharer();
    $('.swipebox').swipebox();

    $form.on('click', '#sendForm', function (e) {
      e.preventDefault();

      var $btn = $(this),
          action = $form.attr('action'),
          method = $form.attr('method'),
          formdata = $form.serialize(),
          alert = $form.find('.alert'),
          msg = '', alertClass = '';

      var name = $form.find('#name'),
          email = $form.find('#email'),
          message = $form.find('#message');

      var nameValue = name.val(),
          emailValue = email.val(),
          messageValue = message.val();

      alert.html('').removeClass('alert-error alert-success fadeIn shake animated hinge').hide();

      $btn.prop('disabled', true);

      if(nameValue !== '' && nameValue !== undefined &&
        emailValue !== '' && emailValue !== undefined &&
        messageValue !== '' && messageValue !== undefined) {

        $.ajax({
          url: action,
          method: method,
          data: formdata,
          dataType: "json"
        }).success(function(data) {
          $form.each(function() {
            this.reset();
          });

          if(data.success) {
            alertClass = 'alert-success fadeIn hinge';
            msg = '<p>Formulário enviado com sucesso.</p>';
          } else {
            alertClass = 'alert-error shake animated hinge';
            msg = '<p>Ocorreu um erro no envio do formulário, tente enviar novamente para: <strong>nandomoreira.me@gmail.com</strong></p>';
          }

          alert.html(msg).addClass(alertClass).fadeIn('600');
          $btn.prop('disabled', false);
        }).error(function(err) {
          console.error(err);
        });

      } else {

        if(nameValue === undefined || nameValue === '') {
          name.addClass('error');
        } else {
          name.removeClass('error');
        }

        if(emailValue === undefined || emailValue === '') {
          email.addClass('error');
        } else {
          email.removeClass('error');
        }

        if(messageValue === undefined || messageValue === '') {
          message.addClass('error');
        } else {
          message.removeClass('error');
        }

        alertClass = 'alert-error shake animated hinge';
        msg = '<p>Preencha corretamente o formulário.</p>';

        alert.html(msg).addClass(alertClass).fadeIn('600');
        $btn.prop('disabled', false);
      }
    });
  });
})(jQuery);
