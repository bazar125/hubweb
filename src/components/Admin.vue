<template>
  <div class="manage-users d-flex justify-content-start align-items-center">
    <div class="d-flex justify-content-start align-items-center" style="flex: 1; height: 100%; padding-right: 20px;">
      <invite-users-card></invite-users-card>
    </div>

    <div class="d-flex justify-content-start align-items-center" style="flex: 1; height: 100%;">
      <settings-card></settings-card>
    </div>
  </div>
</template>

<script>
import InviteUsersCard from '@/components/InviteUsersCard';
import SettingsCard from '@/components/SettingsCard';

export default {
  name: 'ManageUsers',
  components: {
    InviteUsersCard,
    SettingsCard,
  },
  data() {
    return {
      email: '',
    };
  },
};
</script>

<style scoped>
.manage-users {
  width: calc(100% - 150px);
  min-width: calc(100% - 150px);
  /* background-color: #2c2e4a; */
  background-color: #ececec;
  padding: 20px;
}
</style>