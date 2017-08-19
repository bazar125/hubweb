<template>
  <div class="custom-navbar d-flex justify-content-start align-items-center">
    <img class="logo" src="../assets/logo.jpg"></img>

    <router-link v-for="(link, index) in links" :key="link.path" :to="link.path" tag="div" :class="{'ml-auto': index == 0}" class="nav-button">
      {{link.name}}
    </router-link>

    <b-button size="sm" class="btn-login">
      Log Out
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {
  },
  data() {
    return {
      links: [
        {
          // path: 'drivers',
          path: '',
          name: 'Drivers',
        },
        {
          path: 'vehicles',
          name: 'Vehicles',
        },
        {
          path: 'reports',
          name: 'Reports',
        },
        {
          path: 'settings',
          name: 'Settings',
        },
        {
          path: 'contact',
          name: 'Contact',
        },
      ],
    };
  },
};
</script>

<style scoped>
.custom-navbar {
  background-color: #8992C6;
  color: white;
  height: 67px;
  padding: 10px 15px;
}

.logo {
  height: 100%;
  width: auto;
  padding-top: 2px;
  padding-bottom: 2px;
  user-select: none;
}

.nav-button {
  background-color: transparent;
  color: white;
  text-align: center;
  padding: 10px 20px  ; 
  font-size: 14px;
  user-select: none;
  cursor: pointer;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-button.router-link-active {
  background-color: rgba(255, 255, 255, 0.18);
  font-weight: 600;
}

.btn-login {
  background-color: #DF90B8;
  border-color: #DF90B8;
  color: white;
  border-radius: 0px;
  font-weight: 600;
  font-size: 13px;
  width: 90px;
  padding: 6px 0px;
  cursor: pointer;
  margin-left: 18px;
}

</style>
