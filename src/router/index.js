/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '@/components/Layout/AppLayout.vue';
import ExecutePage from '@/pages/execute/NewExecutePage.vue';
import Error404 from '@/pages/errors/404.vue';
import AboutPage from '@/pages/about/AboutPage.vue';
import TestPage from '@/pages/test/TestPage.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: AppLayout,
        children: [{
            path: '/',
            name: 'Execute',
            component: ExecutePage,
        }, {
            path: '/about',
            name: 'About',
            component: AboutPage,
        }, {
            path: '/test',
            name: 'Test',
            component: TestPage,
        },
        {
            path: '*',
            component: Error404,
        }],
    }],
});