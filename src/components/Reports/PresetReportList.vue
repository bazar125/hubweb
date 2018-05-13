<template>
  <div class="preset-report-carousel d-flex justify-content-center align-items-center">
    <preset-report-card v-for="report in reports" :key="report.title" :report="report"></preset-report-card>
  </div>
</template>

<script>
import PresetReportCard from '@/components/Reports/PresetReportCard';

export default {
  name: 'PresetReportList',
  props: ['reports'],
  components: {
    PresetReportCard,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
  
</style>
