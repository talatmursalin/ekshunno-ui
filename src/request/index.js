/* eslint-disable eol-last */
/* eslint-disable indent */

export default {
    defaults: {
        headers: {
            'content-type': 'application/json',
            Authorization: null,
        },
        endpoint: '', // 'http://localhost:8000',
    },
    get(url) {
        return fetch(this.defaults.endpoint + url, {
            method: 'GET',
            headers: this.defaults.headers,
        });
    },
    post(url, payload = {}) {
        return fetch(this.defaults.endpoint + url, {
            method: 'POST',
            headers: this.defaults.headers,
            body: JSON.stringify(payload),
        });
    },
};