/* eslint-disable eol-last */
/* eslint-disable indent */

export default {
    defaults: {
        headers: {
            'content-type': 'application/json',
            Authorization: null,
        },
        httpProtocol: 'http://',
        wsProtocol: 'ws://',
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
    websocket(url) {
        console.log('get websocket');
        const wsendpoint = 'localhost:8000';
        const ws = new WebSocket(this.wsProtocol + wsendpoint + url);
        console.log(this.wsProtocol + wsendpoint + this.url);
        return ws;
    },
};