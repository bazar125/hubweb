<template>
  <dark-card title="Account Settings" class="settings-card">
    <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1; width: 100%;">
      Stuff here
    </div>
  </dark-card>
</template>

<script>
// import * as Firebase from 'firebase';
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
  methods: {},
};
</script>

<style scoped>
.settings-card {
}
</style>
