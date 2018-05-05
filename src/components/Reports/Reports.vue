<template>
 <div class="reports d-flex">
    <div class="left-side-container d-flex flex-column align-items-center">
        <report-browser :reports="reports" :selectedReport="selectedReport"></report-browser>
      </div> 
     <!-- <div class="right-side-container d-flex flex-column align-items-center">
       <report-presets></report-presets>
      </div> -->
  </div>
</template>

<script>
import ReportBrowser from '@/components/Reports/ReportBrowser';

export default {
  name: 'Reports',
  components: {
    ReportBrowser,
  },
  data() {
    return {
      selectedIndex: 0,
      selectedReport: {},
      reports: [],
      // reports: [
      //   {
      //     id: "1",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "2",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "3",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "4",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "5",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "6",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "7",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "8",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "9",
      //     name: "Test Report"
      //   },
      //   {
      //     id: "10",
      //     name: "Test Report"
      //   },
      // ],
    };
  },
};
</script>

<style scoped>
.reports {
  height: 100%;
  /* width: calc(100% - 160px); */
  /* +192px activity stream +8px padding*/
  width: calc(100% - 360px);
  background-color: #f4f4f4;
}

.left-side-container {
  overflow: hidden;
  /* flex: 0.6; */
  flex: 1;
  padding: 8px;
  padding-right: 0px;
}

.daily-report-card {
  width: 100%;
  height: 100%;
  flex: 1;
}

.right-side-container {
  overflow: hidden;
  padding: 8px;
  padding-left: 0px;
  padding-right: 0px;
  flex: 0.4;
}

.right-side-container >>> .base-card {
  width: 100%;
}
</style>
