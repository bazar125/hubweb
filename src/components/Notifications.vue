<template>
  <div class="notifications d-flex flex-column justify-content-start align-items-center">
    <notification-card :notificationId="notificationId"></notification-card>
    <!-- <span class="txt-heading mr-auto">Manage Users</span> -->
  </div>
</template>

<script>
import NotificationCard from '@/components/NotificationCard';

export default {
  name: 'Notifications',
  components: {
    NotificationCard,
  },
  computed: {
    notificationId() {
      return this.$route.params && this.$route.params.notificationId
        ? this.$route.params.notificationId
        : '';
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.notifications {
  width: calc(100% - 350px);
  /* background-color: #2c2e4a; */
  background-color: #ececec;
  padding: 8px;
  padding-right: 0px;
  overflow: hidden;
}

.notifications>>>.notification-card {
  width: 100%;
}
</style>