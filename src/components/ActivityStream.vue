<template>
  <div class="activity-stream d-flex flex-column justify-content-start align-items-center">
    <span class="master-title">Activity Stream</span>
    <div v-for="activity in activities" :key="activity.$id" class="activity-stream-row d-flex flex-column justify-content-start align-items-center">
      <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
        <icon name="pencil-square" class="icon-small"></icon>
        <span class="txt-title">{{activity.location ? 'New Citation' : 'New Collision'}}</span>
      </div>
      <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
        <icon name="location-arrow" class="icon-small"></icon>
        <span class="txt-address">{{activity.location ? activity.location : (activity.address ? activity.address : 'Unknown address') }}</span>
      </div>
      <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
        <icon name="clock-o" class="icon-small" style="margin-right: 7px;"></icon>
        <span class="txt-timeago">2 hours ago</span>
        <b-btn class="ml-auto btn-primary btn-view" size="sm">View</b-btn>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
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
        this.activities.unshift(val);
      });

    ref.child('collisions').orderByChild('timestamp').limitToLast(10)
      .on('child_added', (snap) => {
        const val = snap.val();
        // const timestamp = val.timestamp;
        val.typeDescription = 'collision';
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
};
</script>

<style scoped>
.activity-stream {
  width: 200px;
  min-width: 200px;
  z-index: 99;
  box-shadow: 4px 8px 8px 2px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

.txt-title {
  font-weight: 600;
  font-size: 12px;
  width: 100%;
  text-align: start;
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
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid #DF90B8;
}








/* .activity-stream-row:not(:last-child) {
  border-bottom: 1px solid #ececec;
} */

.btn-view {
  font-size: 10px;
  cursor: pointer;
  border-color: #DF90B8;
  margin-top: 3px;
}

.icon-small {
  width: 12px;
  height: 12px;
  margin-right: 8px;
}

.master-title {
  margin-top: 5px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
}
</style>
