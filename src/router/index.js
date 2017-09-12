import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';

import Overview from '@/components/Overview';
import Drivers from '@/components/Drivers';
import Vehicles from '@/components/Vehicles';
import Citations from '@/components/Citations';
import Collisions from '@/components/Collisions';
import Personnel from '@/components/Personnel';
import Settings from '@/components/Settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: Overview,
      meta: { requiresAuth: true },
    },
    {
      path: '/drivers',
      name: 'Drivers',
      component: Drivers,
      meta: { requiresAuth: true },
    },
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: Vehicles,
      meta: { requiresAuth: true },
    },
    {
      path: '/citations',
      name: 'Citations',
      component: Citations,
      meta: { requiresAuth: true },
    },
    {
      path: '/collisions',
      name: 'Collisions',
      component: Collisions,
      meta: { requiresAuth: true },
    },
    {
      path: '/personnel',
      name: 'Personnel',
      component: Personnel,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
