<template>
  <div class="custom-navbar d-flex justify-content-start align-items-center">
    <img class="logo" src="../assets/kastelea_logo.png"></img>
    <span class="title-text">Kaduna State Traffic and Environmental Enforcement Agency</span>
    <!-- <img class="ml-auto img-avatar" src="../assets/user_placeholder.jpg"></img> -->
    <img class="ml-auto img-avatar" src="../assets/user_avatar.jpg"></img>
    <b-button @click="logout()" size="sm" class="btn-login">
      Log Out
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
  background-color: #8992C6;
  color: white;
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
  font-size: 25px;
  font-weight: 300;
}

.btn-login {
  background-color: #DF90B8;
  border-color: #DF90B8;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  width: 90px;
  padding: 6px 0px;
  cursor: pointer;
  transition: 0.4s;
}

.btn-login:hover {
  background-color: #d4689f;
  border-color: #d4689f;
  transition: 0.4s;
}

.img-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
}
</style>
