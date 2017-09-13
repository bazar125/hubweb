<template>
  <div class="login d-flex flex-column justify-content-center align-items-center">
    <video-bg class="custom-video-bg" :sources="[videoBg]" img="demo/assets/bg.jpg"></video-bg>
    <div class="login-card">
      <img class="img-logo" src="../assets/motohub_logo.png"></img>
      <form @submit="login()">
        <b-input-group>
          <b-form-input v-model="email" type="email" placeholder="Email"></b-form-input>
          <!-- Attach Right button -->
          <!-- <b-input-group-button slot="right">
                      <b-dropdown text="Dropdown" variant="success">
                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Action</b-dropdown-item>
                      </b-dropdown>
                    </b-input-group-button> -->
        </b-input-group>

        <b-input-group id="password">
          <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
        </b-input-group>

        <div class="error-container">
          <span class="error-text" v-if="error">{{error}}</span>
        </div>

        <b-button id="login" class="btn-login" @click="login()">
          Login
        </b-button>

        <input type="submit" style="display:none" />
      </form>
    </div>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
import VideoBg from '../assets/videobg.mp4';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      videoBg: VideoBg,
    };
  },
  created() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/');
      }
    });
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        return;
      }

      Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            this.error = 'Incorrect username or password';
          } else {
            this.error = errorMessage;
          }
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  position: relative;
}

#password {
  margin-top: 20px;
}

#login {
  margin-top: 10px;
}

.btn-login {
  background-color: #3D4A8B;
  border-color: #3D4A8B;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  width: 120px;
  padding: 6px 0px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-login:hover {
  background-color: #5F6AA7;
  transition: 0.2s;
}

.img-logo {
  margin-bottom: 20px;
  width: 350px;
  height: auto;
  object-fit: cover;
  object-position: center center;
}

.error-container {
  margin-top: 10px;
}

.error-text {
  font-weight: 500;
  font-size: 12px;
  color: #ef3135;
}

.custom-video-bg {
  position: absolute;
  width: 100%;
  height: 780px !important;
  opacity: 0.6;
  z-index: -2;
}
</style>
