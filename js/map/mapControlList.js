var prevPage = -1;

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var customMarkerImage = new daum.maps.MarkerImage(
    'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
    new daum.maps.Size(40, 42),
    {offset: new daum.maps.Point(13, 39)}
);

function goBack() {
    $(".city-name").css("display", "none");
    $(".library-info").css("display", "none");
    $(".icon-back").css("display", "none");
    $(".library").css("display", "none");

    var page = prevPage--, msg = "원하는 지역을 선택해주세요.";
    if (page === 1) {
        setBoundsMap();
        $(".libraries").css("display", "none");
        $(".city-name").css("display", "block");
    } else if (page === 2) {
        msg = "원하는 도서관을 선택해주세요.";
        var selectedLibrary = $(".libraries")
            .filter(function () {
                return $(this).css("display") === "block";
            });
        var nonSelectedLibrary = $(".libraries")
            .filter(function () {
                return $(this).css("display") !== "block";
            });
        selectedLibrary.children(".library").css("display", "block");
        nonSelectedLibrary.css("display", "none");
        $(".icon-back").css("display", "block");

        var target = selectedLibrary.parents().first().attr("class").split(' ')[1];
        var bounds = new daum.maps.LatLngBounds(), library;

        for (var i = 0; i < libraryData.length; i++) {
            library = libraryData[i];
            if (target === library.city) {
                library.marker.setImage(customMarkerImage);
                bounds.extend(library.coords);
            } else {
                library.marker.setImage(defaultMarkerImage);
            }
        }
        map.setBounds(bounds);
    } else {

    }
    changeListHeader(msg);
}

$(window).on("load", function () {
    $(document).on("click", ".city-name", function (event) {
        $(".city-name").css("display", "none");
        $(".libraries").css("display", "none");
        $(".library").css("display", "block");

        var parent = $(this).parent().first();
        var target = parent.attr('class').split(' ');

        $(this).next().first().css("display", "block");

        // var msg = parent.children(".city-name").first().children().first().text();
        var msg = "원하는 도서관을 선택해주세요.";
        changeListHeader(msg);

        $(".icon-back").css("display", "block");

        var bounds = new daum.maps.LatLngBounds(), library;

        for (var i = 0; i < libraryData.length; i++) {
            library = libraryData[i];
            if (target[1] === library.city) {
                library.marker.setImage(customMarkerImage);
                bounds.extend(library.coords);
            } else {
                library.marker.setImage(defaultMarkerImage);
            }
        }
        map.setBounds(bounds);

        prevPage = 1;
    });

    $(document).on("click", ".library", function (event) {
        console.log(1);
        $(".library").css("display", "none");
        $(".city-name").css("display", "none");

        var msg = $(this).children("p").first().text();
        changeListHeader(msg);

        $(".icon-back").css("display", "block");

        var hiddenValue = $(this).css("display", "block").children().last().css("display", "block").children().last();
        var target = parseInt(hiddenValue.val());

        var bounds = new daum.maps.LatLngBounds(), library;
        for (var i = 0; i < libraryData.length; i++) {
            library = libraryData[i];
            if (target !== library.id) {
                library.marker.setImage(defaultMarkerImage);
            } else {
                library.marker.setImage(customMarkerImage);
                bounds.extend(library.coords);
            }
        }
        map.setBounds(bounds);
        prevPage = 2;
    });
});