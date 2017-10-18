<template>
  <div class="manage-users d-flex flex-column justify-content-start align-items-center">
    <invite-users-card></invite-users-card>
    <!-- <span class="txt-heading mr-auto">Manage Users</span> -->
  </div>
</template>

<script>
import InviteUsersCard from '@/components/InviteUsersCard';

export default {
  name: 'ManageUsers',
  components: {
    InviteUsersCard,
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