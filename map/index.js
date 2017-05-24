if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function isMobile() {
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	} else {
		return false;
	}
}

var locations = [{lat: 37.551973, lng: 126.83666},{lat: 37.489644, lng: 126.944753},{lat: 37.467736, lng: 126.944801},{lat: 37.573176, lng: 127.050488},{lat: 37.589864, lng: 127.047329},{lat: 37.547684, lng: 126.932058},{lat: 37.559092, lng: 127.034932},{lat: 37.608762, lng: 127.021976},{lat: 37.599032, lng: 127.035175},{lat: 37.585966, lng: 126.919694},{lat: 37.609583, lng: 126.912851},{lat: 37.582692, lng: 126.907454},{lat: 37.615242, lng: 127.086902},{lat: 37.503453, lng: 126.740157},
  {lat: 37.693843, lng: 126.591993},{lat: 37.513268, lng: 126.77123},{lat: 37.47169, lng: 127.1429},{lat: 37.302851, lng: 127.047414},{lat: 37.257185, lng: 127.072003},{lat: 37.238623, lng: 127.050944},{lat: 37.284765, lng: 126.996658},{lat: 37.292900, lng: 127.147501},{lat: 37.72648, lng: 127.042677},{lat: 37.061923, lng: 127.067545},{lat: 37.445173, lng: 129.164825},{lat: 37.871844, lng: 127.731601},{lat: 35.852686, lng: 128.560466},{lat: 35.859365, lng: 128.630676},
  {lat: 34.836334, lng: 127.892107},{lat: 35.249742, lng: 129.217315},{lat: 35.281339, lng: 128.400906},{lat: 36.783109, lng: 127.588633},{lat: 36.451662, lng: 127.126353}];

var isMarkerEnable = false;
var marker = undefined;
var infowindow = undefined;
var map = undefined;

$(document).ready(function() {
  var mapContainer = document.getElementById('map');
  var mapOption = {
        center: new daum.maps.LatLng(36.6748632,127.7936119), // 지도의 중심좌표
        level: 13
  };

  map = new daum.maps.Map(mapContainer, mapOption);

  $('.button-container').click(function () {
    var id = $(this).attr('id');
    $("#collapse-" + id).collapse('toggle');
  });

  $('.map').affix({
    offset: {
      top: 411
    }
  });

  $('.library').click(function() {
    if (isMobile()) {
      var name = $("#" + $(this).attr('id') + " .library-name").html()
      var loc = locations[parseInt($(this).attr('id'), 10) - 1];
      location.href = "http://map.daum.net/link/map/소물행사장) {0},{1},{2}".format(name, loc.lat, loc.lng);
    } else {
      var id = $(this).attr('id');
      var loc = locations[parseInt($(this).attr('id'), 10) - 1];
      var markerPosition = new daum.maps.LatLng(loc.lat, loc.lng);
      map.setCenter(markerPosition);
      map.setLevel(3);
      if (isMarkerEnable) {
        marker.setMap(null);
        infowindow.close();
      }
      marker = new daum.maps.Marker({
          position: markerPosition
      });
      marker.setMap(map);
      isMarkerEnable = true;
      var iwContent = '<div style="width: 300px; height: 160px; padding: 20px"><h4>{0}</h4><h5>{1}</h5><br><a href="http://map.daum.net/link/map/소물행사장) {0},{2},{3}" style="border:1px solid grey;padding: 10px;color:#444444; margin-right: 10px;">큰 지도 보기</a> <a href="http://map.daum.net/link/to/소물행사장) {0},{2},{3}" style="border:1px solid grey;padding: 10px;color:#444444; margin-right: 10px;">길찾기</a></div>';
      iwContent = iwContent.format($("#" + id + " .library-name").html(), $("#" + id + " .library-address").html(), loc.lat, loc.lng);
      var iwPosition = new daum.maps.LatLng(loc.lat, loc.lng);
      infowindow = new daum.maps.InfoWindow({
          position : iwPosition,
          content : iwContent
      });
      infowindow.open(map, marker);
    }
  });
});

// var iwContent = '<div style="width: 300px; height: 160px; padding: 20px"><h4>작은샘작은도서관</h4><h5>서울특별시 강서구 강서로 24, 2층</h5><br><a href="#" style="border:1px solid grey;padding: 10px;color:#444444; margin-right: 10px;">큰 지도 보기</a> <a href="http://map.daum.net/?eX=400206&eY=-11702&eName=%EC%86%8C%EB%AC%BC%ED%96%89%EC%82%AC%EC%9E%A5%29+%EC%9E%91%EC%9D%80%EC%83%98%EC%9E%91%EC%9D%80%EB%8F%84%EC%84%9C%EA%B4%80" style="border:1px solid grey;padding: 10px;color:#444444; margin-right: 10px;">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
