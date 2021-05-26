/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Toasted from 'vue-toasted';

import store from './store';
import router from './router';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css';
// eslint-disable-next-line import/extensions
import '@fortawesome/fontawesome-free/js/all.js';

// Tell Vue to install the plugin.

Vue.config.productionTip = false;

// Init plugin
Vue.use(BootstrapVue);
Vue.use(Toasted, { duration: 10000 });
new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app');
