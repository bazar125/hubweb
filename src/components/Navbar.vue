<template>
  <div class="custom-navbar d-flex justify-content-start align-items-center">
    <img class="logo" src="../assets/kastelea_logo.png"></img>
    <!-- <span class="title-text">Kaduna State Traffic and Environmental Enforcement Agency</span> -->
    <span class="title-text">KADUNA STATE TRAFFIC AND ENVIRONMENTAL ENFORCEMENT AGENCY</span>
    <!-- <img class="ml-auto img-avatar" src="../assets/user_placeholder.jpg"></img> -->
    <b-button @click="notifications()" size="sm" class="ml-auto btn-notification">
      <icon name="bell-o"></icon>
      <b-badge class="custom-badge" pill variant="danger">1</b-badge>
    </b-button>
    <img class="img-avatar" src="../assets/user_avatar.jpg"></img>
    <b-button @click="logout()" size="sm" class="btn-login">
      LOG OUT
    </b-button>
  </div>
</template>

<script>
import * as Firebase from 'firebase';

export default {
  name: 'Navbar',
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    logout() {
      Firebase.auth().signOut().then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style scoped>
.custom-navbar {
  /* background-color: #8992C6; */
  background-color: #2c2e4a;
  /* color: white; */
  color: #8f90a8;
  height: 67px;
  padding: 10px 15px;
  padding-left: 0px;
}

.logo {
  height: 100%;
  width: 150px;
  /* padding-top: 2px;
  padding-bottom: 2px; */
  user-select: none;
  object-fit: contain;
  object-position: center center;
}

.title-text {
  font-size: 14px;
  font-weight: 600;
}

.btn-notification {
  position: relative;
  background-color: transparent;
  /* border-color: #DF90B8; */
  border-color: #8f90a8;
  color: rgba(255, 255, 255, 0.84);
  /* border-radius: 4px; */
  border-radius: 20px;
  font-weight: 600;
  font-size: 11px;
  width: 40px;
  height: 40px;
  padding: 6px 0px;
  cursor: pointer;
  transition: ease-out 0.2s;
  margin-right: 10px;
}

.btn-notification:hover {
  background-color: #8f90a8;
  border-color: #8f90a8;
  transition: ease-out 0.2s;
}

.btn-notification:active {
  background-color: #585e8c;
  border-color: #585e8c;
  transition: ease-out 0.2s;
}

.custom-badge {
  position: absolute;
  top: 4px;
  right: 4px;
}

.btn-login {
  /* background-color: #DF90B8; */
  /* background-color: #2c3f92; */
  background-color: transparent;
  /* border-color: #DF90B8; */
  /* border-color: #2c3f92; */
  border-color: #8f90a8;
  color: rgba(255,255,255,0.84);
  /* border-radius: 4px; */
  border-radius: 45px;
  font-weight: 600;
  font-size: 11px;
  width: 90px;
  padding: 6px 0px;
  cursor: pointer;
  transition: ease-out 0.2s;
}

.btn-login:hover {
  /* background-color: #d4689f; */
  background-color: #797a97;
  border-color: #797a97;
  transition: ease-out 0.2s;
}

.img-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
}
</style>
