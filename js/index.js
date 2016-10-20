$(document).ready(function() {
  $('nav ul li').click(function(event) {
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $($(this).find('a').attr('href')).offset().top
		}, "easeInCirc");
    if($('nav .menu').css('display') != 'none') {
      $('nav ul').addClass('hidetoggle');
      $('nav').css('height', '25px');
    }
	});

  $('nav').affix({
    offset: {
      top: $(window).height() - (2*$('nav').height())
    }
  });

  $('nav .menu').click(function() {
    // alert($('nav .menu').css('display')); -> block
    if($('nav ul').css('display') == 'none') {
      $('nav ul').removeClass('hidetoggle');
      $('nav').css('height', '225px');
    } else {
      $('nav ul').addClass('hidetoggle');
      $('nav').css('height', '25px');
    }
  });

  var view;

  $('button.modal_open').click(function() {
    view = '.modal_' + $(this).attr('data-modal');
    $('body').css('overflow', 'hidden');
    $('#modal, .close').show();
    $('div').find(view).show();
    $('#modal').scrollTop(0);
  });

  $('.close').click(function() {
    $('#modal, .close').hide();
    $('div').find(view).hide();
    $('body').css('overflow', 'auto');
  });
});
