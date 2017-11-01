<template>
  <div class="base d-flex flex-column">
    <div class="stats-container d-flex justify-content-start align-items-center">
      <daily-stats-card></daily-stats-card>
      <system-information-card></system-information-card>
    </div>

    <div class="map-container d-flex justify-content-start align-items-center">
      <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 0.4; height: 100%;">
        <div id="notificationContainer" class="d-flex justify-content-start align-items-center">
          <current-notification-card :notifications="notifications"></current-notification-card>
        </div>

        <div id="activePersonnelContainer" class="d-flex justify-content-start align-items-center">
          <active-personnel-card :activeUsers="activeUsers"></active-personnel-card>
        </div>
      </div>
      
      <dark-card title="Live Map" class="live-map-card">
        <div class="map-overlay d-flex justify-content-end align-items-center">
          <!-- <div class="d-flex justify-content-start align-items-center" style="flex:1; overflow: hidden;">
            <span class="marquee-text">{{scrollHeadlines}}</span>
          </div> -->

          <icon name="circle-thin" class="icon-status color-red" style="margin-top: 5px; margin-bottom: 5px; margin-left: 5px !important;"></icon>
          <span class="txt-status">Collision</span>

          <icon name="circle-thin" class="icon-status color-blue" style="margin-left: 15px;"></icon>
          <span class="txt-status" style="margin-right: 15px;">Citation</span>

          <!-- <icon name="clock-o" class="icon-clock"></icon>
          <clock class="custom-clock" :blink="true" :displaySeconds="false" /> -->
        </div>

        <div ref="map" class="live-map"></div>
      </dark-card>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment';
import DarkCard from '@/components/DarkCard';
import DailyStatsCard from '@/components/DailyStatsCard';
import SystemInformationCard from '@/components/SystemInformationCard';
import ActivePersonnelCard from '@/components/ActivePersonnelCard';
import CurrentNotificationCard from '@/components/CurrentNotificationCard';
// import TablePageLoader from '@/services/TablePageLoader';
import MapOverlayFactory from '@/services/MapOverlayFactory';
import ActivityService from '@/services/ActivityService';
import Clock from 'vue-digital-clock';
import * as d3 from 'd3';
import * as Firebase from 'firebase';

import MapStyle from '../assets/mapstyle.json';

