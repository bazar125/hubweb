<template>
  <div class="login d-flex flex-column justify-content-center align-items-center">
    <video-bg class="custom-video-bg" :sources="[videoBg]" img="demo/assets/bg.jpg"></video-bg>
    <div class="bg-tint"></div>
    <img class="img-logo" src="../assets/motohub_logo.png"/>
    <div @keyup.enter="login()" class="login-card">
      <!-- <img class="img-logo" src="../assets/motohub_logo.png"/> -->
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
    </div>
    <div class="bottom-panel">

      <img class="logo-nigeria" src="../assets/seal_of_nigeria.png">
      <div class="bottom-disclaimer">
        <span class="text-disclaimer">This platform is regulated by the Federal Republic of Nigeria. All access is monitored.</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
import VideoBg from '../assets/videobg.mp4';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      error: '',
      videoBg: VideoBg,
    };
  },
  created() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Firebase.database()
          .ref(`/users/${user.uid}`)
          .once('value')
          .then(snap => {
            const actualUser = snap.val();
            actualUser.$id = snap.key;
            if (actualUser.active) {
              const updates = {};
              updates[`/users/${user.uid}/lastLogin`] =
                Firebase.database.ServerValue.TIMESTAMP;
              Firebase.database()
                .ref()
                .update(updates);

              this.$router.push('/');
            } else {
              Firebase.auth().signOut();
              this.error = 'The specified account has been disabled.';
            }
          })
          .catch(err => {
            if (err) {
              Firebase.auth().signOut();
              this.error = 'The specified account has been disabled.';
            }
          });
      }
    });
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        return;
      }

      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(error => {
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

.login-card {
  /* background-color: rgba(0,0,0,0.45); */
  /* background-color: #212121; */
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  /* background-color: #0d0f35; */
  background-color: #3b2c6f;
  border-radius: 10px;
  padding: 32px;
  width: 320px;
  z-index: 2000;
}

.bg-tint {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(103, 97, 221, 0.5);
}

.bottom-panel {
  position: absolute;
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  /* background-color: rgba(84, 14, 108, 0.7);   */
  background-color: #0f294a;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 1000;
}

.logo-nigeria {
  position: absolute;
  bottom: 45px;
  left: 50%;
  /* width/2*/
  margin-left: -50px;
  width: 100px;
  height: 100px;
  object-fit: contain;
  object-position: center;
}

.bottom-disclaimer {
  position: absolute;
  background-color: #170304;
  width: 100%;
  padding: 4px;
  bottom: 0;
  left: 0;
}

.text-disclaimer {
  font-size: 10px;
  font-weight: 700;
  color: white;
}

.btn-login {
  /* background-color: #3d4a8b;
  border-color: #3d4a8b; */
  background-color: #518ce8;
  border-color: #518ce8;
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
  background-color: #5f6aa7;
  border-color: #5f6aa7;
  transition: 0.2s;
}

.img-logo {
  top: 80px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  /* margin-bottom: 20px; */
  /* width: 350px; */
  width: 240px;
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
  top: 0;
  width: 100%;
  height: 100vh !important;
  /* opacity: 0.6; */
  z-index: -2;
}
</style>
