var libraryData = [];
var map = null;

var defaultMarkerImage = new daum.maps.MarkerImage(
    'http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/default_marker.png',
    new daum.maps.Size(40, 42),
    {offset: new daum.maps.Point(13, 39)}
);

function changeListHeader(header) {
    $(".library-list-header > p").text(header);
}

function generateMap() {
    var container = document.getElementById('mapview'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(37.6, 127), //지도의 중심좌표.
        level: 13
    };

    map = new daum.maps.Map(container, options); // 지도 호출

    map.setDraggable(false);
    map.setZoomable(false);
}

function checkNull(sentence) {
    return (sentence === "") ? "발표 내용이 등록 안되었습니다." : sentence;
}

function generateLibraryInfo(library) {

    if (!($(".library-list").children().hasClass(library.city))) {
        $(".library-list").append(
            '<div class="city ' + library.city + '">' +
            '<div class="city-name">' +
            '<p>' + library.city + '</p>' +
            '</div>' +
            '<div class="libraries"></div>' +
            '</div>'
        );
    }

    $("." + library.city).first().children().eq(1).append(
        '<div class="library">' +
        '<p>' + library.name + '</p>' +
        '<div class="library-info">' +
        '<ul>' +
        '<li><p>' + library.location.detail + '<br>' + library.location.road + '</p></li>' +
        ((library.speakers["14:00"].name !== undefined)
            ? '<li><p>2시 : ' + checkNull(library.speakers["14:00"].name) + '<br>주제 : ' + checkNull(library.speakers["14:00"].description) + '</p></li>'
            : "") +
        ((library.speakers["15:00"].name !== undefined)
            ? '<li><p>3시 : ' + checkNull(library.speakers["15:00"].name) + '<br>주제 : ' + checkNull(library.speakers["15:00"].description) + '</p></li>'
            : "") +
        '</ul>' +
        '<input type="hidden" value="' + library.id + '">' +
        '</div>' +
        '</div>'
    );
}

function setBoundsMap(flag) {
    var flag = typeof flag !== 'undefined' ? flag : false;
    var bounds = new daum.maps.LatLngBounds();

    var library = null;

    for (var i = 0; i < libraryData.length; i++) {
        library = libraryData[i];

        if (library.marker === undefined) {
            library.coords = new daum.maps.LatLng(library.location.latitude, library.location.longitude);
            library.city = library.location.road.split(" ")[0];
            library.marker = new daum.maps.Marker({position: library.coords});
            generateLibraryInfo(library);
            library.marker.setMap(map);
        }

        (flag) ? library.marker.setMap(map) : null;

        library.marker.setImage(defaultMarkerImage);
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(library.coords);
    }

    map.setBounds(bounds); // 중심으로 이동
}

$(window).on("load", function () {
    $.ajax({
        type: 'get',
        url: "http://apply.somul.kr/api/v1/map",
        beforeSend: function () {
            $("#preloader-area").css("display", "block");
        },
        success: function (response) {
            libraryData = response;
            for (var i = 0; i < libraryData.length; i++) {
                if (libraryData[i].location.latitude === "None" || libraryData[i].location.longitude === "None") {
                    libraryData.splice(i--, 1);
                }
            }

            var mobileKeyWords = ['iPhone', 'iPod', "BlackBerry", 'Android', 'Windows CE', 'Windows CE;', 'LG',
                'MOT', 'SAMSUNG', 'SonyEricsson', 'Mobile', 'Symbian', 'Opera Mobi', 'Opera Mini', 'IEmobile'];
            for (var word in mobileKeyWords) {
                if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
                    $("#preloader").fadeOut();
                    $("#preloader-area").fadeOut();

                    $("#preload-hide").fadeIn();
                    break;
                }
            }

            generateMap();
            setBoundsMap();
        },
        dataType: "json"
    });
});