$(document).ready(function(){
	
	var scrollTimer = null;
	var functionScroll = function(e){
		var $nowScrollTop = $(this).scrollTop();
		if($nowScrollTop > 10){
			$(".header").addClass('scrolled');
		}
		else{
			$(".header").removeClass('scrolled');                
		}
	};


	$(this).scroll(function(){
		if (scrollTimer) {
			clearTimeout(scrollTimer);   // clear any previous pending timer
		}
		scrollTimer = setTimeout(functionScroll, 5);   // set new timer
	});
	$('body').on('touchmove', function () {
		if (scrollTimer) {
			clearTimeout(scrollTimer);   // clear any previous pending timer
		}
		scrollTimer = setTimeout(functionScroll, 5);   // set new timer
	});
	functionScroll();

});