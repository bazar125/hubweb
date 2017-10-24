<template>
  <dark-card title="Notifications" class="notification-card">
    <div class="container clearfix d-flex" style="flex: 1;">
      <div class="people-list d-flex flex-column" id="people-list">

        <b-tabs class="chat-user-tabs d-flex flex-column justify-content-start align-items-start">
          <b-tab class="custom-tab" title="FEED" active>
              <ul class="list">
                <li @click="clickNotification(notification, index)" :class="{'active': selectedIndex === index, 'unread': notification.unread }" class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(notification, index) in notifications" :key="notification.$id">
                  <img class="image" :src="notification.senderImage ? notification.senderImage : photoPlaceholder" alt="avatar" />
                  <div class="about">
                    <div class="name">{{notification.description}}</div>
                  </div>
                </li>
              </ul>
          </b-tab>
          <b-tab class="custom-tab" v-if="userIsAdmin" title="NEW" >
             <div class="d-flex flex-column justify-content-start align-items-start" style="padding: 8px;">
                <textarea class="form-control input-description" v-model="description" placeholder="Provide a description" rows="2"></textarea>
                <!-- <span class="txt-label">Location</span> -->
                <b-form-input class="input-form" v-model="location" size="sm" type="text" placeholder="Location"></b-form-input>
                <!-- <b-form-input class="input-form" v-model="expires" size="sm" type="text" placeholder="Expires"></b-form-input> -->
                <!-- <span class="txt-label">Expiry (Optional)</span> -->
                <div class="d-flex justify-content-start align-items-center">
                  <date-picker style="margin-bottom: 0px; width: 120px;" placeholder="Expires (Optional)" class="form-control-sm input-form" v-model="expires" :config="config"></date-picker>
                  <base-btn @click="clickCreate" :class="{disabled: !createEnabled}" class="ml-auto btn-invite" text="Send" icon="plus"></base-btn>
                </div>
            </div>
          </b-tab>
        </b-tabs>


        <!-- <ul class="list">
          <li @click="clickNotification(notification, index)" :class="{'active': selectedIndex === index, 'unread': notification.unread }" class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(notification, index) in notifications" :key="notification.$id">
            <img class="image" :src="notification.senderImage ? notification.senderImage : photoPlaceholder" alt="avatar" />
            <div class="about">
              <div class="name">{{notification.description}}</div>
            </div>
          </li>
        </ul> -->
        <dark-card v-if="this.selectedNotification" title="Notification Info" class="details-container d-flex flex-column justify-content-start align-items-start">
          <modal-data-row label="Description" :text="this.selectedNotification.description"></modal-data-row>
          <modal-data-row label="Location" :text="this.selectedNotification.location ? this.selectedNotification.location : 'n/a'"></modal-data-row>
          <modal-data-row label="Created" :text="getCreated(this.selectedNotification)"></modal-data-row>
          <modal-data-row label="Expires" :text="getExpires(this.selectedNotification)"></modal-data-row>
        </dark-card>
        <!-- <div v-if="this.selectedNotification" class="details-container d-flex flex-column justify-content-start align-items-start">
          <span class="txt-heading">Notification Info</span>
          <modal-data-row label="Description" :text="this.selectedNotification.description"></modal-data-row>
          <modal-data-row label="Location" :text="this.selectedNotification.location ? this.selectedNotification.location : 'n/a'"></modal-data-row>
          <modal-data-row label="Created" :text="getCreated(this.selectedNotification)"></modal-data-row>
          <modal-data-row label="Expires" :text="getExpires(this.selectedNotification)"></modal-data-row>
        </div> -->
      </div>
      <div v-if="this.selectedNotification" class="d-flex justify-content-center align-items-center" style="flex: 1;">
          <!-- <div class="d-flex flex-column justify-content-center align-items-center" style="flex: 1; height: 100%;"> -->
            <div ref="map" id="map" class="map"></div>
        </div>
      </div>
    </div>
  </dark-card>
</template>

