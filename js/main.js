var clicked = 1;
var isAnimated = 0;

$("#menu-1").click(function () {
    changeScreen(1);
});

$("#menu-2").click(function () {
    changeScreen(2);
});

$("#menu-3").click(function () {
    changeScreen(3);
});

$("#menu-4").click(function () {
    changeScreen(4);
});

$("#footer-btn-youtube").click(function () {
    openInNewTab('http://bit.ly/somul-2-volunteers');
});

$("#footer-btn-facebook").click(function () {
    openInNewTab('https://www.facebook.com/groups/may.somul/');
});

$("#header-btn-volunteer").click(function () {
    openInNewTab('https://codeclubkorea.org');
});

function changeScreen(newClicked) {

    // change animation
    $("#menu-" + clicked).removeClass("selected");
    $("#menu-" + newClicked).addClass("selected");
    $("#circle-" + clicked).removeClass("selected");
    $("#circle-" + newClicked).addClass("selected");

    hideScreen(clicked);
    showScreen(newClicked);

    if (newClicked == 2) {
        generateMap();
        setBoundsMap(true);
    }
    clicked = newClicked;


}

function showScreen(i) {
    switch (i) {
        case 1:
            $("#content-main").removeClass("hide");
            $("#content-main").addClass("show");
            break;
        case 2:
            $("#content-library").removeClass("hide");
            $("#content-library").addClass("show");
            break;
        case 3:
            $("#content-donate").removeClass("hide");
            $("#content-donate").addClass("show");
            break;
        case 4:
            $("#content-faq").removeClass("hide");
            $("#content-faq").addClass("show");
            break;
    }
}

function hideScreen(i) {
    switch (i) {
        case 1:
            $("#content-main").removeClass("show");
            $("#content-main").addClass("hide");
            break;
        case 2:
            $("#content-library").removeClass("show");
            $("#content-library").addClass("hide");
            break;
        case 3:
            $("#content-donate").removeClass("show");
            $("#content-donate").addClass("hide");
            break;
        case 4:
            $("#content-faq").removeClass("show");
            $("#content-faq").addClass("hide");
            break;
    }
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}