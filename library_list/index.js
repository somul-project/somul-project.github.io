var sel_number = undefined;
var $collapse = $('.collapse');
var $modal_title_lib = $(".modal-title-lib");
var $loading = $(".loading-icon");
$collapse.collapse('hide');

$(document).ready(function() {
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
	$('a').click(function(event) {
		$('#loader').fadeIn("slow", function(){});
		$('.need-reveal').addClass("hidden");
		$('.need-hide').removeClass('hidden');
		$('#information-reveal').removeClass("hidden");
		sel_number = $(this).attr('id');
		event.preventDefault();
		$collapse.collapse('hide');
		var xmlhttp = new XMLHttpRequest();
		var url = "http://rainclab.net:4567/getLibraryData/" + sel_number + ".json";
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				$('#collapse-name').html(data.library);
				$('#manager-name').html(data.assigned_person['name']);
				$('#manager-phone').html(data.assigned_person['telephone']);
				['14', '15'].forEach(function(val, index, array) {
					var info = data.information["h" + val];
					['title', 'name', 'email', 'detail'].forEach(function(val2, index, array) {
						$('#time-' + val + '-' + val2).html(info[val2]);
					});
				});
				$collapse.collapse('show');
				$("body").stop().animate({scrollTop:0}, 1000, 'swing', function() {});
				$("#loader").fadeOut("slow", function(){});
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	});
	$('#library-search').bind("keyup", function(event) {
		var val = $(this).val();
		
		if (!IEVersionCheck() == "N/A") {
			alert("Internet Explorer 에서는 해당 기능을 지원하지 않습니다. Chrome 브라우저를 설치해 주세요.");
			location.href="http://chrome.google.com";
		} else {
			$(".library_link").each(function() {
				if ($(this).html().indexOf(val) == -1) {
					$(this).css("display", "none");
				} else {
					$(this).css("display", "block");
				}
			});
		}
		
	});

	$("#manager-email").keydown(function (key) {
		if (key.keyCode == 13){
			checkValid();
		}
	});
});

function checkValid() {
	var $email = $("#manager-email");
	var $not = $(".email-not-available");

	if ($email.val() == "" || $email.val() == null) {
		$not.removeClass("hidden");
		$not.html("E-mail을 입력해 주세요!");
		return;
	}

	if (sel_number == undefined) {
		alert("웹사이트에 원인을 알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
		location.reload(true);
		return;
	}

	$loading.removeClass("hidden");
		
		
		
	var xmlhttp = new XMLHttpRequest();
	var url = "http://rainclab.net:4567/infoValidation/" + sel_number + "?email=" + $email.val();
		
		
		
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			if (data.email_valid == false) {
				$not.removeClass("hidden");
				$not.html("E-mail이 올바르지 않습니다.");
			} else {
				var info = data.information;

				$('#time-14-phone').html(info["h14"]);
				$('#time-15-phone').html(info["h15"]);
				['1', '2'].forEach(function(val, index, array) {
					var temp = info["mc" + val].split(";");
					['name', 'email', 'phone'].forEach(function(val2, index2, array2) {
						$("#mc-" + val + "-" + val2).html(temp[index2]);
					});
				});

				$('.need-reveal').removeClass("hidden");
				$('.need-hide').addClass('hidden');
				$('#information-reveal').addClass("hidden");
				$(".modal").modal('hide');
			}
			$loading.addClass("hidden");
		}
	}
	
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	

}
