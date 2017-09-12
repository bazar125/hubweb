import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/components/Landing';
import Citations from '@/components/Citations';
import Database from '@/components/Database';
import Login from '@/components/Login';
import Overview from '@/components/Overview';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Overview,
      meta: { requiresAuth: true },
    },
    {
      path: '/personnel',
      name: 'Personnel',
      component: Landing,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/database',
      name: 'Database',
      component: Database,
      meta: { requiresAuth: true },
    },
    {
      path: '/citations',
      name: 'Citations',
      component: Citations,
      meta: { requiresAuth: true },
    },
  ],
});
