// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-awesome/icons';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Icon from 'vue-awesome/components/Icon';

// import Vuetable from 'vuetable-2/src/components/Vuetable';
// import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
// import VuetablePaginationDropdown from 'vuetable-2/src/components/VuetablePaginationDropdown';
// import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';

// import VuetablePaginationBootstrap from '@/components/VuetablePaginationBootstrap';

import DetailRow from '@/components/Vuetable/DetailRow';

import * as Firebase from 'firebase';

import Vue from 'vue';
import App from './App';
import router from './router';

const config = {
  apiKey: 'AIzaSyD5XSex8F-5VHZtQ8io0T9BFf8O3zg9yZg',
  authDomain: 'motohub-498b8.firebaseapp.com',
  databaseURL: 'https://motohub-498b8.firebaseio.com',
  projectId: 'motohub-498b8',
  storageBucket: 'motohub-498b8.appspot.com',
  messagingSenderId: '328926125851',
};

Vue.use(BootstrapVue);
// Vue.component('vuetable', Vuetable);
// // Vue.component('vuetable-pagination', VuetablePagination);
// Vue.component('vuetable-pagination', VuetablePaginationBootstrap);
// Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown);
// Vue.component('vuetable-pagination-info', VuetablePaginationInfo);
Vue.component('icon', Icon);

Vue.component('my-detail-row', DetailRow);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    console.log('redirecting to login');
    next('/login');
    // } else if (!requiresAuth && currentUser) {
  } else if (to.path === '/login' && currentUser) {
    next('/');
  } else {
    console.log('default fall-through');
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    Firebase.initializeApp(config);
    Firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/login');
      }
    });
  },
});