<script>
import * as moment from 'moment';
import * as Firebase from 'firebase';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import ModalDataRow from '@/components/ModalDataRow';
import UserService from '@/services/UserService';
import ActivityService from '@/services/ActivityService';
import MapOverlayFactory from '@/services/MapOverlayFactory';

import PhotoPlaceholder from '../assets/photo_placeholder.png';
import MapStyle from '../assets/mapstyle.json';

export default {
  name: 'NotificationCard',
  props: ['conversationId'],
  components: {
    BaseBtn,
    DarkCard,
    ModalDataRow,
  },
  data() {
    return {
      center: [10.5059],
      currentUser: null,
      selectedIndex: 0,
      selectedNotification: null,
      notifications: [],
      photoPlaceholder: PhotoPlaceholder,
      mapMarker: null,
      map: null,
      description: '',
      location: '',
      expires: '',
      config: {
        // format: 'YYYY-MM-DD, HH:MM',
        format: 'YYYY-MM-DD',
        useCurrent: false,
        sideBySide: true,
        widgetPositioning: {
          horizontal: 'auto',
          vertical: 'top',
        },
      },
    };
  },
  watch: {
    selectedNotification() {
      this.$nextTick(() => {
        if (!this.map) {
          // eslint-disable-next-line no-undef
          this.map = new google.maps.Map(this.$refs.map, {
            center: { lat: this.center[0], lng: this.center[1] },
            zoom: 13,
            styles: MapStyle,
          });
        }

        if (this.mapMarker) {
          this.mapMarker.setMap(null);
        }

        if (this.selectedNotification && this.selectedNotification.coords) {
          const lat = this.selectedNotification.coords.lat;
          const lng = this.selectedNotification.coords.lng;
          this.mapMarker = MapOverlayFactory.pulseMarker(
            this.map,
            lat,
            lng,
            'blue'
          );

          // eslint-disable-next-line no-undef
          this.map.setCenter(new google.maps.LatLng(lat, lng));
        }
      });
    },
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
  mounted() {
    UserService.loadUser()
      .then(user => {
        this.currentUser = user;
      })
      .then(() => {
        ActivityService.subscribeNotifications(
          (count, notifications, unfilteredNotifications) => {
            // this.notifications = notifications;
            this.notifications = unfilteredNotifications;
            if (!this.selectedNotification && this.notifications.length > 0) {
              this.clickNotification(this.notifications[0], 0);
            }
          }
        );
      });
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
      this.expires = null;
    },
    markNotificationSeen() {
      if (!this.selectedNotification || !this.currentUser) {
        return;
      }

      const notificationKey = this.selectedNotification.$id;
      const userId = this.currentUser.$id;

      console.log(`Marking notification ${notificationKey} as seen`);
      const ref = Firebase.database().ref();
      const updates = {};
      updates[`/globalNotificationSeen/${userId}/${notificationKey}`] = true;
      ref.update(updates);
    },
    getCreated(notification) {
      if (!notification || !notification.timestamp) {
        return 'n/a';
      }

      return moment(notification.timestamp).format('D MMM, HH:mm');
    },
    getExpires(notification) {
      if (!notification || !notification.expiryTimestamp) {
        return 'n/a';
      }

      return moment(notification.expiryTimestamp).format('D MMM, HH:mm');
    },
    clickNotification(notification, index) {
      this.selectedNotification = notification;
      this.selectedIndex = index;

      this.markNotificationSeen();
    },
    getTimeAgo(timestamp) {
      return moment(timestamp).fromNow();
    },
    sendMessage() {
      const ref = Firebase.database().ref();
      const updates = {};
      updates[
        `/globalNotificationSeen/${this.currentUser.$id}/${this
          .selectedNotification.$id}`
      ] = true;
      ref.update(updates).then(() => {
        console.log(
          `${this.currentUser.$id} marked as seen ${this.selectedNotification
            .$id}`
        );
      });
    },
  },
};
</script>

<style scoped>
.details-container>>>.main-container {
  padding: 10px 0px;
}

