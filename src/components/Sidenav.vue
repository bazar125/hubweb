<template>
  <div class="custom-sidenav d-flex flex-column justify-content-start align-items-center">
    <router-link v-for="(link, index) in links" :key="link.path" :to="link.path" tag="div" class="nav-button">
      {{link.name}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
  components: {
  },
  data() {
    return {
      links: [
        {
          // path: 'drivers',
          path: '/',
          name: 'Overview',
        },
        {
          path: '/database',
          name: 'Database',
        },
        {
          path: '/citations',
          name: 'Citations',
        },
        {
          path: '/personnel',
          name: 'Personnel',
        },
        {
          path: '/settings',
          name: 'Settings',
        },
      ],
    };
  },
};
</script>

<style scoped>
.custom-sidenav {
  width: 150px;
  min-width: 150px;
  z-index: 99;
  /* box-shadow: 10px 0 2px -2px rgba(0,0,0,0.1);
  box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000; */
  box-shadow: 4px 0px 8px -2px rgba(0,0,0,0.1);
}

.nav-button {
  background-color: transparent;
  color: rgba(0,0,0,0.87);
  text-align: center;
  padding: 10px 20px  ; 
  font-size: 14px;
  user-select: none;
  cursor: pointer;
}

.nav-button:first-child {
  margin-top: 10px;
}

.nav-button:hover {
  /* background-color: rgba(255, 255, 255, 0.1); */
  background-color: rgba(223, 144, 184, 0.1);
}

.nav-button.router-link-exact-active {
  /* background-color: rgba(255, 255, 255, 0.18); */
  background-color: rgba(223, 144, 184, 0.38);
  font-weight: 600;
}

</style>
