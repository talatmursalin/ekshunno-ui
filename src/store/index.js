/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue';
import Vuex from 'vuex';
import prob from './prob';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        message: {
            msg: null,
            type: '',
        },
        srcCode: '',
    },
    mutations: {
        SET_MSG(state, message) {
            state.message = message;
        },
        SET_SRC(state, src) {
            state.srcCode = src;
        },
    },
    getters: {
        message(state) {
            const msg = state.message;
            return msg;
        },
        srcCode(state) {
            const src = state.srcCode;
            return src;
        },
    },
    modules: {
        prob,
    },
});