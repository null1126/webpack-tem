import { createRouter, createWebHistory } from 'vue-router';

const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/home/index.vue')
        },
        {
            path: '/news',
            name: 'News',
            component: () => import('@/pages/news/index.vue')
        }
    ]
})

export default router;
