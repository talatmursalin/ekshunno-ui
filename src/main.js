/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue';
import 'bootstrap';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
/* import specific icons */
import {
     faPlay, faFileImport, faSliders, faArrowRotateRight, faChevronDown, faTimes,
} from '@fortawesome/free-solid-svg-icons';

import store from './store';
import router from './router';
import App from './App.vue';

/* add icons to the library */
library.add(faPlay, faFileImport, faSliders, faArrowRotateRight, faChevronDown, faTimes);

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app');
