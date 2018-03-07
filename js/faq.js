
var divLinkContent = document.getElementById("link-content");
var divContent     = document.getElementById("content");

// TODO: url must be changed when deploy main server
var jsonUrl = "https://raw.githubusercontent.com/clucle/somul-project.github.io/feature/md_to_html/web-inf/faq.json";

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function textToTitleText(text) {
    return "<h2>" + text + "</h2>";
}

function textToPlainText(text) {
    return "<p>" + text + "</p>"
}


function getLinkText(name, link) {
    return "<li><a href=\"" + link + "\">" + name + "</a></li>";
}

function renderByJsonUrl(url) {
    getJSON(url, function(err, data) {
        if (err !== null) {
        } else {
            for (var item in data) {
                
                divLinkContent.innerHTML += textToTitleText(data[item].name);

                if (data[item].type == "link") {
                    divLinkContent.innerHTML += "<ul>"
                    data[item].lists.forEach(function(item, index) {
                        divLinkContent.innerHTML += getLinkText(item.name, item.link);
                    });
                    divLinkContent.innerHTML += "</ul>"
                    
                } else if (data[item].type == "move") {

                }

            }
        }
    });
}

renderByJsonUrl(jsonUrl);
