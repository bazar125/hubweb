<template>
  <dark-card :title="'Preset Reports'" class="preset-reports">
    <div class="root-container d-flex flex-column justify-content-start align-items-center">
      <div class="preset-container d-flex flex-column justify-content-start align-items-start">
        <span class="carousel-label">Daily</span>
        <report-carousel :reports="dailyReports"></report-carousel>
      </div>
      <div class="preset-container d-flex flex-column justify-content-start align-items-start">
        <span class="carousel-label">Weekly</span>
        <report-carousel :reports="weeklyReports"></report-carousel>
      </div>
      <div class="preset-container d-flex flex-column justify-content-start align-items-start">
        <span class="carousel-label">Fortnightly</span>
        <report-carousel :reports="fortnightlyReports"></report-carousel>
      </div>
      <div class="preset-container d-flex flex-column justify-content-start align-items-start">
        <span class="carousel-label">Monthly</span>
        <report-carousel :reports="monthlyReports"></report-carousel>
      </div>
      <div class="preset-container d-flex flex-column justify-content-start align-items-start">
        <span class="carousel-label">Yearly</span>
        <report-carousel :reports="yearlyReports"></report-carousel>
      </div>
    </div>
  </dark-card>
</template>

<script>
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import RecordedEventsChart from '@/components/RecordedEventsChart';
import RevenueChart from '@/components/RevenueChart';
import ReportDataTable from '@/components/Reports/ReportDataTable';
import ReportCarousel from '@/components/Reports/ReportCarousel';

import Slide1 from '../../assets/refueling_stock_photo.jpg';
import Slide2 from '../../assets/fleet_stock_photo.jpg';
import Slide3 from '../../assets/petrol_station_stock_photo.jpg';

export default {
  name: 'PresetReports',
  props: [],
  components: {
    DarkCard,
    BaseBtn,
    RecordedEventsChart,
    RevenueChart,
    ReportDataTable,
    ReportCarousel,
  },
  data() {
    return {
      items: [
        {
          label: 'Collisions',
          value: '4',
        },
        {
          label: 'Citations',
          value: '4',
        },
        {
          label: 'Warnings',
          value: '12',
        },
        {
          label: 'Total Registered Vehicles',
          value: '414,152',
        },
        {
          label: 'Total Registered Drivers',
          value: '1,253,152',
        },
        {
          label: 'Citations Paid',
          value: '470',
        },
        {
          label: 'Citations Unpaid',
          value: '3',
        },
        {
          label: 'Citations Revenue',
          value: '₦1,340,000',
        },
        {
          label: 'Driver Identification Submissions',
          value: '125',
        },
      ],
      dailyReports: [
        {
          text: 'Make Savings On Your Fuelling & Protect Against Fuel Theft',
          background: Slide3,
        },
        {
          text: 'Second Slide',
          background: Slide1,
        },
        {
          text: 'Third Slide',
          background: Slide2,
        },
      ],
      weeklyReports: [
        {
          text: 'Make Savings On Your Fuelling & Protect Against Fuel Theft',
          background: Slide3,
        },
        {
          text: 'Second Slide',
          background: Slide1,
        },
        {
          text: 'Third Slide',
          background: Slide2,
        },
      ],
      fortnightlyReports: [
        {
          text: 'Make Savings On Your Fuelling & Protect Against Fuel Theft',
          background: Slide3,
        },
        {
          text: 'Second Slide',
          background: Slide1,
        },
        {
          text: 'Third Slide',
          background: Slide2,
        },
      ],
      monthlyReports: [
        {
          text: 'Make Savings On Your Fuelling & Protect Against Fuel Theft',
          background: Slide3,
        },
        {
          text: 'Second Slide',
          background: Slide1,
        },
        {
          text: 'Third Slide',
          background: Slide2,
        },
      ],
      yearlyReports: [
        {
          text: 'Make Savings On Your Fuelling & Protect Against Fuel Theft',
          background: Slide3,
        },
        {
          text: 'Second Slide',
          background: Slide1,
        },
        {
          text: 'Third Slide',
          background: Slide2,
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style scoped>
.preset-reports>>>.main-container {
  padding: 0px;
}

.preset-reports>>>.root-container {
  overflow: hidden;
}

.root-container {
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.top-container {
  background-color: #263238;
  color: white;
  width: 100%;
  padding: 8px 16px;
}

.bottom-container {
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.table-container {
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.stats-container {
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.report-data-table>>>th {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.report-data-table>>>td {
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.top-data-container {
  width: 100%;
  color: white;
  margin-bottom: 4px;
}

.top-label {
  width: 150px;
  font-size: 13px;
  font-weight: 700;
  text-align: start;
}

.top-data {
  flex: 1;
  text-align: start;
}

.btn-print {
  flex: 1;
  height: 30px !important;
  width: 100%;
  padding: 0px !important;
  color: white !important;
  background-color: #6761dd !important;
  border-color: #6761dd !important;
  transition: ease-out 0.2;
}

.btn-print:hover {
  background-color: #5751da !important;
  border-color: #5751da !important;
  transition: ease-out 0.2;
}

.btn-email {
  flex: 1;
  height: 30px !important;
  width: 100%;
  padding: 0px !important;
  color: white !important;
  background-color: #63a54b !important;
  border-color: #63a54b !important;
  transition: ease-out 0.2;
}

.btn-email:hover {
  background-color: #9ac98f !important;
  border-color: #9ac98f !important;
  transition: ease-out 0.2;
}

.btn-pdf {
  flex: 1;
  height: 30px !important;
  width: 100%;
  padding: 0px !important;
  color: white !important;
  background-color: #094977 !important;
  border-color: #094977 !important;
  transition: ease-out 0.2 !important;
}

.btn-pdf:hover {
  background-color: #0d6bae !important;
  border-color: #0d6bae !important;
  transition: ease-out 0.2 !important;
}

.top-action-container {
  margin-left: 16px;
  height: 100%;
  width: 100px;
}

.action-title {
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.34);
}

.divider {
  width: 1px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.16);
}

.top-click-container {
}

.report-data-table {
  width: 100%;
  overflow: hidden;
}

.preset-container {
  flex: 1;
  width: 100%;
  padding: 8px;
  padding-top: 4px;
}

.preset-container:not(:last-child) {
  padding-bottom: 0px;
}

.carousel-label {
  font-weight: 600;
  color: rgba(0,0,0,.84);
  margin-bottom: 4px;
}
</style>
