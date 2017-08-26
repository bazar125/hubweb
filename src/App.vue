<template>
  <div id="app">
    <navbar></navbar>
    <div class="app-root-container d-flex">
      <sidenav></sidenav>
      <router-view></router-view>
    </div>
    <slick-footer></slick-footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import SlickFooter from '@/components/SlickFooter';
import Sidenav from '@/components/Sidenav';

export default {
  name: 'app',
  components: {
    Navbar,
    SlickFooter,
    Sidenav,
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

button, input, optgroup, select, textarea {
  font-family: 'Open Sans', sans-serif;
}
</style>
