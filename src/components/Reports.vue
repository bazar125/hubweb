<template>
  <div class="reports d-flex justify-content-start align-items-start">
    <div class="recorded-events-card d-flex justify-content-center align-items-center">
      <base-card :hidePlaceholder="true" style="flex: 1; height: 100%;">
        <div class="recorded-events-container d-flex flex-column justify-content-start align-items-center">
          <span class="chart-title">Recorded Events (Monthly)</span>
          <recorded-events-chart class="recorded-events-chart"></recorded-events-chart>
        </div>
      </base-card>
    </div>
    <div class="revenue-card d-flex justify-content-center align-items-center">
      <base-card :hidePlaceholder="true" style="flex: 1; height: 100%;">
        <div class="revenue-container d-flex flex-column justify-content-start align-items-center">
          <span class="chart-title">Revenue (Monthly)</span>
          <revenue-chart class="revenue-chart"></revenue-chart>
        </div>
      </base-card>
    </div>
  </div>
</template>

<script>
import RecordedEventsChart from '@/components/RecordedEventsChart';
import RevenueChart from '@/components/RevenueChart';
import BaseCard from '@/components/BaseCard';

export default {
  name: 'Reports',
  components: {
    RecordedEventsChart,
    RevenueChart,
    BaseCard,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.reports {
  width: 100%;
  padding: 20px;
}

.recorded-events-card {
  flex: 1;
  /* height: 100%; */
  padding-right: 10px;
}
/* 
.recorded-events-container {
  flex: 1;
  height: 100%;
}

.revenue-container {
  flex: 1;
  height: 100%;
} */

.revenue-card {
  flex: 1;
  /* height: 100%; */
  padding-left: 10px;
}

.recorded-events-chart {
  flex: 1;
}

.revenue-chart {
  flex: 1;
}

.chart-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}
</style>
