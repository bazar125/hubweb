<template>
  <div id="app">
    <navbar v-if="showNavigation"></navbar>
    <div class="app-root-container d-flex">
      <sidenav v-if="showNavigation"></sidenav>
      <router-view></router-view>
    </div>
    <slick-footer v-if="showNavigation"></slick-footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import SlickFooter from '@/components/SlickFooter';
import Sidenav from '@/components/Sidenav';

import * as Firebase from 'firebase';

export default {
  name: 'app',
  components: {
    Navbar,
    SlickFooter,
    Sidenav,
  },
  data() {
    return {
      showNavigation: true,
    };
  },
  created() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Hiding app navigation');
        this.showNavigation = true;
        // this.$router.push('/');
      } else {
        console.log('Showing app navigation');
        this.showNavigation = false;
      }
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600');

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
  height: calc(100vh - 107px);
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
</style>
