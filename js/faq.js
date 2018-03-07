
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

function renderByJsonUrl(url) {
    
    getJSON(url, function(err, data) {
        if (err !== null) {
        } else {
            for (var item in data) {
                console.log(item);
            }
        }
    });
}

renderByJsonUrl(jsonUrl);
