<template>
  <div id="app">
    <navbar v-if="showNavigation"></navbar>
    <div :class="{'hidden-navigation': !showNavigation}" class="app-root-container d-flex">
      <sidenav v-if="showNavigation"></sidenav>
      <router-view></router-view>
      <activity-stream v-if="showNavigation"></activity-stream>
    </div>
    <slick-footer v-if="showNavigation"></slick-footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import SlickFooter from '@/components/SlickFooter';
import Sidenav from '@/components/Sidenav';
import ActivityStream from '@/components/ActivityStream';

import * as Firebase from 'firebase';

export default {
  name: 'app',
  components: {
    Navbar,
    SlickFooter,
    Sidenav,
    ActivityStream,
  },
  data() {
    return {
      showNavigation: true,
    };
  },
  created() {
    this.$root.$on('::hideNavigation', () => {
      console.log('app.vue ::hideNavigation');
      this.showNavigation = false;
    });

    this.$root.$on('::showNavigation', () => {
      console.log('app.vue ::showNavigation');
      this.showNavigation = true;
    });

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.showNavigation = true;
      } else {
        this.showNavigation = false;
      }
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,500,700');

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
  font-size: 12px;
}

.app-root-container {
  /* nav: 67px, footer: 40px */
  height: calc(100vh - 90px);
}

.form-control {
  font-family: 'Open Sans', sans-serif;
}

button,
input,
optgroup,
select,
textarea {
  font-family: 'Open Sans', sans-serif;
}

.hidden-navigation {
  height: 100% !important;
}
</style>
