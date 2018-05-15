<template>
  <div ref="rootView" class="report-data-table d-flex flex-column justify-content-center align-items-center">
    <table class="table-fill d-flex flex-column">
      <thead class="custom-thead" :style="{'margin-right': scrollBarWidth + 'px'}" :class="{'collapse-view': hideHead}">
        <tr>
          <th v-for="label in labels" :key="label" class="text-left">{{label}}</th>
        </tr>
      </thead>
      <tbody ref="tbody" class="table-hover custom-tbody" :class="{'hide-hover': hideHover}">
        <tr v-for="(item, index) in items" :key="item">
          <td class="text-left">{{item.label}}</td>
          <td class="text-left">{{item.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ReportDataTable",
  props: {
    labels: null,
    items: {
      type: null,
      required: true
    },
    hideHead: Boolean,
    hideHover: Boolean
  },
  components: {},
  data() {
    return {
      scrollBarWidth: 0
    };
  },
  mounted() {
    const tbody = this.$refs.tbody;
    if (!tbody) {
      return;
    }

    if (tbody.scrollHeight > this.height) {
      this.scrollBarWidth = this.getScrollbarWidth();
    }
  },
  methods: {
    getScrollbarWidth() {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

      document.body.appendChild(outer);

      const widthNoScroll = outer.offsetWidth;
      // force scrollbars
      outer.style.overflow = "scroll";

      // add innerdiv
      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      const widthWithScroll = inner.offsetWidth;

      // remove divs
      outer.parentNode.removeChild(outer);

      return widthNoScroll - widthWithScroll;
    }
  }
};
</script>

<style scoped>
/* ---------------- */
.table-hover {
  overflow-y: auto;
}

.table-fill {
  position: relative;
  flex: 1;
  width: 100%;
  background: white;
  overflow: hidden;
  border-collapse: collapse;
  margin: auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: float 5s infinite;
  padding: 0px;
  background-color: #31429e;
}

.custom-thead {
  display: block;
  background-color: #31429e;
  margin-right: 20px;
}

.custom-tbody {
  border-top: 4px solid #9ea7af;
  display: block;
}

/* TODO: Customize these for each data table type?*/
td:nth-child(1),
th:nth-child(1) {
  width: 60%;
}

td:nth-child(2),
th:nth-child(2) {
  width: 40%;
}

th {
  display: block;
  color: white;
  background: #31429e;
  /* border-bottom: 4px solid rgba(0, 0, 0, .12); */
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 20px;
  text-align: left;
  /* text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); */
  vertical-align: middle;
}

th:first-child {
  border-top-left-radius: 3px;
}

th:last-child {
  border-top-right-radius: 3px;
  border-right: none;
}

tr {
  display: flex;
  border-top: 1px solid #c1c3d1;
  /* border-bottom: 1px solid #c1c3d1; */
  color: #666b85;
  font-size: 16px;
  font-weight: normal;
  /* text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1); */
}

tbody:not(.hide-hover) tr:hover td {
  background: #4e5066;
  color: #ffffff;
  /* border-top: 1px solid #22262e; */
}

tr:first-child {
  border-top: none;
}

.custom-body tr:last-child {
  /* border-bottom: none; */
  border-bottom: 4px solid #9ea7af;
}

tr:nth-child(odd) td {
  background: #ebebeb;
}

tbody:not(.hide-hover) tr:nth-child(odd):hover td {
  background: #4e5066;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 3px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 3px;
}

td {
  display: block;
  background: #ffffff;
  padding: 8px 20px;
  text-align: left;
  vertical-align: middle;
  font-weight: 400;
  font-size: 11px;
  color: black;
  /* text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1); */
  border-right: 1px solid #c1c3d1;
}

td:last-child {
  border-right: 0px;
}

th.text-left {
  text-align: left;
}

th.text-center {
  text-align: center;
}

th.text-right {
  text-align: right;
}

td.text-left {
  text-align: left;
}

td.text-center {
  text-align: center;
}

td.text-right {
  text-align: right;
}

.collapse-view {
  visibility: collapse;
}
</style>