.container {
  margin: 0 auto;
  /* width: 750px; */
  width: 100%;
  /* background: #444753; */
  background: #3a3e5c;
  /* border-radius: 5px; */
  overflow: hidden;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  padding-left: 0px;
  padding-right: 0px;
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

.people-list {
  width: 260px;
  float: left;
  /* overflow-y: auto; */
}

.people-list .search {
  /* padding: 20px; */
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.icon-search {
  position: absolute;
  right: 20px;
  top: 20px;
  color: rgba(255, 255, 255, 0.54);
}

.people-list .list {
  /* flex: 1; */
  /* max-height: 150px; */
  overflow-y: auto;
  margin-bottom: 0px;
  padding: 10px;
  flex: 1;
}

.people-list input {
  border-radius: 3px;
  border: none;
  /* padding: 14px; */
  padding: 8px;
  padding-right: 30px;
  color: white;
  /* background: #6a6c75; */
  background: #797a97;
  width: 100%;
  font-size: 14px;
}

.people-list .fa-search {
  position: relative;
  left: -25px;
}

.people-list ul {
  padding: 10px;
  /* padding-bottom: 0px; */
  /* height: 770px; */
  list-style: none;
}

/* .people-list ul li:not(:last-child) { */

.people-list ul li {
  /* padding-bottom: 20px; */
  margin-bottom: 10px;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.people-list ul li:hover {
  background-color: rgba(255, 255, 255, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.people-list img {
  float: left;
}

.people-list .about {
  float: left;
  /* margin-top: 8px; */
  /* margin-top: 2px;
  margin-bottom: 2px; */
}

.people-list .about {
  padding-left: 8px;
}

.people-list .status {
  /* color: #92959E; */
  color: rgba(255, 255, 255, 0.7);
  text-align: start;
}

.chat-user-item.active {
  background-color: rgba(255, 255, 255, 0.23);
}

.chat-user-item.unread {
  animation: chat-user-item-pulse 0.7s alternate infinite;
  transition: all 600ms cubic-bezier(0.39, 0.575, 0.565, 1);
}

@keyframes chat-user-item-pulse {
  0% {
    background-color: #0275d8;
  }
  100% {
    background-color: transparent;
  }
}

.people-list .image {
  width: 35px;
  height: 35px;
  border-radius: 20px;
  object-fit: cover;
  object-position: center;
  /* border: 2px solid #585e8c; */
  /* border: 2px solid #9a9bb1; */
}

.people-list .name {
  color: white;
  font-weight: 600;
  text-align: start;
}

.details-container {
  /* flex: 1; */
  /* float: left; */
  margin: 8px;
  padding: 8px;
  background: #f2f5f8;
  color: #434651;
}
.map {
  flex: 1;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.notification-card>>>.ring-container {
  position: relative;
  width: 25px;
  height: 25px;
  z-index: 999;
  left: 40px;
  top: 10px;
}

.notification-card>>>.ringring {
  position: absolute;
  top: -5px;
  left: -5px;
  border: 3px solid #62bd19;
  border-radius: 30px;
  height: 36px;
  width: 36px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
}

.notification-card>>>.ringring.blue {
  border-color: #1565c0;
}

.notification-card>>>.ringring.red {
  border-color: #c62828;
}
@keyframes pulsate {
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
}
.txt-heading {
  font-weight: 700;
  font-size: 11px;
  color: black;
  margin-bottom: 5px;
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
  border-bottom-color: #8f90a8;
  /* border-bottom-color: #eceeef; */
  border-radius: 0px;
  color: rgba(255,255,255, 0.7);
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
  border-left-color: transparent;
  border-right-color: transparent;
}

.chat-user-tabs>>>.nav .nav-link.active {
  color: white;
  background-color: #0275d8;
  border-top-color: #0275d8;
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
  height: 23.75px !important;
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
  resize: none;
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

.chat-user-tabs>>>.bootstrap-datetimepicker-widget {
  font-size: 10px;
  color: rgba(0,0,0,0.84) !important;
}
.notification-card>>>.content-container {
  overflow: visible;
}
.notification-card>>>.main-container {
  overflow: visible;
}
.notification-card.base-card {
  overflow: visible;
}
</style>
