
const app = document.getElementById("app");

// TODO: url must be changed when deploy main server
const jsonUrl = "https://raw.githubusercontent.com/clucle/somul-project.github.io/feature/md_to_html/web-inf/faq.json";

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
        callback(null, xhr.response);
    } else {
        allback(status, xhr.response);
    }
    };
    xhr.send();
};

function renderJson(url) {
    getJSON(url, function(err, data) {
        if (err !== null) {
            console.log("load json file : " + err);
        } else {
            console.log(data);
        }
    });

    app.innerHTML = "may be contents here";
}

renderJson(jsonUrl);