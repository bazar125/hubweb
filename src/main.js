// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-awesome/icons';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Icon from 'vue-awesome/components/Icon';

import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import VuetablePaginationDropdown from 'vuetable-2/src/components/VuetablePaginationDropdown';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';

import Vue from 'vue';
import App from './App';
import router from './router';

Vue.use(BootstrapVue);
Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination);
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown);
Vue.component('vuetable-pagination-info', VuetablePaginationInfo);
Vue.component('icon', Icon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