// const pageLoader = new TablePageLoader('citation');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Base',
  components: {
    Clock,
    DailyStatsCard,
    SystemInformationCard,
    ActivePersonnelCard,
    CurrentNotificationCard,
    DarkCard,
  },
  computed: {
    scrollHeadlines() {
      if (!this.headlines || this.headlines.count < 1) {
        return '';
      }

      let str = '';
      for (let i = 0; i < this.headlines.length; i += 1) {
        const headline = this.headlines[i];
        str += `${headline}\xa0\xa0\xa0\xa0\xa0`;
      }
      return str;
    },
  },
  data() {
    return {
      pingLayer: {},
      center: [10.5059, 7.4319],
      statCitations: 314,
      statCollisions: 214,
      statNotifications: 34,
      headlines: [],
      map: {},
      pingMarkers: [],
      notifications: [],
      activeUsers: [],
      activeUserLocations: {},
      scannerUserMarkers: {},
    };
  },
  mounted() {
    this.initialize();
  },
  created() {
    // const apiKey = 'b145ac1c37d04657b72b1ce5097d48e6';
    // const source = 'bbc-news';
    // this.$http
    //   .get(
    //     `https://newsapi.org/v1/articles?source=${source}&sortBy=top&apiKey=${apiKey}`
    //   )
    //   .then(response => {
    //     this.headlines = response.data.articles.map(
    //       article => `${article.author} — ${article.description}`
    //     );
    //   });
  },
  methods: {
    initialize() {
      this.$root.$on('map::centeronuser', user => {
        this.map.setCenter(
          // eslint-disable-next-line no-undef
          new google.maps.LatLng(user.coords.lat, user.coords.lng)
        );
      });

      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: this.center[0], lng: this.center[1] },
        zoom: 13,
        styles: MapStyle,
      });

      // const paused = false;
      const update = () => {
        // eslint-disable-next-line max-len
        const latlng = [
          d3.randomNormal(this.center[0], 0.05)(),
          d3.randomNormal(this.center[1], 0.05)(),
        ];
        const duration = 2000;
        const maxPings = 6;
        if (this.pingMarkers.length > maxPings) {
          const marker = this.pingMarkers.shift();
          marker.setMap(null);
        }
        const marker = MapOverlayFactory.pulseMarker(
          this.map,
          latlng[0],
          latlng[1],
          Math.random() > 0.5 ? 'red' : 'blue'
        );
        this.pingMarkers.push(marker);
        setTimeout(update, duration + Math.random() * 400);
      };
      setTimeout(update);

      ActivityService.subscribeNotifications((count, notifications) => {
        this.notifications = notifications;
      });

      const ref = Firebase.database().ref('scannerUserLocation');
      ref.on('child_added', snap => {
        const userId = snap.key;
        const userLocation = snap.val();
        userLocation.$id = userId;
        this.activeUserLocations[userId] = userLocation;
        if (this.userIsOnline(userLocation)) {
          // eslint-disable-next-line max-len
          const marker = MapOverlayFactory.scannerUserMarker(
            this.map,
            userLocation.coords.lat,
            userLocation.coords.lng,
            userLocation
          );
          this.scannerUserMarkers[userId] = marker;
        }

        this.activeUsers.push(userLocation);
      });
      ref.on('child_changed', snap => {
        const userId = snap.key;
        const userLocation = snap.val();
        userLocation.$id = userId;
        this.activeUserLocations[userId] = userLocation;

        if (this.userIsOnline(userLocation)) {
          const currentMarker = this.scannerUserMarkers[userId];
          if (currentMarker) {
            currentMarker.setMap(null);
          }

          // eslint-disable-next-line max-len
          const marker = MapOverlayFactory.scannerUserMarker(
            this.map,
            userLocation.coords.lat,
            userLocation.coords.lng,
            userLocation
          );
          this.scannerUserMarkers[userId] = marker;
        }

        const existingIndex = this.activeUsers
          .map(x => x.$id)
          .indexOf(userLocation.$id);
        // console.log(`existing index: ${existingIndex}`);
        if (existingIndex > -1) {
          this.activeUsers.splice(existingIndex, 1);
          this.activeUsers.splice(existingIndex, 0, userLocation);
        } else {
          this.activeUsers.push(userLocation);
        }
      });

      this.startCullingOfflineUsers();

      // pageLoader.load(1).then((page) => {
      //   this.items = this.processRows(page.items);
      //   this.totalRows = page.totalRows;
      // });
    },
    // pageChanged(newPage) {
    // pageLoader.load(newPage).then((page) => {
    //   this.items = this.processRows(page.items);
    //   this.totalRows = page.totalRows;
    // });
    // },
    animateMapZoomTo(map, targetZoom) {
      const currentZoom = targetZoom || map.getZoom();
      if (currentZoom !== targetZoom) {
        // eslint-disable-next-line no-undef
        google.maps.event.addListenerOnce(map, 'zoom_changed', () => {
          this.animateMapZoomTo(
            map,
            targetZoom,
            currentZoom + (targetZoom > currentZoom ? 1 : -1)
          );
        });
        setTimeout(() => map.setZoom(currentZoom), 80);
      }
    },
    userIsOnline(user) {
      const now = moment();
      const then = moment(user.timestamp);
      const diff = now.diff(then, 'minutes');
      return diff < 10;
    },
    startCullingOfflineUsers() {
      const cullingInterval = 4000; // ms
      const cullOfflineUsers = () => {
        Object.values(this.activeUserLocations).forEach(user => {
          if (!this.userIsOnline(user)) {
            // console.log('culling');
            // console.log(user);
            // console.log(user.name);
            // console.log(user.$id);
            // console.log(this.scannerUserMarkers);
            const marker = this.scannerUserMarkers[user.$id];
            if (marker) {
              marker.setMap(null);
            }
          }
        });
        this.$forceUpdate();
        setTimeout(cullOfflineUsers, cullingInterval);
      };
      setTimeout(cullOfflineUsers);
    },
    processRows(items) {
      for (let i = 0; i < items.length; i += 1) {
        const row = items[i];
        if (row.completionStatus === 'Overdue') {
          row._dirtyClass = 'danger';
          row._cellVariants = {
            completionStatus: 'danger',
          };
        } else if (row.completionStatus === 'Awaiting Payment') {
          row._dirtyClass = 'alert';
          row._cellVariants = {
            completionStatus: 'alert',
          };
        } else if (row.completionStatus === 'Paid') {
          row._dirtyClass = 'success';
          row._cellVariants = {
            completionStatus: 'success',
          };
        }
      }
      return items;
    },
  },
};
</script>

<style scoped>
.base {
  height: 100%;
  /* Sidenav width: 150px */
  /* width: calc(100% - 150px); */
  width: calc(100% - 350px);
}

.base .daily-stats-card {
  flex: 0.55;
}

.base .system-information-card {
  flex: 0.45;
}

