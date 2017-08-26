<template>
  <div class="custom-navbar d-flex justify-content-start align-items-center">
    <img class="logo" src="../assets/kastelea_logo.png"></img>
    <span class="title-text">Kaduna State Traffic and Environmental Enforcement Agency</span>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {
  },
  data() {
    return {
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
  padding-left: 0px;
}

.logo {
  /* height: 100%; */
  height: 60px;
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
</style>
