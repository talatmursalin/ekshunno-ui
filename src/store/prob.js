/* eslint-disable operator-linebreak */
/* eslint-disable eol-last */
/* eslint-disable indent */

import request from '@/request';

function createPromise(executor) {
    let callback;

    function resolve(resolution, arg) {
        Promise.resolve().then(() => {
            callback[resolution](arg);
        });
    }
    try {
        executor(resolve.bind(null, 'fulfill'), resolve.bind(null, 'reject'));
    } catch (e) {
        resolve('reject', e);
    }
    return Promise.resolve({
        then(fulfill, reject) {
            callback = { fulfill, reject };
        },
    });
}

export default {
    state: {
        problem: null,
    },

    getters: {

    },

    mutations: {

    },

    actions: {
        postCode(_, credentials) {
            return request.post('/api/v1/execute', credentials)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 'OK') {
                        return data.uuid;
                    }
                    throw Error('submit failed');
                });
        },
        startPolling(_, uuid) {
            return createPromise((resolve, reject) => {
                let pollCnt = 0;
                const interval = setInterval(() => {
                    pollCnt += 1;
                    // console.log(`check cnt: ${pollCnt}`);
                    if (pollCnt > 15) {
                        clearInterval(interval);
                        reject('Submit Timed Out. Please Try Again.');
                    }
                    request.get(`/api/v1/result/${uuid}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (Object.keys(data).length > 0) {
                                clearInterval(interval);
                                resolve(data);
                            }
                        });
                }, 1000);
            });
        },
        getLanguages() {
            return request.get('/api/v1/languages')
                .then((response) => response.json())
                .then((languages) => {
                    if (languages.length > 0) {
                        return languages;
                    }
                    throw Error('No Supported Languages');
                });
        },
        getCompilers(_, langId) {
            return request.get(`/api/v1/compilers/${langId}`)
                .then((response) => response.json())
                .then((compilers) => {
                    if (compilers.length > 0) {
                        return compilers;
                    }
                    throw Error('No Supported Compilers Found');
                });
        },
        getPrecode(_, langId) {
            return request.get(`/api/v1/example/${langId}`)
                .then((response) => response.json())
                .then((precodeData) => {
                    if (precodeData.code) {
                        return precodeData;
                    }
                    throw Error(`Could not find precode for language: ${langId}`);
                });
        },
    },
};