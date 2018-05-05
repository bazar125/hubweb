<template>
  <dark-card :title="'Daily Report'" class="daily-report-card">
    <div class="root-container d-flex flex-column justify-content-start align-items-center">

      <div class="top-container d-flex justify-content-start align-items-center">
        <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
          <div class="top-data-container d-flex justify-content-start align-items-center">
            <span class="top-label">Report Type</span>
            <span class="top-data">Full Daily Report</span>
          </div>
          <div class="top-data-container d-flex justify-content-start align-items-center">
            <span class="top-label">Date Range</span>
            <span class="top-data">6 April 2018 (00:01-23:59)</span>
          </div>
          <div class="top-data-container d-flex justify-content-start align-items-center">
            <span class="top-label">Data Coverage</span>
            <span class="top-data">All states, Federal Republic of Nigeria</span>
          </div>
          <div class="top-data-container d-flex justify-content-start align-items-center">
            <span class="top-label">Author</span>
            <span class="top-data">Full Daily Report</span>
          </div>
          <div class="top-data-container d-flex justify-content-start align-items-center" style="margin-bottom: 0px;">
            <span class="top-label">Report Reference</span>
            <span class="top-data">MOTOM/FRN/KAD/110413224</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="top-action-container d-flex flex-column justify-content-start align-items-center">
          <span class="action-title">Actions</span>
          <base-btn @click="clickPrint()" class="btn-print" text="Print" icon="print" style="margin-bottom: 6px;"></base-btn>
          <base-btn @click="clickEmail()" class="btn-email" text="Email" icon="envelope-o" style="margin-bottom: 6px;"></base-btn>
          <base-btn @click="clickPdf()" class="btn-pdf" text="PDF" icon="file-pdf-o"></base-btn>
        </div>
      </div>

      <div class="bottom-container d-flex flex-column justify-content-start align-items-center">
        <div class="table-container d-flex flex-column justify-content-start align-items-center">
          <report-data-table :items="items"></report-data-table>
        </div>
        <div class="stats-container d-flex justify-content-start align-items-center">
          <recorded-events-chart class="recorded-events-chart"></recorded-events-chart>
          <revenue-chart class="revenue-chart"></revenue-chart>
        </div>
      </div>
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
  name: "DailyReportCard",
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
.daily-report-card>>>.main-container {
  padding: 0px;
}

.daily-report-card >>> .root-container {
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
</style>
