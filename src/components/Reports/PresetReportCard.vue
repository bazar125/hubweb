<template>
  <div class="preset-report-card d-flex flex-column justify-content-center align-items-center">
    <div class="header-container d-flex justify-content-center align-items-center">
      <span class="header-text">{{report.title}}</span>
    </div>
    <div class="content-container d-flex flex-column justify-content-center align-items-center">
      <report-data-table hide-head hide-hover :items="presetReports"></report-data-table>
      <!-- <icon class="icon-placeholder" name="bar-chart"></icon> -->
      <!-- <svg class="state-img" xmlns="http://www.w3.org/2000/svg" version="1.1" :viewBox="state.viewBox">
        <path :d="state.d" :title="state.title" :id="state.id"/>
      </svg> -->
    </div>
    <div class="footer-container d-flex justify-content-center align-items-center">
      <icon class="ic-check" name="check-circle-o"></icon>
      <span class="footer-text">No alerts</span>
    </div>
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
      presetReports: [
        { label: "Starts", value: "15 May 2018, 00:00" },
        { label: "Ends", value: "15 May 2018, 23:59" },
        { label: "Coverage", value: "All States" },
        { label: "Data Types", value: "All" },
        { label: "Data Types", value: "All" },
        { label: "Data Types", value: "All" },
        { label: "Data Types", value: "All" },
        { label: "Data Types", value: "All" },
      ]
    };
  }
};
</script>

<style scoped>
.preset-report-card {
  position: relative;
  width: 200px;
  /* flex: 1; */
  height: 100%;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 3px solid #ececec;
}

.preset-report-card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.preset-report-card.active {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border: 3px solid #007aff;
}

.preset-report-card.pulsate {
  animation: border-pulsate 2s infinite;
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

.content-container {
  flex: 1;
  width: 100%;
  padding: 8px;
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
  border-radius: 0px;
}
/* TODO: Should probably be able to customize these ratios as a prop to the component */
.report-data-table >>> td:nth-child(1) {
  width: 40%;
  font-weight: 600;
}
.report-data-table >>> td:nth-child(2) {
  width: 60%;
}

.state-img {
  flex: 1;
  height: 100%;
}

path,
circle {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

path:hover,
circle:hover {
  /*   stroke: #002868 !important; */
  /*   stroke-width:2px; */
  stroke-width: 1px;
  stroke-linejoin: round;
  fill: #3a53bf !important;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body path {
  vector-effect: non-scaling-stroke;
  fill: #008751;
  stroke: rgb(255, 255, 255);
}

.icon-placeholder {
  width: auto;
  height: 25px;
  color: rgba(0, 0, 0, 0.64);
  /* margin: 16px 0px; */
}
</style>
