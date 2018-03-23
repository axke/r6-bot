var request = require('request');

function Request() {
}

Request.prototype.r6dbAPI = (url, method, form) => {
    return new Promise((resolve, reject) => {
        if (typeof method == 'undefined') {
            method = 'GET';
        }
        let options = {
            method: method.toUpperCase(),
            url: url,
            json: true,
            headers: {
                'x-app-id': 'dae303fc-e344-4dfc-99e0-5ed87801e730',
                'Content-Type': 'application/json'
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
                let httpError = new Error('HTTP Code ' + response.statusCode);
                httpError.statusCode = response.statusCode;
                reject(httpError);
                return;
            }

            if (typeof json === 'undefined') {
                let jsonError = new Error('R6DB returned invalid json');
                reject(jsonError);
                return;
            }
            if (typeof json != 'object') {
                let jsonError = new Error('R6DB returned invalid json');
                reject(jsonError);
                return;
            }

            resolve(json);
        });
    });
};

module.exports = new Request();
