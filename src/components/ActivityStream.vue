<template>
  <div class="activity-stream d-flex flex-column justify-content-start align-items-center">
    <span class="master-title">Activity Stream</span>
    <div class="activity-stream-inner d-flex flex-column justify-content-start align-items-center">
      <div v-for="(activity, index) in activities" :key="activity.$id" class="activity-stream-row d-flex flex-column justify-content-start align-items-center">
        <div class="container-title d-flex justify-content-start align-items-center">
          <icon :name="activity.location ? 'book' : 'fire' " class="icon-large"></icon>
          <span class="txt-title" :class="{'outline-blue': activity.location, 'outline-red': !activity.location}">{{activity.location ? 'Citation' : 'Collision'}}</span>
        </div>
        <div class="d-flex justify-content-start align-items-center" style="width: 100%; margin-bottom: 2px;">
          <icon name="location-arrow" class="icon-small"></icon>
          <span class="txt-address">{{activity.location ? activity.location : (activity.address ? activity.address : 'Unknown address') }}</span>
        </div>
        <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
          <icon name="clock-o" class="icon-small" style="margin-right: 5px;"></icon>
          <span class="txt-timeago">{{activity.timeAgo}}</span>
        </div>
        
        <b-btn @click.stop="showModal(activity, index, $event.target)":class="{'btn-blue': activity.location, 'btn-red': !activity.location}" class="btn-primary btn-view" size="sm">View</b-btn>

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
        this.activities.unshift(val);
      });

    ref.child('collisions').orderByChild('timestamp').limitToLast(10)
      .on('child_added', (snap) => {
        const val = snap.val();
        // const timestamp = val.timestamp;
        val.typeDescription = 'collision';
        val.timeAgo = moment(val.timestamp).fromNow();
        this.activities.unshift(val);
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
  width: 200px;
  min-width: 200px;
  z-index: 999;
  box-shadow: 4px 8px 8px 2px rgba(0, 0, 0, 0.3);
}

.activity-stream-inner {
  overflow-y: auto;
}

.txt-title {
  font-weight: 600;
  font-size: 12px;
  width: 100%;
  text-align: start;
}

.outline-red {
  border-bottom: 2px solid #c62828;
}

.outline-blue {
  border-bottom: 2px solid #1565c0;
}

.txt-timeago {
  font-size: 9px;
}

.txt-address {
  font-size: 9px;
  width: 100%;
  text-align: start;
}

.activity-stream-row {
  position: relative;
  width: 100%;
  padding: 8px;
  /* border-bottom: 1px solid #DF90B8; */
  border-bottom: 1px solid #ececec;
}

.btn-view {
  position: absolute;
  right: 4px;
  bottom: 4px;
  font-size: 9px;
  cursor: pointer;
  /* border-color: #DF90B8; */
  padding: 2px 15px;
}

.btn-blue {
  border-color: rgba(21, 101, 192, 1.0);
}

.btn-red {
  /* border-color: #c62828; */
  border-color: rgba(198, 40, 40, 1.0);
}

.icon-large {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.icon-small {
  width: 20px;
  height: 12px;
  margin-right: 8px;
}

.master-title {
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
}

.container-title {
  width: 100%;
  padding-right: 20px;
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
</style>
