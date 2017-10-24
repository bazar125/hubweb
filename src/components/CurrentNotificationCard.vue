<template>
  <dark-card title="Notifications" class="current-notification-card">
    <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1; width: 100%; overflow: hidden;">
      <b-tabs class="chat-user-tabs d-flex flex-column justify-content-start align-items-start">
          <b-tab class="custom-tab" title="FEED" active>
              <div style="max-height: 80px; width: 100%; overflow-y: auto;">
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
            </ul>
          </b-tab>
          <b-tab class="custom-tab" v-if="userIsAdmin" title="NEW" >
             <div class="d-flex flex-column justify-content-start align-items-start">
              <!-- <span class="txt-label">Description</span> -->
              <textarea class="form-control input-description" v-model="description" placeholder="Provide a description" rows="2"></textarea>
              <!-- <span class="txt-label">Location</span> -->
              <b-form-input class="input-form" v-model="location" size="sm" type="text" placeholder="Location"></b-form-input>
              <!-- <b-form-input class="input-form" v-model="expires" size="sm" type="text" placeholder="Expires"></b-form-input> -->
              <!-- <span class="txt-label">Expiry (Optional)</span> -->
              <!-- <date-picker class="input-form" v-model="expires" :config="config"></date-picker> -->
              <base-btn @click="clickCreate" :class="{disabled: !createEnabled}" class="mx-auto btn-invite" text="Send" icon="plus"></base-btn>
            </div>
          </b-tab>
        </b-tabs>
    </div>
  </dark-card>
</template>

<script>
import * as moment from 'moment';
import * as Firebase from 'firebase';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import UserService from '@/services/UserService';

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
      currentUser: null,
      description: '',
      location: '',
      expires: '',
    };
  },
  computed: {
    userIsAdmin() {
      if (!this.currentUser) {
        return false;
      }

      if (this.currentUser.accountType === 'stateAdmin') {
        return true;
      }

      return false;
    },
    createEnabled() {
      if (!this.currentUser || !this.description) {
        return false;
      }

      return true;
    },
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
    clickCreate() {
      const coords = {
        lat: 10.5059,
        lng: 7.4319,
      };

      const expiryTimestamp = moment()
        .add(72, 'hours')
        .valueOf();
      const notification = {
        coords,
        location: this.location,
        description: this.description,
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
        expiryTimestamp,
        senderId: this.currentUser.$id,
        senderName: `${this.currentUser.firstName} ${this.currentUser
          .lastName}`,
        senderImage: this.currentUser.image,
      };

      const ref = Firebase.database().ref();
      ref.child('globalNotifications').push(notification);
      this.location = '';
      this.description = '';
    },
  },
  mounted() {
    UserService.loadUser().then(user => {
      this.currentUser = user;
    });
  },
};
</script>

<style scoped>
.current-notification-card {
}

.chat-user-tabs {
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.custom-tab {
  flex: 1;
  width: 100%;
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

/* .btn-invite {
  margin-left: 10px;
  height: 27.5px !important;
  padding: 3px !important;
  padding: 0px 8px !important;
} */

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
  /* padding: 0.125rem 0.125rem; */
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
  color: rgba(0, 0, 0, 0.87);
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

.chat-user-tabs>>>div {
  width: 100%;
}

.chat-user-tabs>>>.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.chat-user-tabs>>>.tab-content {
  overflow-y: auto;
}

.chat-user-tabs>>>.nav .nav-link {
  font-size: 10px;
  /* border-bottom-color: #8f90a8; */
  border-bottom-color: #eceeef;
  border-radius: 0px;
  color: rgba(0, 0, 0, 0.7);
}

.chat-user-tabs>>>.nav .nav-item:first-child .nav-link {
  border-top-left-radius: 4px;
}

.chat-user-tabs>>>.nav .nav-item:last-child .nav-link {
  border-top-right-radius: 4px;
}

.chat-user-tabs>>>.nav .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.34);
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}

.chat-user-tabs>>>.nav .nav-link.active {
  color: white;
  background-color: #0275d8;
  border-top-color: #0275d8;
  border-bottom-color: #0275d8;
  border-left-color: #0275d8;
  border-right-color: #0275d8;
}

.chat-user-tabs>>>.nav > * {
  flex: 1;
}

.chat-user-tabs>>>.nav-tabs {
  border-bottom: 1px solid #eceeef;
  margin-bottom: 10px;
}

.input-email {
  /* border-color: #8f90a8; */
  width: 300px;
  border-radius: 14px;
  background-color: transparent;
  /* color: white; */
  /* color: rgba(0,0,0,0.87); */
}

.input-email:focus {
  border-color: #5cb3fd;
}

.btn-invite.disabled {
  background-color: darkgray !important;
  border-color: darkgray !important;
  color: rgba(0, 0, 0, 0.54) !important;
  cursor: default;
}
.btn-invite:hover.disabled {
  background-color: darkgray !important;
  border-color: darkgray !important;
  color: rgba(0, 0, 0, 0.54) !important;
  cursor: default;
}

.btn-invite {
  margin-left: 10px;
  height: 27.5px !important;
  padding: 3px !important;
  padding: 0px 8px !important;
  background-color: #63a54b !important;
  border-color: #63a54b !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.btn-invite:hover {
  background-color: #83bd6e !important;
  border-color: #83bd6e !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.btn-invite.disabled>>>.btn-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}

.btn-invite:hover.disabled>>>.btn-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}

.input-description {
  margin-bottom: 10px;
  font-size: 12px;
}

.input-form {
  margin-bottom: 10px;
  /* width: 250px; */
  font-size: 11px;
}
.txt-label {
  font-weight: 600;
  font-size: 10px;
  margin-bottom: 5px;
}
</style>
