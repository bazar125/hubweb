<template>
  <div class="activity-stream d-flex flex-column justify-content-start align-items-center">
    <span class="master-title">Activity Stream</span>
    <div v-for="activity in activities" :key="activity"
      class="activity-stream-row d-flex flex-column justify-content-start align-items-center">
      <span class="txt-title">New Citation</span>
      <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
        <icon name="location-arrow" class="icon-small"></icon>
        <span class="txt-address">Murtala Muhammad Way, 31212 Lagos</span>
      </div>
      <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
        <icon name="clock-o" class="icon-small"></icon>
        <span class="txt-timeago">2 hours ago</span>
        <b-btn class="ml-auto btn-primary btn-view" size="sm">View</b-btn>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityStream',
  components: {
  },
  data() {
    return {
      activities: [{}],
    };
  },
};
</script>

<style scoped>
.activity-stream {
  width: 200px;
  min-width: 200px;
  z-index: 99;
  box-shadow: 4px 8px 8px 2px rgba(0,0,0,0.3);
  overflow-y: auto;
}

.txt-title {
  font-weight: 600;
  font-size: 12px;
  padding-left: 19px;
  width: 100%;
  text-align: start;
}

.txt-timeago {
  font-size: 10px;
}

.txt-address {
  font-size: 10px;
  width: 100%;
  text-align: start;
}

.activity-stream-row {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #DF90B8;
}

/* .activity-stream-row:not(:last-child) {
  border-bottom: 1px solid #ececec;
} */

.btn-view {
  font-size: 10px;
  cursor: pointer;
  border-color: #DF90B8;
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
