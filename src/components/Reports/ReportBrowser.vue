<template>
  <dark-card :title="'Report Browser'" class="report-browser">
    <div class="root-container d-flex flex-column justify-content-start align-items-center">

      <div class="top-container d-flex justify-content-start align-items-center">
        <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
          <div class="top-data-container d-flex justify-content-start align-items-center">
            <span class="top-label">Preset Time Range</span>
            <base-btn @click="clickToday()" v-b-modal.report-viewer-modal class="btn-print" text="Today" icon="history"></base-btn>
            <base-btn @click="clickWeek()" class="btn-print btn-disabled" text="This Week" icon="history"></base-btn>
            <base-btn @click="clickFortniht()" class="btn-print btn-disabled" text="This Fortnight" icon="history"></base-btn>
            <base-btn @click="clickMonthly()" class="btn-print btn-disabled" text="This Month" icon="history"></base-btn>
            <base-btn @click="clickFortnightly()" class="btn-print btn-disabled" text="This Year" icon="history"></base-btn>
          </div>
          <div class="top-data-container d-flex justify-content-start align-items-center" style="margin-bottom: 0px;">
            <span class="top-label">Custom Report</span>
            <base-btn @click="clickCustomReport()" class="btn-email" text="Launch Wizard" icon="plus-square" style="margin-right: 50px;"></base-btn>
            <!-- <span class="top-label">Scheduled Reports</span>
            <base-btn @click="clickCustomReport()" class="btn-pdf" text="Configure" icon="wrench"></base-btn> -->
          </div>
        </div>

      </div>

      <div class="bottom-container d-flex flex-column justify-content-start align-items-center">
        <div v-if="!reports || reports.length === 0" class="placeholder-container d-flex flex-column align-items-center justify-content-center">
          <span class="txt-placeholder">You don't currently have any saved reports</span>
          <icon class="icon-placeholder" name="bar-chart"></icon>
          <span class="txt-placeholder txt-placeholder-subtitle">Create a custom report or use a preset to get started</span>
        </div>

        <div v-if="reports && reports.length > 0" class="cards-container d-flex flex-wrap justify-content-start">
          <div v-for="(report, index) in reports" :key="report.id" class="card-container d-flex justify-content-center align-items-center">
            <report-browser-card @click.native="$emit('clickCard', index)" :report="report" :class="{'active': report === selectedReport, 'pulsate': report !== selectedReport}"></report-browser-card>
          </div>
        </div>

      </div>

      <b-modal id="report-viewer-modal" :hide-header="true" :hide-footer="true">
        <report-viewer></report-viewer>
      </b-modal>
    </div>
  </dark-card>
</template>

<script>
import BaseBtn from "@/components/BaseBtn";
import DarkCard from "@/components/DarkCard";
import ReportBrowserCard from "@/components/Reports/ReportBrowserCard";
import ReportViewer from "@/components/Reports/ReportViewer";

export default {
  name: "ReportBrowser",
  props: ["reports", "selectedReport"],
  components: {
    DarkCard,
    BaseBtn,
    ReportBrowserCard,
    ReportViewer
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped>
.report-browser {
  width: 100%;
}

.report-browser>>>.main-container {
  padding: 0px;
}

.report-browser>>>.root-container {
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
  position: relative;
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

.btn-print {
  margin-bottom: 6px;
}

.btn-print:not(:last-child) {
  margin-right: 6px;
}

.btn-print:hover {
  background-color: #5751da !important;
  border-color: #5751da !important;
  transition: ease-out 0.2;
}

.btn-email {
  /* flex: 1; */
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
  /* flex: 0.5; */
  height: 30px !important;
  width: 300px;
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

.btn-disabled {
  background-color: #888888 !important;
  border-color: #888888 !important;
  cursor: default !important;
}

.btn-disabled:hover {
  background-color: #888888 !important;
  border-color: #888888 !important;
  cursor: default !important;
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

.cards-container {
  flex: 1;
  width: 100%;
  margin-bottom: 10px;
  /* overflow-y: auto; */
}

.input-search {
  margin-bottom: 8px;
}

.card-container {
  /* height: auto; */
  width: calc(100% / 9);
  /* flex: 0 0 11.1%; */
  padding-bottom: 8px;
  padding-right: 4px;
  padding-left: 4px;
}

.report-browser>>>.main-container {
  overflow-y: auto;
}

.card-container:last-child {
  padding-bottom: 0px;
}

.card-container:nth-child(9n) {
  padding-right: 0px;
}
.card-container:nth-child(9n + 1) {
  padding-left: 0px;
}

.txt-placeholder {
  font-size: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.64);
}

.txt-placeholder-subtitle {
  font-size: 13px;
}

.icon-placeholder {
  width: auto;
  height: 60px;
  color: rgba(0, 0, 0, 0.64);
  margin: 16px 0px;
}

.report-browser>>>.modal-dialog {
  max-width: 80%;
  background: transparent;
  overflow: hidden;
}

.report-browser>>>.modal-body {
  padding: 0px !important;
  background: transparent;
  overflow: hidden;
}
</style>
