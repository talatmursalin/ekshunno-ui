/* eslint-disable eol-last */
/* eslint-disable indent */

export default {
    defaults: {
        headers: {
            'content-type': 'application/json',
            Authorization: null,
        },
        endpoint: process.env.VUE_APP_API_ENDPOINT,
        socketEndPoint: process.env.VUE_APP_SOCKET_ENDPOINT,
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
