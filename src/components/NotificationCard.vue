<template>
  <dark-card title="Notifications" class="notification-card">
    <div class="container clearfix d-flex" style="flex: 1;">
      <div class="people-list d-flex flex-column" id="people-list">
        <ul class="list">
          <li @click="clickNotification(notification, index)" :class="{'active': selectedIndex === index, 'unread': notification.unread }" class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(notification, index) in notifications" :key="notification.$id">
            <img class="image" :src="notification.image ? notification.image : photoPlaceholder" alt="avatar" />
            <div class="about">
              <div class="name">{{notification.description}}</div>
            </div>
          </li>
        </ul>
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
      center: [10.5059, 7.4319],
      currentUser: null,
      selectedIndex: 0,
      selectedNotification: null,
      notifications: [],
      photoPlaceholder: PhotoPlaceholder,
      mapMarker: null,
      map: null,
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
  mounted() {
    UserService.loadUser()
      .then(user => {
        this.currentUser = user;
      })
      .then(() => {
        ActivityService.subscribeNotifications((count, notifications, unfilteredNotifications) => {
          // this.notifications = notifications;
          this.notifications = unfilteredNotifications;
          if (!this.selectedNotification && this.notifications.length > 0) {
            this.clickNotification(this.notifications[0], 0);
          }
        });
      });
  },
  methods: {
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
</style>
