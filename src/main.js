// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'vue-awesome/icons';
import 'jsoneditor/dist/jsoneditor.min.css';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Icon from 'vue-awesome/components/Icon';
import VideoBg from 'vue-videobg';
import VueResource from 'vue-resource';
import Viewer from 'v-viewer';
import VueChatScroll from 'vue-chat-scroll';
import DatePicker from 'vue-bootstrap-datetimepicker';
import VueCarousel from 'vue-carousel';

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
Vue.use(VueResource);
Vue.use(Viewer);
Vue.use(VueChatScroll);
Vue.use(DatePicker);
Vue.use(VueCarousel);
Vue.component('icon', Icon);
Vue.component('video-bg', VideoBg);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Firebase.auth().currentUser) {
      next({
        path: '/login',
        // query: {
        //   redirect: to.fullPath,
        // },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

const unsubscribe = Firebase.initializeApp(config)
  .auth()
  .onAuthStateChanged(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
    });

    unsubscribe();
  });