.map-container {
  position: relative;
  /* overflow: hidden; */
  flex: 1;
  /* padding-right: 8px; */
  padding-left: 8px;
  /* padding-right: 8px; */
  padding-bottom: 8px;
  /* background-color: #2c2e4a; */
  background-color: #ececec;
  /* padding: 10px 20px; */
}

.base>>>.active-personnel-card {
  /* flex: 0.6;
  width: 100%; */
  flex: 1;
  height: 100%;
  /* margin-right: 8px; */
}

.base>>>.current-notification-card {
  /* flex: 0.4;
  width: 100%; */
  flex: 1;
  height: 100%;
  /* margin-right: 8px; */
}

.stats-container {
  background-color: #ececec;
  /* background-color: #2c2e4a; */
  padding-top: 8px;
  padding-left: 8px;
  padding-bottom: 8px;
}

.stats-container>>>.daily-stats-card {
  margin-right: 8px;
}

.map-overlay {
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 60px;
  /* width: 100%; */
  /* width: calc(100% - 10px); */
  /* width: 100%; */
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 1px solid #ececec;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.search-input {
  width: 150px;
  /* height: 40px; */
}

.filter-bar {
  padding: 8px;
}

.pagination {
  margin-top: 0px;
}

.custom-table {
  width: 100%;
}

.stats-container .stats-widget {
  border-right: 1px solid rgba(137, 146, 198, 0.2);
}

.live-map-card>>>.main-container {
  position: relative;
  padding: 0px;
}
</style>

<style>
.custom-table-cell {
  cursor: pointer;
}

.base-lower .table-footer {
  margin-bottom: 0px !important;
}

.icon-status {
  width: 12px;
  height: 12px;
  margin-right: 10px;
}

.icon-clock {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}

.color-green {
  color: #00b76f;
}

.custom-clock {
  font-size: 13px;
  padding: 3px 0px;
}

circle.ping {
  stroke: #000;
  stroke-width: 1px;
}

circle.red {
  fill: red;
}

circle.blue {
  fill: steelblue;
}

.color-red {
  color: red;
}

.color-blue {
  color: steelblue;
}

/* red is ef3135 */

.txt-status {
  font-size: 9px;
}

.live-map {
  flex: 1;
  width: 100%;
  /* flex: 1.61803398875;; */
}

.marquee-text {
  font-size: 9px;
  margin-right: 5px !important;
  /* transform: translateX(%); */
  animation: newstickeranim 120s linear infinite;
  white-space: nowrap;
  /* animation-name: 'marquee5u9q4'; */
  /* padding-right: 10px; */
  /* overflow: hidden !important; */
}

@keyframes newstickeranim {
  0% {
    transform: translateX(400px);
  }
  100% {
    transform: translateX(-100%);
  }
}

.leaflet-top,
.leaflet-bottom {
  z-index: 999;
}

.pulse-marker {
  background: #9ba6df;
  /* background: transparent; */
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 11px 0px 0px -12px;
  /* transform: rotateX(55deg); */
  z-index: -2;
}

.pulse-marker:after {
  content: '';
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  margin: -13px 0 0 -13px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
  box-shadow: 0 0 1px 2px #1565c0;
  animation-delay: 1.1s;
}

.pulse-marker.red:after {
  box-shadow: 0 0 1px 2px #c62828;
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

.scanner-user-marker {
  position: relative;
  border-radius: 4px;
  background-color: #0f68c4;
  color: white;
  height: 40px;
  width: 200px;
  font-family: 'Open Sans', sans-serif;
}

.scanner-user-marker:after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  width: 0;
  height: 0;
  border-top: solid 5px #0f68c4;
  border-left: solid 5px transparent;
  border-right: solid 5px transparent;
}

.scanner-user-marker-timeago {
  position: absolute;
  bottom: 7px;
  right: 6px;
  font-size: 7px;
}

.scanner-user-marker-name {
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.scanner-user-marker-zone {
  font-size: 8px;
}

.scanner-user-marker-image {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
  margin-left: 10px;
  /* border: 1px solid #8f90a8; */
}

.ring-container {
  position: relative;
  width: 25px;
  height: 25px;
  z-index: 999;
  left: 40px;
  top: 10px;
}

.circle {
  position: absolute;
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  background-color: #62bd19;
  border-radius: 50%;
}

.circle.blue {
  background-color: #1565c0;
}

.circle.red {
  background-color: #c62828;
}

.ringring {
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

.ringring.blue {
  border-color: #1565c0;
}

.ringring.red {
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

#notificationContainer {
  flex: 0.4;
  width: 100%;
  padding-right: 8px;
  padding-bottom: 8px;
}

#activePersonnelContainer {
  flex: 0.6;
  width: 100%;
  padding-right: 8px;
}
</style>
