<template>
 <div class="reports d-flex">
    <div class="left-side-container d-flex flex-column align-items-center">
        <daily-report-card></daily-report-card>
      </div> 
     <div class="right-side-container d-flex flex-column align-items-center">
        <!-- <state-overview-card :state="selectedState"></state-overview-card> -->
      </div>
  </div>
</template>

<script>
import DailyReportCard from '@/components/Reports/DailyReportCard';

export default {
  name: 'Reports',
  components: {
    DailyReportCard,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.reports {
  height: 100%;
  width: calc(100% - 160px);
  background-color: #f4f4f4;
}

.left-side-container {
  overflow: hidden;
  flex: 0.6;
  padding: 16px;
}

.daily-report-card {
  width: 100%;
  height: 100%;
  flex: 1;
}

.right-side-container {
  padding: 16px;
  padding-left: 0px;
  flex: 0.4;
}

.right-side-container >>> .base-card {
  width: 100%;
}
</style>
