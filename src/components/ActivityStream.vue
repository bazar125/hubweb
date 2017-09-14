<template>
  <div class="activity-stream d-flex flex-column justify-content-start align-items-center">
    <div class="master-container d-flex justify-content-center align-items-center">
      <span class="master-title">Activity Stream</span>
    </div>
    <div class="activity-stream-inner d-flex flex-column justify-content-start align-items-center">
      <div v-for="(activity, index) in activities" :key="activity.$id" class="activity-stream-row d-flex flex-column justify-content-start align-items-center">
        <div :class="{'bg-blue': activity.location, 'bg-red': !activity.location, 'blink-title': activity.$animate}" class="container-title d-flex justify-content-start align-items-center">
          <icon :name="activity.location ? 'book' : 'fire' " class="icon-small icon-title"></icon>
          <span class="txt-title">{{activity.location ? 'Citation' : 'Collision'}}</span>
          <b-btn @click.stop="showModal(activity, index, $event.target)" :class="{'btn-blue': activity.location, 'btn-red': !activity.location}" class="btn-primary btn-view" size="sm">View</b-btn>
        </div>
        <div class="d-flex justify-content-start align-items-center" style="width: 100%; margin-bottom: 2px;">
          <icon name="location-arrow" class="icon-small" style="margin-right: 1px;"></icon>
          <span class="txt-address">{{activity.location ? activity.location : (activity.address ? activity.address : 'Unknown address') }}</span>
        </div>
        <div class="d-flex justify-content-start align-items-center" style="width: 100%; margin-bottom: 5px;">
          <icon name="clock-o" class="icon-small"></icon>
          <span class="txt-timeago">{{activity.timeAgo}}</span>
        </div>

        <div v-if="!activity.location" class="d-flex justify-content-start align-items-center" style="width: 100%;">
          <img class="img-collision" :src="activity.image ? activity.image : photoPlaceholder"></img>
        </div>

        <b-modal title="Citation" :id="`citationModal${index}`" ok-only>
          <citation-modal :data="activity"></citation-modal>
        </b-modal>

        <b-modal title="Collision" :id="`collisionModal${index}`" ok-only>
          <collision-modal :data="activity"></collision-modal>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import * as Firebase from 'firebase';
import CitationModal from '@/components/CitationModal';
import CollisionModal from '@/components/CollisionModal';
import PhotoPlaceholder from '../assets/photo_placeholder.png';
// import TablePageLoader from '@/services/TablePageLoader';

// const pageLoader = new TablePageLoader('citation,collision');

// function loadActivity() {
//   this.lastTimestamp = (new Date()).getTime();
//   pageLoader.load(1).then((page) => {
//     for (let i = 0; i < page.items.length; i += 1) {
//       const item = page.items[i];
//       item.typeDescription = item.location ? 'citation' : 'collision';
//     }
//     this.activities = page.items;
//     this.totalRows = page.totalRows;
//   });
// }

const MAPS_API_KEY = 'AIzaSyD5XSex8F-5VHZtQ8io0T9BFf8O3zg9yZg';

// Wait this time after initializing before applying the blink animation to new activities
const BLINK_WAIT_DURATION = 6000;
// Duration of blink animation
const BLINK_DURATION = 3000;

