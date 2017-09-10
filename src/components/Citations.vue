<template>
  <div class="citations d-flex flex-column">
    <div class="citations-upper d-flex justify-content-start align-items-center">
      <b-form-input class="search-input" size="sm" v-model="searchFilter" placeholder="Type to Search" />
    </div>

    <div class="citations-lower d-flex flex-column justify-content-start align-items-center">
      <datatable title="Citations" modalId="citationModal" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields" :search-filter="searchFilter">
        <template slot="modal" scope="props">
            <h4 class="my-1 py-1" slot="modal-header">{{ props.data.paymentReference }}</h4>
            <pre>{{ props.data }}</pre>
        </template>
      </datatable>
    </div>
  </div>
</template>

<script>
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';

const pageLoader = new TablePageLoader('citation');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Citations',
  components: {
    Datatable,
  },
  data() {
    return {
      items: [],
      fields: {
        completionStatus: { label: 'Status', sortable: true, class: 'text-center vertical-middle' },
        date: { label: 'Date', sortable: true, class: 'text-center vertical-middle' },
        time: { label: 'Time', sortable: true, class: 'text-center vertical-middle' },
        paymentReference: { label: 'Reference', sortable: true, class: 'text-center vertical-middle' },
        fineAmount: { label: 'Fine', sortable: true, class: 'text-center vertical-middle' },
        driverName: { label: 'Name', sortable: true, class: 'text-center vertical-middle' },
        vehicleRegistration: { label: 'Plate', sortable: true, class: 'text-center vertical-middle' },
        actions: { label: 'Actions', class: 'text-center vertical-middle' },
        // citationCode:
        // citationDescription:
        // coords
        // lat:
        // lng:
        // identity:
        // issuingOfficers: {}
        // location: {},
        // timestamp:
        // additionalPenalty:
        // { label: 'Person age', sortable: true, class: 'text-center vertical-middle' },
      },
      totalRows: 0,
      perPage: 10,
      searchFilter: '',
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
.citations {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.citations-upper {
  overflow: hidden;
  flex: 0.1;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #ececec;
}

.citations-lower {
  overflow: hidden;
  flex: 0.9;
  padding: 10px 20px;
}

.datatable {
  width: 100%;
}

.search-input {
  width: 150px;
  /* height: 40px; */
}


/* 
.custom-pagination-info {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
} */

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
.vuetable-pagination .page-item {
  cursor: pointer;
}

.custom-table-cell {
  cursor: pointer;
}

.citations-lower .table-footer {
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
