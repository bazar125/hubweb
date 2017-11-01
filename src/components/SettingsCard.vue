<template>
  <dark-card title="Account Settings" class="settings-card">
    <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1; width: 100%;">
      <!-- avatar upload -->
      <base-btn @click="clickResetPassword()" class="ml-auto btn-view" icon="lock" text="Reset My Password"></base-btn>
    </div>
  </dark-card>
</template>

<script>
import * as Firebase from 'firebase';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

// import UserAvatar from '../assets/user_avatar.jpg';

export default {
  name: 'SettingsCard',
  components: {
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    
  },
  methods: {
    clickResetPassword() {
      const currentUser = Firebase.auth().currentUser;
      Firebase.auth().sendPasswordResetEmail(currentUser.email);
    },
  },
};
</script>

<style scoped>
.settings-card {
}

.btn-view {
  height: 30px !important;
  /* width: 30px !important; */
  margin-right: 10px;
  padding: 0px 10px !important;
  color: rgba(0, 0, 0, 0.84) !important;
  font-size: 8px;
}

.btn-view:hover {
  background-color: rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
}
</style>
