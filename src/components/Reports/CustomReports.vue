<template>
  <dark-card :title="'Custom Reports'" class="custom-reports">
    <div class="root-container d-flex flex-column justify-content-start align-items-center">
      <div class="bottom-container d-flex flex-column justify-content-start align-items-center">
        <div v-if="!reports || reports.length === 0" class="placeholder-container d-flex flex-column align-items-center justify-content-center">
          <!-- <div class="d-flex align-items-center justify-content-center">
              <span class="txt-placeholder txt-placeholder-title">Launch Report Wizard</span>
              <icon class="icon-placeholder" name="plus-square-o"></icon>
          </div> -->
          <base-btn @click="clickCustomReport()" class="btn-email" text="Launch Report Wizard" icon="plus-square"></base-btn>
          <span class="txt-placeholder txt-placeholder-subtitle">Your custom report will appear in the Report Browser</span>
        </div>

        <!-- <div v-if="reports && reports.length > 0" class="cards-container d-flex flex-wrap justify-content-start">
          <div v-for="(report, index) in reports" :key="report.id" class="card-container d-flex justify-content-center align-items-center">
            <report-browser-card @click.native="$emit('clickCard', index)" :report="report" :class="{'active': report === selectedReport, 'pulsate': report !== selectedReport}"></report-browser-card>
          </div>
        </div> -->

      </div>

      <b-modal ref="reportViewerModal" hide-header hide-footer>
        <report-viewer @close="$refs.reportViewerModal.hide()"></report-viewer>
      </b-modal>
    </div>
  </dark-card>
</template>

<script>
import BaseBtn from "@/components/BaseBtn";
import DarkCard from "@/components/DarkCard";
import ReportDataTable from "@/components/Reports/ReportDataTable";
import RecordedEventsChart from '@/components/RecordedEventsChart';
import RevenueChart from '@/components/RevenueChart';

export default {
  name: "CustomReports",
  props: [],
  components: {
    DarkCard,
    BaseBtn,
    ReportDataTable,
    RecordedEventsChart,
    RevenueChart,
  },
  data() {
    return {
      items: [
        {
          label: "Collisions",
          value: "4"
        },
        {
          label: "Citations",
          value: "4",
        },
        {
          label: "Warnings",
          value: "12",
        },
        {
          label: "Total Registered Vehicles",
          value: "414,152",
        },
        {
          label: "Total Registered Drivers",
          value: "1,253,152",
        },
        {
          label: "Citations Paid",
          value: "470",
        },
        {
          label: "Citations Unpaid",
          value: "3",
        },
        {
          label: "Citations Revenue",
          value: "₦1,340,000",
        },
        {
          label: "Driver Identification Submissions",
          value: "125",
        },
      ]
    };
  },
  mounted() {}
};
</script>

<style scoped>
.custom-reports>>>.main-container {
  padding: 0px;
}

.custom-reports >>> .root-container {
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

.report-data-table >>> th {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.report-data-table >>> td {
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

/* .btn-email {
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
} */

.btn-email {
  /* flex: 1; */
  margin: 16px 0px;
  height: 30px !important;
  width: 300px;
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

.placeholder-container {
  /* background-color: #263238; */
}

.txt-placeholder {
  font-size: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.64);
  /* color: rgba(255, 255, 255, 0.64); */
}

.txt-placeholder-title {
  /* font-weight: 600; */
  font-size: 22px;
  font-weight: 300;
}

.txt-placeholder-subtitle {
  font-size: 13px;
}

.icon-placeholder {
  width: auto;
  height: 60px;
  color: rgba(0, 0, 0, 0.64);
  /* color: rgba(255, 255, 255, 0.64); */
  margin: 16px 0px;
}
</style>
