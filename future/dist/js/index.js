$(document).ready(function() {
	$('.topmenu-buttons li').click(function(event) {
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $($(this).find('a').attr('href')).offset().top
		}, "easeInCirc");
		if($('nav .menu').css('display') != 'none') {
			$('nav ul').addClass('hidetoggle');
			$('nav').css('height', '20px');
		}
	});
	$('.item-check-detail-button.modal_open').click(function() {
		view = '.modal_' + $(this).attr('data-modal');
		$('body').css('overflow', 'hidden');
		$('#modal, .close').show();
		$('div').find(view).show();
		$('#modal').scrollTop(0);
	});
	$('.action .close').click(function() {
	    $('#modal, .close').hide();
	    $('div').find(view).hide();
	    $('body').css('overflow', 'auto');
	  });
})