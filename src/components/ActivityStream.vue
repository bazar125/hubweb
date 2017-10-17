<template>
  <div class="activity-stream d-flex flex-column justify-content-start align-items-center">
    <lottie class="loading-animation" :options="defaultOptions" :width="150" :height="150" />
    <dark-card :showPulse="true" class="container-card" title="Live Feed">
      <div class="activity-stream-inner">
        <div v-for="(activity, index) in activities" :key="activity.$id" class="d-flex flex-column justify-content-start align-items-center" style="position: relative;">
          <div :class="{'blink-title': activity.$animate, 'row-citation': activity.location && activity.completionStatus !== 'Warning', 'row-warning': activity.location && activity.completionStatus === 'Warning', 'row-collision': !activity.location}" class="activity-stream-row d-flex flex-column justify-content-start align-items-center">
            <div class="container-title d-flex justify-content-start align-items-center">
              <!-- <icon :name="activity.location ? 'book' : 'fire' " class="icon-master icon-title"></icon> -->
              <icon :name="activity.location ? 'circle' : 'circle'" :class="{'circle-citation': activity.location, 'circle-collision': !activity.location}" class="icon-master icon-title"></icon>
              <span class="txt-title">{{getActivityTitle(activity)}}</span>
              <!-- <b-btn @click.stop="showModal(activity, index, $event.target)" :class="{'btn-blue': activity.location, 'btn-red': !activity.location}" class="btn-primary btn-view" size="sm">View</b-btn> -->
              <base-btn @click="showModal(activity, index, {})" class="ml-auto btn-view" icon="search"></base-btn>
            </div>
            <div class="d-flex justify-content-start align-items-center" style="width: 100%; margin-bottom: 2px;">
              <!-- <icon name="location-arrow" class="icon-small" style="margin-right: 1px;"></icon> -->
              <span class="txt-reference">Ref: {{activity.location ? activity.paymentReference : (activity.reference ? activity.reference : 'Unknown reference') }}</span>
            </div>
            <div class="d-flex justify-content-start align-items-center" style="width: 100%; margin-bottom: 2px;">
              <!-- <icon name="location-arrow" class="icon-small" style="margin-right: 1px;"></icon> -->
              <span class="txt-address">{{activity.location ? activity.location : (activity.address ? activity.address : 'Unknown address') }}</span>
            </div>
            <div class="d-flex justify-content-start align-items-center" style="width: 100%; margin-bottom: 5px;">
              <!-- <icon name="clock-o" class="icon-small"></icon> -->
              <span class="txt-timeago">{{activity.timeAgo}}</span>
            </div>

            <div v-if="!activity.location" class="d-flex justify-content-center align-items-center" style="width: 100%; overflow: hidden;">
              <img class="img-collision" :src="activity.image ? activity.image : photoPlaceholder"></img>
            </div>

            <b-modal title="Citation" :id="`citationModal${index}`" :hide-header="true" :hide-footer="true">
              <citation-modal :modalId="`citationModal${index}`" :data="activity"></citation-modal>
            </b-modal>

            <b-modal title="Collision" :id="`collisionModal${index}`" :hide-header="true" :hide-footer="true">
              <collision-modal :modalId="`collisionModal${index}`" :data="activity"></collision-modal>
            </b-modal>
          </div>

          <div class="divider-container d-flex justify-content-center align-items-center">
            <!-- <icon name="ellipsis-h" class="icon-small"></icon> -->
            <span class="icon-divider">...</span>
          </div>
        </div>
      </div>
    </dark-card>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
import CitationModal from '@/components/CitationModal';
import CollisionModal from '@/components/CollisionModal';
import ModelFactory from '@/services/ModelFactory';
import DarkCard from '@/components/DarkCard';
import BaseBtn from '@/components/BaseBtn';
import Lottie from '@/components/VueLottie';
import PhotoPlaceholder from '../assets/photo_placeholder.png';
// import * as animationData from '../assets/ripple_animation.json';
import * as animationData from '../assets/loading_animation.json';

// Wait this time after initialLoadTime before applying the blink animation to new activities
const BLINK_WAIT_DURATION = 6000;

export default {
  name: 'ActivityStream',
  components: {
    CitationModal,
    CollisionModal,
    DarkCard,
    BaseBtn,
    Lottie,
  },
  data() {
    return {
      // activities: [],
      citations: [],
      collisions: [],
      lastTimestamp: 0,
      initialLoadTime: new Date().getTime(),
      photoPlaceholder: PhotoPlaceholder,
      defaultOptions: { animationData },
    };
  },
  computed: {
    activities() {
      return this.citations.concat(this.collisions).sort((a, b) => b.timestamp - a.timestamp);
    },
  },
  mounted() {
    const ref = Firebase.database().ref();

    ref.child('citations').orderByChild('timestamp').limitToLast(10)
      .on('child_added', (snap) => {
        let animate = false;
        if (new Date().getTime() - this.initialLoadTime > BLINK_WAIT_DURATION) {
          animate = true;
        }
        const citation = ModelFactory.citation(snap, animate);
        this.citations.push(citation);
      });

    ref.child('collisions').orderByChild('timestamp').limitToLast(10)
      .on('child_added', (snap) => {
        let animate = false;
        if (new Date().getTime() - this.initialLoadTime > BLINK_WAIT_DURATION) {
          animate = true;
        }
        const collision = ModelFactory.collision(snap, animate);
        this.collisions.push(collision);
      });
  },
  methods: {
    showModal(activity, index, sender) {
      const isCitation = activity.location;
      if (isCitation) {
        this.$root.$emit('show::modal', `citationModal${index}`, sender);
      } else {
        this.$root.$emit('show::modal', `collisionModal${index}`, sender);
      }
    },
    getActivityTitle(activity) {
      if (!activity) {
        return '';
      }

      if (activity.location) {
        if (activity.completionStatus === 'Warning') {
          return 'Warning issued';
        }

        return 'Citation issued';
      }

      return 'Collision logged';
    },
  },
};
</script>

