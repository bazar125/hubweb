<template>
  <div class="custom-sidenav d-flex flex-column justify-content-start align-items-center">
    <router-link v-for="(link, index) in links" :key="link.path" :to="link.path" v-show="showForRole(link)" tag="div" class="nav-button">
      <div class="d-flex justify-content-start align-items-center">
        <!-- <img class="nav-icon" :src="link.icon"></img> -->
        <icon class="nav-icon" :name="link.icon"></icon>
        <span>{{link.name}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
// import IconOverview from '../assets/overview_icon.png';
// import IconDrivers from '../assets/drivers_icon.png';
// import IconVehicles from '../assets/vehicles_icon.png';
// // import IconCitations from '../assets/citations_icon.png';
// import IconPersonnel from '../assets/personnel_icon.png';
// import IconSettings from '../assets/settings_icon.png';

export default {
  name: 'Sidenav',
  components: {
    currentUser: {},
  },
  data() {
    return {
      links: [
        {
          // path: 'drivers',
          path: '/',
          name: 'Base',
          // icon: IconOverview,
          icon: 'home',
        },
        {
          path: '/drivers',
          name: 'Drivers',
          // icon: IconDrivers,
          icon: 'id-card',
        },
        {
          path: '/vehicles',
          name: 'Vehicles',
          // icon: IconVehicles,
          icon: 'car',
        },
        {
          path: '/citations',
          name: 'Citations',
          // icon: IconCitations,
          icon: 'book',
        },
        {
          path: '/collisions',
          name: 'Collisions',
          // icon: IconCitations,
          icon: 'fire',
        },
        // {
        //   path: '/personnel',
        //   name: 'Personnel',
        //   // icon: IconPersonnel,
        //   icon: 'users',
        // },
        {
          path: '/chat',
          name: 'Messages',
          // icon: IconSettings,
          icon: 'comments',
          role: 'stateAdmin',
        },
        {
          path: '/notifications',
          name: 'Alerts',
          // icon: IconSettings,
          icon: 'bell',
          role: 'stateAdmin',
        },
        // {
        //   path: '/reports',
        //   name: 'Reports',
        //   // icon: IconCitations,
        //   icon: 'bar-chart',
        // },
        {
          path: '/manage',
          name: 'Admin',
          // icon: IconSettings,
          icon: 'user-plus',
          role: 'stateAdmin',
        },
        // {
        //   path: '/settings',
        //   name: 'Settings',
        //   // icon: IconSettings,
        //   icon: 'cog',
        // },
      ],
    };
  },
  methods: {
    showForRole(link) {
      console.log(`${link.role} => ${this.currentUser}`);
      if (!link.role) {
        return true;
      }

      if (!this.currentUser || !this.currentUser.accountType) {
        return false;
      }

      return link.role === this.currentUser.accountType;
    },
  },
  mounted() {
    const ref = Firebase.database().ref();
    const uid = Firebase.auth().currentUser.uid;
    ref.child(`users/${uid}`).once('value', (snap) => {
      const val = snap.val();
      this.currentUser = val;
      this.$forceUpdate();
    });
  },
};
</script>

<style scoped>
.custom-sidenav {
  background-color: white;
  /* background-color: #3A3E5C; */
  /* background-color: #191970; */
  /* background-color: #4a59ad; */
  width: 150px;
  min-width: 150px;
  z-index: 999;
  /* box-shadow: 10px 0 2px -2px rgba(0,0,0,0.1);
  box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000; */
  box-shadow: 4px 0px 8px -2px rgba(0, 0, 0, 0.1);
}

.nav-button {
  background-color: transparent;
  width: 120px;
  color: rgba(0, 0, 0, 0.87);
  /* color: rgb(137,146,198, 0.8); */
  /* color: rgb(255, 255, 255, 0.5); */
  /* color: rgba(197, 234, 142, 0.5); */
  text-align: center;
  padding: 8px 10px;
  font-size: 11px;
  /* font-weight: 600; */
  user-select: none;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  text-transform: uppercase;
  transition: ease-out 0.2s;
}

.nav-button:first-child {
  margin-top: 10px;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  /* color: rgba(137, 146, 198, 0.1); */
  /* color: rgba(255, 255, 255, 0.84); */
  /* color: rgba(197, 234, 142, 0.5); */
  color: rgb(137,146,198);
  transition: ease-out 0.2s;
}

.nav-button.router-link-exact-active {
  border: 1px solid #8992C6;
  color: #8992C6;
  font-weight: 700;
  font-size: 11px;
  transition: ease-out 0.2s;
}

.nav-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  object-fit: cover;
  object-position: center center;
}

.nav-button.router-link-exact-active .nav-icon {
  color: #8992C6;
}
</style>
