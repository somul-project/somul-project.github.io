var divContent = $(".faq-content");
var divLink = $(".faq-Link");

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

function renderByJsonUrl(url) {
    var sectionNum = 0, liContent = "";
    getJSON(url, function (err, faq) {
        var content = "";
        if (err !== null) {
        } else {
            for (var item in faq) {
                if (item.type !== "move") {
                    content += "<ol>" +
                        "<h3>" + faq[item].name + "</h3>" +
                        "<blockquote class='blockquote'>" +
                        "<p class='mb-0'><small>" + faq[item].description + "</small></p>" +
                        "</blockquote>";
                    for (var i = 0; i < faq[item].lists.length; i++) {
                        liContent += "<a class='qna' href='#" + (sectionNum * 10) + i + "'><li>" + (i + 1) + ". " + faq[item].lists[i].name + "</li></a>";
                        content += "<a class='qna' name='" + (sectionNum * 10) + i + "'><strong><li>" + faq[item].lists[i].name + "</li></strong></a>";
                        content += "<p>" + faq[item].lists[i].content + "</p>";
                        console.log(faq[item].lists[i].name);
                    }
                    content += "</ol>";
                }

                divContent.append(
                    '<ul class="media-list">' +
                    '<li class="media">' +
                    '<div class="media-left">' +
                    '<img class="media-object" src="../resources/faq-bottom-' + ++sectionNum + '.png" alt="' + sectionNum + '">' +
                    '</div>' +
                    '<div class="media-body">' +
                    "<h3>" + faq[item].name + "</h3>" +
                    "<ul class='list-unstyled'>" +
                    liContent +
                    "</ul>" +
                    '</div>' +
                    '</li>' +
                    '</ul>'
                );

            }
            divContent.append(content);
        }
    });
}

$(document).ready(function () {
    renderByJsonUrl(jsonUrl);
});




