<template>
  <dark-card title="Notifications" class="current-notification-card">
    <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1; width: 100%; overflow-y: auto;">
      <b-list-group class="users-list">
        <b-list-group-item @click.native="$router.push('/notifications')" class="user-list-item d-flex justify-content-start align-items-center" v-for="(notification, index) in notifications" :key="notification.$id">
          <!-- <img class="img-avatar" :src="user.image"></img> -->
          <img class="icon-item" src="../assets/user_placeholder.jpg"></icon>
          <div class="content-container d-flex flex-column justify-content-center align-items-start">
            <!-- <textarea rows="2" disabled v-model="notification.description" class="txt-description"></textarea> -->
            <div class="txt-description">{{notification.description}}</div>
            <span class="txt-zone">{{getTimeAgo(notification.timestamp)}}</span>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </dark-card>
</template>

<script>
import * as moment from 'moment';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

export default {
  name: 'CurrentNotificationCard',
  props: ['notifications'],
  components: {
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    clickUser(user) {
      console.log(user);
    },
    userIsOnline(user) {
      const now = moment();
      const then = moment(user.timestamp);
      const diff = now.diff(then, 'minutes');
      return diff < 10;
    },
    getTimeAgo(timestamp) {
      if (!timestamp) {
        return '';
      }
      return moment(timestamp).fromNow();
    },
  },
};
</script>

<style scoped>
.current-notification-card {
}

.input-search {
  /* border-color: #8f90a8; */
  /* width: 300px; */
  width: 100%;
  border-radius: 14px;
  background-color: transparent;
  /* color: white; */
}

.input-search:focus {
  border-color: #5cb3fd;
}

.btn-invite {
  margin-left: 10px;
  height: 27.5px !important;
  padding: 3px !important;
  padding: 0px 8px !important;
}

.users-list {
  width: 100%;
  flex: 1;
  /* overflow-y: auto; */
}

.user-list-item {
  position: relative;
  overflow: hidden;
  height: 50px;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  /* padding: 0.5rem 0.5rem; */
  padding: 0.25rem 0.25rem;
  cursor: pointer;
}

.user-list-item:hover {
  background-color: #ececec;
}

.user-list-item.active {
  background-color: #1c2c81;
}

.user-list-item:not(:last-child) {
  margin-bottom: 10px;
}

.icon-item {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: 5px;
  border-radius: 15px;
  pointer-events: none;
}

.txt-description {
  pointer-events: none;
  width: 100%;
  background: transparent;
  color: rgba(0,0,0,0.87);
  box-shadow: none;
  text-align: start;
  /* text-transform: uppercase; */
  font-size: 9px;
  font-weight: 600;
  border: none;
  outline: none;
  resize: none;
  cursor: pointer;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
  /* overflow: hidden; */
}

.txt-zone {
  text-align: start;
  font-size: 8px;
}

.txt-timeago {
  position: absolute;
  bottom: 4px;
  right: 6px;
  font-size: 7px;
  margin-top: 2px;
  /* color: rgba(255, 255, 255, 0.7); */
  color: rgba(0, 0, 0, 0.87);
}

.btn-view {
  height: 20px !important;
  width: 20px !important;
  padding: 0px !important;
  /* color: #26B630 !important; */
  /* color: white !important; */
  color: rgba(0, 0, 0, 0.87) !important;
  border: 1px solid white;
}

.btn-view:last-child {
  margin-left: 5px;
}

.btn-view:hover {
  background-color: transparent !important;
  border: 1px solid rgba(0, 0, 0, 0.54) !important;
}

.content-container {
  flex: 1;
}
</style>
