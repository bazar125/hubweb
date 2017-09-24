<template>
  <div class="reports d-flex flex-column justify-content-start align-items-start">
    <div class="charts-container d-flex justify-content-start align-items-start">
      <div class="recorded-events-card d-flex justify-content-center align-items-center">
        <base-card :hidePlaceholder="true" style="flex: 1; height: 100%;">
          <div class="recorded-events-container d-flex flex-column justify-content-start align-items-center">
            <span class="chart-title">Recorded Events (Monthly)</span>
            <recorded-events-chart :width="400" :height="250" class="recorded-events-chart"></recorded-events-chart>
          </div>
        </base-card>
      </div>
      <div class="revenue-card d-flex justify-content-center align-items-center">
        <base-card :hidePlaceholder="true" style="flex: 1; height: 100%;">
          <div class="revenue-container d-flex flex-column justify-content-start align-items-center">
            <span class="chart-title">Revenue (Monthly)</span>
            <revenue-chart :width="400" :height="250" class="revenue-chart"></revenue-chart>
          </div>
        </base-card>
      </div>
    </div>
    <div class="bottom-container d-flex justify-content-start align-items-start">
      <div class="overdue-card d-flex justify-content-center align-items-center">
        <base-card :hidePlaceholder="true" style="flex: 1; height: 100%;">
          <div class="overdue-container d-flex flex-column justify-content-start align-items-start">
            <div class="d-flex flex-column justify-content-start align-items-start">
              <span class="chart-title">Payments Overdue</span>
              <div class="action-btn-container d-flex justify-content-start align-items-start" style="margin-bottom: 10px;">
                <b-btn class="action-btn" size="sm">
                  <icon name="fire"></icon>
                </b-btn>
                <b-btn class="action-btn" size="sm">
                  <icon name="user"></icon>
                </b-btn>
                <b-btn class="action-btn" size="sm">
                  <icon name="line-chart"></icon>
                </b-btn>
              </div>
              <div class="action-btn-container d-flex justify-content-start align-items-start">
                <b-btn class="action-btn" size="sm">
                  <icon name="fire"></icon>
                </b-btn>
                <b-btn class="action-btn" size="sm">
                  <icon name="user"></icon>
                </b-btn>
                <b-btn class="action-btn" size="sm">
                  <icon name="line-chart"></icon>
                </b-btn>
              </div>

              

            </div>
            <!-- <revenue-chart :width="400" :height="40" class="revenue-chart"></revenue-chart> -->
          </div>
        </base-card>
      </div>
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

.charts-container {
  width: 100%;
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

.recorded-events-card {
  flex: 1;
  /* height: 100%; */
  padding-right: 10px;
  padding-bottom: 10px;
}

.revenue-card {
  flex: 1;
  /* height: 100%; */
  padding-left: 10px;
  padding-bottom: 10px;
}

.overdue-container {
  height: 100%;
  flex: 1;
}

.overdue-card {
  flex: 1;
  height: 100%;
  padding-top: 10px;
  /* height: 400px; */
}

.recorded-events-chart {
  flex: 1;
}

.revenue-chart {
  flex: 1;
}

.chart-title {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
}

.bottom-container {
  width: 100%;
  flex: 1;
}

.action-btn:not(:last-child) {
  margin-right: 10px;
}

</style>
