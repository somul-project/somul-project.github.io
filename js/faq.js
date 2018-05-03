var divLinkContent = document.getElementById("link-content");
var divContent = document.getElementById("faq-content");

var jsonUrl = "https://raw.githubusercontent.com/somul-project/somul-project.github.io/master/web-inf/faq-new.json";

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function textToSmallTitle(num, text) {
    var k =
        '<div class="faq-small-title">' +
        '<div class="faq-samll-tile-img">' +
        '<img style="width: 33px; height: 63px; margin: 16px 21px 16px 101px;" src="./resources/faq-bottom-' + num + '.png">' +
        '</div>' +
        '<div class="faq-small-title-text">' +
        '<div class="vcenter">' +
        '<h2 class="faq-h2t">' + text + '</h2>' +
        '</div>' +
        '</div>' +
        '</div>'
    return k;

}

function textToTitleText(text) {
    return "<h2 class='faq-h2'>" + text + "</h2>";
}

function textToSubTitleText(text) {
    return "<h3 class='faq-h3'>" + text + "</h3>";
}

function textToPlainText(text) {
    return "<p class='faq-p'>" + text + "</p>"
}

function prefixAppendIndex(text, index) {
    return index + ". " + text;
}

function prefixAppendLinkIdAndIndex(text, linkId, index) {
    return '<div id="' + linkId + (index + 1) + '" style="position:relative;top:-20px;visibility:hidden"></div>'
        + textToSubTitleText(linkId + "." + (index + 1) + " " + text);
}


function getLinkText(name, link) {
    return "<li><a href=\"" + link + "\">" + name + "</a></li>";
}

function getMoveText(name, linkId, index) {
    return "<li><a href=\"#" + linkId + (index + 1) + "\">" + (index + 1) + ". " + name + "</a></li>";
}

function renderByJsonUrl(url) {
    var imageNum = 0;
    getJSON(url, function (err, data) {
        if (err !== null) {
        } else {
            for (var item in data) {
                imageNum++;
                divLinkContent.innerHTML += textToSmallTitle(imageNum, data[item].name);

                var linkText = "<ul>"

                if (data[item].type == "link") {
                    data[item].lists.forEach(function (item, index) {
                        linkText += getLinkText(item.name, item.link);
                    });
                } else if (data[item].type == "move") {

                    divContent.innerHTML += "<br /><br />";
                    divContent.innerHTML += textToTitleText(data[item].name);
                    divContent.innerHTML += textToPlainText(data[item].description);
                    var linkId = data[item].linkId;
                    data[item].lists.forEach(function (item, index) {

                        linkText += getMoveText(item.name, linkId, index);

                        divContent.innerHTML += prefixAppendLinkIdAndIndex(item.name, linkId, index);
                        divContent.innerHTML += textToPlainText(item.content);
                    });
                }

                linkText += "</ul>";
                divLinkContent.innerHTML += linkText
            }
        }
    });
}

$(document).ready(function () {
    renderByJsonUrl(jsonUrl);
});
