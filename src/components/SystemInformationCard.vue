<template>
  <dark-card title="System Information" class="system-information-card">
    <div class="d-flex justify-content-start align-items-center" style="flex: 1; width: 100%;">
      <!-- <stats-widget type="Officers Online" icon="book" :value="statOfficers"></stats-widget> -->
      <!-- <stats-widget type="Collisions" icon="fire" :value="statCollisions"></stats-widget>
          <stats-widget type="Warnings" icon="exclamation" :value="statWarnings"></stats-widget>
          <stats-widget type="Overdue Fines" icon="exclamation" :value="statFines"></stats-widget> -->

      <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1; padding-left: 20px;">
        <div class="d-flex justify-content-start align-items-center" style="margin-bottom: 6px;">
          <icon name="check-circle-o" class="icon-status color-green"></icon>
          <span class="txt-status">All systems are functioning normally</span>
        </div>

        <div class="d-flex justify-content-start align-items-center">
          <icon name="exclamation" class="icon-status" style="color: white;"></icon>
          <span class="txt-status">No pending notifications</span>
        </div>
      </div>
    </div>
  </dark-card>
</template>

<script>
import StatsWidget from '@/components/StatsWidget';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

export default {
  name: 'SystemInformationCard',
  components: {
    StatsWidget,
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      statOfficers: 3,
    };
  },
};
</script>

<style scoped>
.system-information-card {}

.system-information-card .stats-widget {
  flex: none;
}

.icon-status {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  /* color: white; */
}

.txt-status {
  font-size: 11px;
  color: white;
}

</style>
