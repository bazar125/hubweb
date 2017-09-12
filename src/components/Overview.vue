<template>
  <div class="overview d-flex flex-column">
    <div class="overview-upper d-flex justify-content-start align-items-center">
      <b-form-input class="search-input" size="sm" v-model="searchFilter" placeholder="Type to Search" />
    </div>

    <div class="overview-lower d-flex flex-column justify-content-start align-items-center">
      <v-map :zoom=13 :center="[47.413220, -1.219482]">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker :lat-lng="[47.413220, -1.219482]"></v-marker>
      </v-map>
    </div>
  </div>
</template>

<script>
import TablePageLoader from '@/services/TablePageLoader';

const pageLoader = new TablePageLoader('citation');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Overview',
  components: {
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

.overview-upper {
  overflow: hidden;
  flex: 0.1;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #ececec;
}

.overview-lower {
  overflow: hidden;
  flex: 0.9;
  padding: 10px 20px;
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
