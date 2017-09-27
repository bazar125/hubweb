<template>
  <div class="reports d-flex flex-column justify-content-start align-items-start">
    <div class="charts-container d-flex justify-content-start align-items-start">
      <div class="recorded-events-card d-flex justify-content-center align-items-center">
        <base-card :hidePlaceholder="true" style="flex: 1; height: 100%;">
          <div class="recorded-events-container d-flex flex-column justify-content-start align-items-center">
            <span class="chart-title">Events This Month</span>
            <recorded-events-chart :width="380" :height="250" class="recorded-events-chart"></recorded-events-chart>
          </div>
        </base-card>
      </div>
      <div class="revenue-card d-flex justify-content-center align-items-center">
        <base-card :hidePlaceholder="true" style="flex: 1; height: 100%;">
          <div class="revenue-container d-flex flex-column justify-content-start align-items-center">
            <span class="chart-title">Revenue</span>
            <revenue-chart :width="380" :height="250" class="revenue-chart"></revenue-chart>
          </div>
        </base-card>
      </div>
    </div>
    <div class="bottom-container d-flex justify-content-start align-items-start">
      <base-card :hidePlaceholder="true">
        <div class="overdue-container d-flex flex-column justify-content-start align-items-start">
          <div class="d-flex align-items-start" style="width: 100%;">
            <span class="chart-title mr-auto">Payments Overdue</span>
            <span style="padding-right: 10px; margin-right: 10px; font-size: 13px; border-right: 1px solid #ececec;">
              <span class="chart-title">Overdue:</span> 231</span>
            <span style="font-size: 13px;">
              <span class="chart-title">Total:</span> ₦250,000</span>
          </div>
          <div class="overdue-list-container d-flex justify-content-start align-items-center">
            <div class="overdue-list d-flex justify-content-start align-items-center">
              <div v-for="payment in paymentsOverdue" :key="payment" class="overdue-item d-flex justify-content-center align-items-center">
                <b-card class="payment-card" title="₦10,000" sub-title="GWA456ASD">
                  <span class="text-overdue">5 days overdue</span>
                </b-card>
              </div>
            </div>
          </div>
          <!-- <revenue-chart :width="400" :height="40" class="revenue-chart"></revenue-chart> -->
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
      paymentsOverdue: ['', '', '', '', '', '', ''],
    };
  },
};
</script>

<style scoped>
.reports {
  width: calc(100% - 350px);
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
  overflow: hidden;
}

.overdue-list-root {
  overflow: hidden;
}

.overdue-list-container {
  height: 100%;
  max-width: 100%;
  overflow-x: auto;
  /* overflow-y: hidden; */
  white-space: nowrap;
}

.overdue-list {
  height: 100%;
}

.overdue-card {
  width: auto;
  /* flex: none; */
  height: 100%;
  padding-top: 10px;
  /* height: 400px; */
}

.overdue-item {
  /* display: inline-block; */
  flex: 1;
  /* width: 200px; */
  height: 100%;
}

.overdue-item:not(:last-child) {
  padding-right: 20px;
}

.payment-card {
  background-color: #c62828;
  color: white;
  cursor: pointer;
  box-shadow: none;
  transition: all .15s ease-in-out;
  z-index: 3;
}

.payment-card:hover {
  background-color: #d52d2d;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  transition: all .15s ease-in-out;
}

/* .overdue-item:not(:last-child) {
  border-right: 1px solid #ececec;
} */

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
  padding-top: 10px;
}

.action-btn:not(:last-child) {
  margin-right: 10px;
}

.text-overdue {
  font-size: 10px;
  user-select: none;
}
</style>

<style>
.payment-card .card-block {
  padding: 10px;
}
.payment-card .card-title {
  font-weight: 300;
  user-select: none;
}
.payment-card .card-subtitle {
  font-weight: 600;
  color: white !important;
  margin-bottom: 0px !important;
  user-select: none;
}
</style>