export default {
  name: 'ActivityStream',
  components: {
    CitationModal,
    CollisionModal,
  },
  data() {
    return {
      activities: [],
      lastTimestamp: 0,
      initialLoadTime: new Date().getTime(),
      photoPlaceholder: PhotoPlaceholder,
    };
  },
  mounted() {
    // loadActivity.bind(this)();

    const ref = Firebase.database().ref();
    ref.child('citations').orderByChild('timestamp').limitToLast(10)
      .on('child_added', (snap) => {
        const val = snap.val();
        // const timestamp = val.timestamp;
        val.typeDescription = 'citation';
        val.timeAgo = moment(val.timestamp).fromNow();
        if (new Date().getTime() - this.initialLoadTime > BLINK_WAIT_DURATION) {
          val.$animate = true;
        }
        val.$id = snap.key;
        this.activities.unshift(val);
        this.activities = this.activities.sort((a, b) => {
          if (a.timestamp > b.timestamp) {
            return -1;
          }
          if (b.timestamp > a.timestamp) {
            return 1;
          }
          return 0;
        });

        setTimeout(() => {
          val.$animate = false;
        }, BLINK_DURATION);
      });

    ref.child('collisions').orderByChild('timestamp').limitToLast(10)
      .on('child_added', (snap) => {
        const val = snap.val();
        // const timestamp = val.timestamp;
        val.typeDescription = 'collision';
        val.timeAgo = moment(val.timestamp).fromNow();
        if (new Date().getTime() - this.initialLoadTime > BLINK_WAIT_DURATION) {
          val.$animate = true;
        }
        val.$id = snap.key;

        const lat = val.coords ? val.coords.lat : 10.3080;
        const lng = val.coords ? val.coords.lng : 7.0142;
        const width = 400;
        const height = 200;
        const zoom = 12;
        val.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${MAPS_API_KEY}`;
        this.activities.unshift(val);
        this.activities = this.activities.sort((a, b) => {
          if (a.timestamp > b.timestamp) {
            return -1;
          }
          if (b.timestamp > a.timestamp) {
            return 1;
          }
          return 0;
        });

        setTimeout(() => {
          val.$animate = false;
        }, BLINK_DURATION);
      });

    // ref.child('collisions').on('child_added', () => {
    //   this.lastTimestamp = (new Date).getTime();
    //   pageLoader.load(1).then((page) => {
    //     this.activities = this.processRows(page.items);
    //     this.totalRows = page.totalRows;
    //   });
    // });
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
  },
};
</script>

<style scoped>
.activity-stream {
  background-color: #ececec;
  width: 200px;
  min-width: 200px;
  z-index: 999;
  box-shadow: -2px 0px 8px 2px rgba(0, 0, 0, 0.1);
}

.activity-stream-inner {
  overflow-y: auto;
  width: 100%;
  background-color: #ececec;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

.txt-title {
  font-weight: 600;
  font-size: 12px;
  width: 100%;
  text-align: start;
  line-height: 1;
  padding: 5px;
}

.outline-red {
  border-bottom: 2px solid #c62828;
}

.outline-blue {
  border-bottom: 2px solid #1565c0;
}

.txt-timeago {
  font-size: 8px;
}

.txt-address {
  font-size: 9px;
  width: 100%;
  text-align: start;
  /* white-space: nowrap;
  text-overflow: ellipsis; */
  padding-right: 5px;
}

.activity-stream-row {
  width: 100%;
  background-color: white;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  /* border-radius: 4px; */
  /* padding: 8px; */
  /* border-bottom: 1px solid #DF90B8; */
  /* border-bottom: 1px solid #ececec; */
}

.activity-stream-row:not(:last-child) {
  margin-bottom: 5px;
}

.icon-title {
  height: 14px !important;
  margin-left: 5px;
  margin-right: 5px !important;
}

.btn-view {
  font-size: 11px;
  cursor: pointer;
  /* border-color: #DF90B8; */
  color: white;
  background-color: transparent;
  line-height: 1;
  padding: 1px 20px;
  margin-right: 5px;
}

.icon-small {
  width: 20px;
  height: 12px;
  margin-right: 0px;
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
  min-height: 52px;
  background-color: #244474;
  color: white;
}

.master-title {
  /* margin-top: 5px;
  margin-bottom: 5px; */
  font-weight: 600;
  /* border-bottom: 1px solid #ececec; */
  /* border-bottom: 1px solid #8992C6; */
  /* border-bottom: 1px solid white; */
  padding-left: 20px;
  padding-right: 20px;
}

.container-title {
  width: 100%;
  /* padding-right: 20px; */
  /* padding: 5px; */
  margin-bottom: 5px;
  /* border-top-left-radius: 4px;
  border-top-right-radius: 4px; */
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
  height: 70px;
  object-fit: cover;
  object-position: center center;
}
</style>
