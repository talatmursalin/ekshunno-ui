/* eslint-disable operator-linebreak */
/* eslint-disable eol-last */
/* eslint-disable indent */

import request from '@/request';

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
            return request.post('/api/v1/code/submit', credentials)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    throw Error('submit failed');
                })
                .then((data) => data.submissionRoom);
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