var sel_number = undefined;
var $collapse = $('.collapse');
var $modal_title_lib = $(".modal-title-lib");
var $loading = $(".loading-icon");
$collapse.collapse('hide');

$(document).ready(function() {
  $('a').click(function(event) {
      $('.need-reveal').addClass("hidden");
      $('.need-hide').removeClass('hidden');
      $('#information-reveal').removeClass("hidden");
      sel_number = $(this).attr('id');
      event.preventDefault();
      $collapse.collapse('hide');
      $.get("http://rainclab.net:4567/getLibraryData/" + sel_number, function(data) {
        $('#collapse-name').html(data.library);
        ['14', '15'].forEach(function(val, index, array) {
            var info = data.information["h" + val];
            ['title', 'name', 'email', 'detail'].forEach(function(val2, index, array) {
                $('#time-' + val + '-' + val2).html(info[val2]);
            });
        });
        $collapse.collapse('show');
        $("body").stop().animate({scrollTop:0}, 1000, 'swing', function() {});
      });
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
  $.get("http://rainclab.net:4567/infoValidation/" + sel_number + "?email=" + $email.val(), function(data) {
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
  });
}