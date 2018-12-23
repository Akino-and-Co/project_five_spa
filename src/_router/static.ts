// standard default view
import DefaultLayout from '../layouts/Default.vue';

// components that are static
import Home from '../views/Home.vue';
import About from '../views/About.vue';

export default [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
            path: '',
            name: 'home',
            component: Home,
            },
            {
            path: '/about',
            name: 'about',
            component: About,
            },
        ],
    },
];
