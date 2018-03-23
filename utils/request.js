var request = require('request');

function Request() {
}

Request.prototype.r6dbAPI = function (url, method, form) {
    return new Promise(function (resolve, reject) {
        if (typeof method == 'undefined') {
            method = 'GET';
        }
        var options = {
            method: method.toUpperCase(),
            url: url,
            json: true,
            headers: {
                'x-api-id': '5e23d930-edd3-4240-b9a9-723c673fb649'
            }
        };

        if (typeof form !== 'undefined') {
            options.form = form;
        }
        request(options, function (error, response, json) {
            if (error) {
                reject(error);
                return;
            }

            if (response.statusCode !== 200) {
                var httpError = new Error('HTTP Code ' + response.statusCode);
                httpError.statusCode = response.statusCode;
                reject(httpError);
                return;
            }

            if (typeof json === 'undefined') {
                var jsonError = new Error('R6DB returned invalid json');
                reject(jsonError);
                return;
            }
            if (typeof json != 'object') {
                var jsonError = new Error('R6DB returned invalid json');
                reject(jsonError);
                return;
            }

            resolve(json);
        });
    });
};

module.exports = new Request();
