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
	var setHeight = window.innerHeight;
	$("#header").css("height", setHeight);
	var IEVersionCheck = function() {
		var word;
		var version = "N/A";

		var agent = navigator.userAgent.toLowerCase();
		var name = navigator.appName;

		// IE old version ( IE 10 or Lower )
		if ( name == "Microsoft Internet Explorer" ) word = "msie ";

		else {
			// IE 11
			if ( agent.search("trident") > -1 ) word = "trident/.*rv:";

			// IE 12  ( Microsoft Edge )
			else if ( agent.search("edge/") > -1 ) word = "edge/";
		}

		var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
		if (  reg.exec( agent ) != null  )
			version = RegExp.$1 + RegExp.$2;

		return version;
	};

	var IEVersion = IEVersionCheck()
	if (IEVersion == "N/A") {
		// alert("Chrome")
	} else {
		$("body").addClass("ie-support")
		// alert("IE")
	}
})