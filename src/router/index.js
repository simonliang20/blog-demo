import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


const routes = [
    {
        path: '/demo1',
        name: 'demo1',
        component: resolve => require(['../pages/demo1'], resolve),
        meta: {
            title: 'demo1',
        },
    },
    {
        path: '/demo2',
        name: 'demo2',
        component: resolve => require(['../pages/demo2'], resolve),
        meta: {
            title: 'demo2',
        },
    },
]

const router = new VueRouter({
    routes
})

export default router;