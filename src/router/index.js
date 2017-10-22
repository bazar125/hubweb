import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';

import Base from '@/components/Base';
import Drivers from '@/components/Drivers';
import Vehicles from '@/components/Vehicles';
import Citations from '@/components/Citations';
import Collisions from '@/components/Collisions';
import Personnel from '@/components/Personnel';
import Reports from '@/components/Reports';
import Admin from '@/components/Admin';
import Chat from '@/components/Chat';
import Settings from '@/components/Settings';
import ViewCitation from '@/components/ViewCitation';
import ViewCollision from '@/components/ViewCollision';
import ViewDriver from '@/components/ViewDriver';
import ViewVehicle from '@/components/ViewVehicle';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Base',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/drivers',
      name: 'Drivers',
      component: Drivers,
      meta: { requiresAuth: true },
    },
    {
      path: '/_driver/:id',
      name: 'ViewDriver',
      component: ViewDriver,
      meta: { requiresAuth: true },
    },
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: Vehicles,
      meta: { requiresAuth: true },
    },
    {
      path: '/_vehicle/:id',
      name: 'ViewVehicle',
      component: ViewVehicle,
      meta: { requiresAuth: true },
    },
    {
      path: '/citations',
      name: 'Citations',
      component: Citations,
      meta: { requiresAuth: true },
    },
    {
      path: '/_citation/:reference',
      name: 'ViewCitation',
      component: ViewCitation,
      meta: { requiresAuth: true },
    },
    {
      path: '/collisions',
      name: 'Collisions',
      component: Collisions,
      meta: { requiresAuth: true },
    },
    {
      path: '/_collision/:reference',
      name: 'ViewCollision',
      component: ViewCollision,
      meta: { requiresAuth: true },
    },
    {
      path: '/personnel',
      name: 'Personnel',
      component: Personnel,
      meta: { requiresAuth: true },
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      meta: { requiresAuth: true },
    },
    {
      path: '/manage',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true },
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: { requiresAuth: true },
    },
    {
      path: '/chat/:conversationId',
      name: 'Chat',
      component: Chat,
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
