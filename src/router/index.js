import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/components/Landing';
import Citations from '@/components/Citations';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/citations',
      name: 'Citations',
      component: Citations,
    },
  ],
});