<style scoped>
.activity-stream {
  /* background-color: #585e8c; */
  background-color: #2c2e4a;
  width: 200px;
  min-width: 200px;
  z-index: 999;
  box-shadow: -2px 0px 8px 2px rgba(0, 0, 0, 0.1);
  padding: 8px;
  position: relative;
}

.activity-stream>>>.main-container {
  padding: 0px;
}

.activity-stream-inner {
  overflow-y: auto;
  width: 100%;
  /* background-color: #585e8c; */
  background-color: #323444;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

.container-card {
  width: 100%;
}

.txt-title {
  font-weight: 600;
  font-size: 10px;
  /* width: 100%; */
  text-align: start;
  line-height: 1;
  padding: 8px;
  padding-left: 0px;
  text-transform: uppercase;
}

.outline-red {
  border-bottom: 2px solid #c62828;
}

.outline-blue {
  border-bottom: 2px solid #1565c0;
}

.txt-timeago {
  font-size: 8px;
  /* font-style: italic; */
  /* color: white; */
  color: rgba(255, 255, 255, 0.84);
  margin-left: 5px;
}

.txt-reference {
  font-weight: 600;
  font-size: 10px;
  width: 100%;
  text-align: start;
  /* white-space: nowrap;
  text-overflow: ellipsis; */
  padding-right: 5px;
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.84);
}

.txt-address {
  font-size: 9px;
  width: 100%;
  text-align: start;
  /* white-space: nowrap;
  text-overflow: ellipsis; */
  padding-right: 5px;
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.84);
}

.activity-stream-row {
  width: 100%;
  /* background-color: white; */
  /* background-color: #2c2e4a; */
  background-color: #3a3d41;
  /* color: #8f90a8; */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  /* padding: 8px; */
  /* border-bottom: 1px solid #DF90B8; */
  /* border-bottom: 1px solid #ececec; */
}

.row-citation {
  background-color: #1565c0;
}

.row-warning {
  background-color: #b97310;
}

.row-collision {
  background-color: #c62828;
}

.activity-stream-row:not(:last-child) {
  margin-bottom: 5px;
}

.icon-title {
  /* height: 12px !important; */
  width: 6px !important;
  height: 6px !important;
  margin-left: 5px;
  margin-right: 5px !important;
  /* margin-right: 5px !important; */
}

.btn-view {
  height: 20px !important;
  width: 20px !important;
  padding: 0px !important;
  color: white !important;
  border: 0px solid white;
  margin-right: 5px;
}

.btn-view:hover {
  background-color: rgba(255, 255, 255, 0.65);
}

.btn-blue {
  color: #1565c0;
}

.btn-red {
  color: #c62828;
}

.divider-container {
  position: relative;
  width: 100%;
  margin-bottom: 5px;
  height: 10px;
}

.icon-divider {
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  vertical-align: center;
  font-size: 24px;
  font-weight: 700;
  user-select: none;
  color: rgba(255, 255, 255, 0.84);
}

.icon-master {
  width: 20px;
  height: 12px;
  margin-right: 0px;
  color: white;
}

.circle-citation {
  color: #9ac98f;
}

.circle-collision {
  color: #ef3135;
}

.bg-red {
  background-color: #c62828;
  color: white;
}

.bg-blue {
  background-color: #1565c0;
  color: white;
}

.master-container {
  width: 100%;
  height: 52px;
  min-height: 32px;
  /* background-color: #244474; */
  background-color: #585e8c;
  color: rgba(255, 255, 255, 0.84);
  /* border: 1px solid #8992C6; */
  /* border-bottom: 1px solid rgba(137,146,198, 0.2); */
  /* border-bottom: 1px solid rgba(44,46,74, 0.2); */
  border-bottom: 1px solid #797a97;
}

.master-title {
  /* margin-top: 5px;
  margin-bottom: 5px; */
  font-weight: 600;
  font-size: 11px;
  /* border-bottom: 1px solid #ececec; */
  /* border-bottom: 1px solid #8992C6; */
  /* border-bottom: 1p  x solid white; */
  padding-left: 20px;
  padding-right: 20px;
  /* color: #797a97; */
  /* color: #ececec; */
  color: rgba(255, 255, 255, 0.84);
}

.container-title {
  width: 100%;
  color: white;
  /* padding-right: 20px; */
  /* padding: 5px; */
  /* margin-bottom: 5px; */
  /* border-top-left-radius: 4px;
  border-top-right-radius: 4px; */
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 5px;
}

.blink-title {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.img-collision {
  width: 100%;
  /* min-width: 400px; */
  height: 70px;
  object-fit: cover;
  padding: 5px;
  /* object-position: center center; */
  /* object-position: -100px -20px; */
}

.loading-animation {
  position: absolute;
  top: -52px;
  left: -25px;
  z-index: 999;
}
</style>
