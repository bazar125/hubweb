<template>
  <dark-card title="Daily Stats" class="daily-stats-card">
    <div class="d-flex justify-content-start align-items-center" style="flex: 1; width: 100%;">
      <stats-widget type="Citations" icon="book" :value="statCitations"></stats-widget>
      <stats-widget type="Collisions" icon="fire" :value="statCollisions"></stats-widget>
      <stats-widget type="Warnings" icon="exclamation" :value="statWarnings"></stats-widget>
      <stats-widget type="Overdue Fines" icon="exclamation" :value="statFines"></stats-widget>
    </div>
  </dark-card>
</template>

<script>
import StatsWidget from '@/components/StatsWidget';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

export default {
  name: 'DailyStatsCard',
  components: {
    StatsWidget,
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      statCitations: 24,
      statCollisions: 3,
      statWarnings: 4,
      statFines: 37,
    };
  },
};
</script>

<style scoped>
.daily-stats-card {
}

.stats-widget {
  flex: 1;
}
</style>
