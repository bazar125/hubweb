<template>
  <div class="preset-report-list d-flex justify-content-center align-items-start">
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
.preset-report-list>>>.preset-report-card:not(:last-child) {
  margin-right: 4px;
}
</style>
