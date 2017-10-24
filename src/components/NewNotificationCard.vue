<template>
  <dark-card title="Create Notification" class="new-notification-card">
    <div class="d-flex flex-column justify-content-start align-items-start">
      <span class="txt-label">Description</span>
      <textarea class="form-control input-description" v-model="description" placeholder="Provide a description" rows="2"></textarea>
      <span class="txt-label">Location</span>
      <b-form-input class="input-form" v-model="location" size="sm" type="text" placeholder="Location"></b-form-input>
      <!-- <b-form-input class="input-form" v-model="expires" size="sm" type="text" placeholder="Expires"></b-form-input> -->
      <span class="txt-label">Expiry (Optional)</span>
      <date-picker class="input-form" v-model="expires" :config="config"></date-picker>
      <base-btn @click="clickCreate" :class="{disabled: !createEnabled}" class="mx-auto btn-invite" text="Send" icon="plus"></base-btn>
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
  name: 'NewNotificationCard',
  components: {
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      currentUser: null,
      description: '',
      location: '',
      expires: null,
      config: {
        format: 'YYYY-MM-DD',
        useCurrent: false,
        sideBySide: true,
      },
    };
  },
  mounted() {
    UserService.loadUser().then(user => {
      this.currentUser = user;
    });
  },
  computed: {
    createEnabled() {
      if (!this.currentUser || !this.description) {
        return false;
      }

      return true;
    },
  },
  methods: {
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
};
</script>

<style scoped>
.new-notification-card {
  /* width: 61.8%; */
  /* margin: 20px; */
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
  background-color: darkgray;
  color: rgba(0, 0, 0, 0.54) !important;
  cursor: default;
}
.btn-invite:hover.disabled {
  background-color: darkgray;
  color: rgba(0, 0, 0, 0.54) !important;
  cursor: default;
}

.btn-invite {
  margin-left: 10px;
  height: 27.5px !important;
  padding: 3px !important;
  padding: 0px 8px !important;
  color: rgba(0, 0, 0, 0.54) !important;
}

.btn-invite:hover {
  background-color: rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.84) !important;
}

.btn-invite>>>.btn-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}

.btn-invite:hover>>>.btn-icon {
  color: rgba(0, 0, 0, 0.84) !important;
  transition: ease-out 0.2s;
}

.btn-invite.disabled>>>.btn-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}

.btn-invite:hover.disabled>>>.btn-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}

.users-list {
  margin-top: 10px;
  width: 100%;
  flex: 1;
}

.user-list-item {
  position: relative;
  background: transparent;
  /* border-color: #8f90a8;
  color: white; */
  padding: 0.75rem 1rem;
}

.img-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
}

.txt-timeago {
  /* position: absolute;
  top: 2px;
  right: 4px; */
  font-size: 8px;
  margin-top: 2px;
  /* color: rgba(255, 255, 255, 0.7); */
  color: rgba(0, 0, 0, 0.7);
}

.btn-view {
  height: 30px !important;
  width: 30px !important;
  margin-right: 10px;
  padding: 0px !important;
  color: rgba(0, 0, 0, 0.84) !important;
}

.input-description {
  margin-bottom: 10px;
  font-size: 12px;
}

.input-form {
  margin-bottom: 10px;
  width: 250px;
  font-size: 11px;
}
.txt-label {
  font-weight: 600;
  margin-bottom: 5px;
}
</style>
