
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

function textToSubTitleText(text) {
    return "<h3>" + text + "</h3>";
}

function textToPlainText(text) {
    return "<p>" + text + "</p>"
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
    getJSON(url, function(err, data) {
        if (err !== null) {
        } else {
            for (var item in data) {
                
                divLinkContent.innerHTML += textToTitleText(data[item].name);

                var linkText = "<ul>"

                if (data[item].type == "link") {
                    data[item].lists.forEach(function(item, index) {
                        linkText += getLinkText(item.name, item.link);
                    });
                } else if (data[item].type == "move") {
                    
                    divContent.innerHTML += "<br /><hr><br />";
                    divContent.innerHTML += textToTitleText(data[item].name);
                    divContent.innerHTML += textToPlainText(data[item].description);
                    divContent.innerHTML += "<br />";
                    var linkId = data[item].linkId;
                    data[item].lists.forEach(function(item, index) {
                        
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

renderByJsonUrl(jsonUrl);
