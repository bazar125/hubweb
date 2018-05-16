<template>
  <div class="preset-report-card d-flex flex-column justify-content-center align-items-center" :class="{'disabled-card': !report.active}">
    <div class="header-container d-flex justify-content-center align-items-center">
      <span class="header-text">{{report.title}}</span>
    </div>
    <div class="card-content-container d-flex flex-column justify-content-center align-items-center">
      <div v-if="!report.active" class="disabled-overlay d-flex justify-content-center align-items-center">
        <icon class="disabled-icon" name="hourglass-half"></icon>
        <span class="disabled-text">Report is not ready</span>
      </div>
      <report-data-table hide-head hide-hover :items="presetReports"></report-data-table>
      <!-- <icon class="icon-placeholder" name="bar-chart"></icon> -->
      <!-- <svg class="state-img" xmlns="http://www.w3.org/2000/svg" version="1.1" :viewBox="state.viewBox">
        <path :d="state.d" :title="state.title" :id="state.id"/>
      </svg> -->
    </div>
    <!-- <div class="footer-container d-flex justify-content-center align-items-center">
      <icon class="ic-check" name="check-circle-o"></icon>
      <span class="footer-text">No alerts</span>
    </div> -->
  </div>
</template>

<script>
import ReportDataTable from "@/components/Reports/ReportDataTable";

export default {
  props: ["report"],
  name: "PresetReportCard",
  components: {
    ReportDataTable
  },
  data() {
    return {
      presetReports: []
    };
  },
  methods: {
    createTableData() {
      if (!this.report) {
        return [];
      }

      return [
        {
          label: "Starts",
          value: `${this.report.startDate}, ${this.report.startTime}`
        },
        {
          label: "Ends",
          value: `${this.report.endDate} ${this.report.endTime}`
        },
        { label: "Coverage", value: `${this.report.coverage}` },
        { label: "Data Types", value: `${this.report.dataTypes}` }
      ];
    }
  },
  mounted() {
    this.presetReports = this.createTableData();
  }
};
</script>

<style scoped>
.preset-report-card {
  position: relative;
  width: 200px;
  /* flex: 1; */
  /* height: 100%; */
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 3px solid #ececec;
}

.preset-report-card.disabled-card {
  cursor: default;
}

.preset-report-card:not(.disabled-card):hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.preset-report-card:not(.disabled-card).active {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border: 3px solid #007aff;
}

.preset-report-card.pulsate {
  animation: border-pulsate 2s infinite;
}

.disabled-overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.64);
  width: 100%;
  height: 100%;
  z-index: 2;
  display: table;
}

.disabled-text-container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.disabled-text {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.84);
  font-size: 12px;
}

.disabled-icon {
  color: rgba(255, 255, 255, 0.84);
  width: 15px;
  height: 15px;
  margin-right: 8px;
}

@keyframes border-pulsate {
  /* 007AFF */
  0% {
    border-color: #ef3135;
  }
  50% {
    border-color: #ececec;
  }
  100% {
    border-color: #ef3135;
  }
}

.header-container {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 4px 8px;
  width: 100%;
}

.footer-container {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 2px 8px;
  width: 100%;
}

.header-text {
  color: #2c3e50;
  flex: 1;
  font-size: 10px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.footer-text {
  color: #2c3e50;
  flex: 1;
  font-size: 9px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes newstickeranim {
  0% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(-100%);
  }
}
.marquee-text {
  /* font-size: 9px; */
  margin-right: 5px !important;
  /* transform: translateX(%); */
  animation: newstickeranim 2s linear infinite;
  white-space: nowrap;
  /* animation-name: 'marquee5u9q4'; */
  /* padding-right: 10px; */
  /* overflow: hidden !important; */
}

.card-content-container {
  position: relative;
  flex: 1;
  width: 100%;
  padding: 0px;
  overflow: hidden;
}

.report-data-table {
  flex: 1;
  width: 100%;
}

.report-data-table >>> .table-fill {
  /* background-color: transparent; */
}

.report-data-table >>> td {
  padding: 4px 4px;
  font-size: 10px;
  border-radius: 0px !important;
}
/* TODO: Should probably be able to customize these ratios as a prop to the component */
.report-data-table >>> td:nth-child(1) {
  width: 40%;
  font-weight: 600;
}
.report-data-table >>> td:nth-child(2) {
  width: 60%;
}

.icon-placeholder {
  width: auto;
  height: 25px;
  color: rgba(0, 0, 0, 0.64);
  /* margin: 16px 0px; */
}
</style>
