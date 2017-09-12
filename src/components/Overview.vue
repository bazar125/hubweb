<template>
  <div class="overview d-flex flex-column">
    <div class="map-container d-flex flex-column justify-content-start align-items-center">
      <div class="map-overlay d-flex justify-content-start align-items-center">
        <icon name="check-circle-o" class="icon-status color-green"></icon>
        <span class="txt-status">All systems are functioning normally</span>

        <icon name="exclamation" class="icon-status" style="margin-left: 15px;"></icon>
        <span class="txt-status">No pending notifications</span>

        <icon name="clock-o" class="ml-auto icon-clock"></icon>
        <clock class="custom-clock" :blink="true" :displaySeconds="false" />
      </div>

      <v-map ref="map" :zoom="8" :center="[10.3080, 7.0142]">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker :lat-lng="[10.3080, 7.0142]"></v-marker>
      </v-map>
    </div>
  </div>
</template>

<script>
import Clock from 'vue-digital-clock';
import TablePageLoader from '@/services/TablePageLoader';

const pageLoader = new TablePageLoader('citation');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Overview',
  components: {
    Clock,
  },
  data() {
    return {
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      pageLoader.load(1).then((page) => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });
    },
    pageChanged(newPage) {
      pageLoader.load(newPage).then((page) => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });
    },
    processRows(items) {
      for (let i = 0; i < items.length; i += 1) {
        const row = items[i];
        if (row.completionStatus === 'Payment Due') {
          row._dirtyClass = 'danger';
          row._cellVariants = {
            completionStatus: 'danger',
          };
        } else if (row.completionStatus === 'Unconfirmed') {
          row._dirtyClass = 'alert';
          row._cellVariants = {
            completionStatus: 'alert',
          };
        }
      }
      return items;
    },
  },
};
</script>

<style scoped>
.overview {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.map-container {
  position: relative;
  overflow: hidden;
  /* flex: 0.9; */
  flex: 1.0;
  /* padding: 10px 20px; */
}

.map-overlay {
  position: absolute;
  overflow: hidden;
  top: 0;
  width: 100%;
  padding-left: 80px;
  padding-right: 20px;
  border-bottom: 1px solid #ececec;
  color: white;
  background-color: rgba(0,0,0,.7);
  z-index: 999;
}

.search-input {
  width: 150px;
  /* height: 40px; */
}

.filter-bar {
  padding: 8px;
}

.pagination {
  margin-top: 0px;
}

.custom-table {
  width: 100%;
}
</style>

<style>
.custom-table-cell {
  cursor: pointer;
}

.overview-lower .table-footer {
  margin-bottom: 0px !important;
}

.icon-status {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.icon-clock {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.color-green {
  color: #00B76F;
}

.custom-clock {
  font-size: 20px;
}


/* red is ef3135 */

.txt-status {}


/* .data-table thead tr th {
  text-align: center;
}

.data-table thead {
  background-color: rgba(0, 0, 0, 0.82);
  color: white;
}

.pagination-container {
  width: 100%;
  position: relative;
} */
</style>
