import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/components/Landing';
import Citations from '@/components/Citations';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/citations',
      name: 'Citations',
      component: Citations,
      meta: { requiresAuth: true },
    },
  ],
});
