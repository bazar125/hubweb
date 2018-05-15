<template>
 <div class="reports d-flex">
    <div class="left-side-container d-flex flex-column align-items-center">
        <preset-reports></preset-reports>
      </div> 
     <div class="right-side-container d-flex flex-column align-items-center">
       <saved-reports :savedReports="savedReports" :selectedReport="selectedReport"></saved-reports>
       <custom-reports></custom-reports>
      </div>
  </div>
</template>

<script>
import SavedReports from '@/components/Reports/SavedReports';
import PresetReports from '@/components/Reports/PresetReports';
import CustomReports from '@/components/Reports/CustomReports';

export default {
  name: 'Reports',
  components: {
    SavedReports,
    PresetReports,
    CustomReports,
  },
  data() {
    return {
      selectedIndex: 0,
      selectedReport: {},
      savedReports: [],
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
  flex: 0.55;
  /* flex: 1; */
  padding: 8px;
  padding-right: 4px;
}

.preset-reports {
  width: 100%;
  height: 100%;
  flex: 1;
}

.right-side-container {
  overflow: hidden;
  padding: 8px;
  padding-left: 4px;
  flex: 0.45;
}

.right-side-container >>> .base-card {
  width: 100%;
}

.right-side-container>>>.report-browser {
  flex: 0.7;
}

.right-side-container>>>.custom-reports {
  flex: 0.3;
  margin-top: 8px;
}
</style>
