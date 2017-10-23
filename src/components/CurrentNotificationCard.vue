<template>
  <dark-card title="Notifications" class="current-notification-card">
    <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1; width: 100%;">
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
      // console.log('clickUser');
      this.$root.$emit('map::centeronuser', user);
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
    startCullingOfflineUsers() {
      const cullingInterval = 4000; // ms
      const cullOfflineUsers = () => {
        // console.log('$forceUpdate');
        for (let i = 0; i < this.users.length; i += 1) {
          const user = this.users[i];
          if (!this.userIsOnline(user)) {
            const index = this.activeUsers.map(x => x.$id).indexOf(user.$id);
            this.activeUsers.splice(index, 1);
          }
        }
        // console.log(this.users);
        this.$forceUpdate();
        setTimeout(cullOfflineUsers, cullingInterval);
      };
      setTimeout(cullOfflineUsers);
    },
  },
  computed: {
    users() {
      // console.log('computed users');
      return this.activeUsers.slice().filter(x => this.userIsOnline(x));
    },
  },
  mounted() {
    this.startCullingOfflineUsers();
  },
};
</script>

<style scoped>
.current-notification-card {}

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
  margin-top: 10px;
  width: 100%;
  flex: 1;
}

.user-list-item {
  position: relative;
  /* background: transparent; */
  /* background-color: #2c2e4a; */
  /* background-color: #1C2C81; */
  /* border-color: rgba(255, 255, 255, 0.2); */
  /* color: white; */
  height: 50px;
  color: rgba(0, 0, 0, 0.87);
  /* border: 0px solid; */
  border-radius: 4px;
  /* padding: 0.75rem 1rem; */
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
}

.user-list-item:hover {
  background-color: #ececec;
}

.user-list-item.active {
  background-color: #1C2C81;
}

.user-list-item:not(:last-child) {
  margin-bottom: 10px;
}

.img-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
}

.txt-name {
  text-align: start;
  /* text-transform: uppercase; */
  font-size: 10px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.txt-zone {
  text-align: start;
  font-size: 9px;
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
</style>
