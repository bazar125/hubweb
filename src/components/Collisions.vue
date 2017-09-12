<template>
  <div class="collisions d-flex flex-column">
    <div class="collisions-upper d-flex justify-content-start align-items-center">
      <b-form-input class="search-input" size="sm" v-model="searchFilter" placeholder="Type to Search" />
    </div>

    <div class="collisions-lower d-flex flex-column justify-content-start align-items-center">
      <datatable title="Collisions" modalId="collisionModal" modalTitle="Collisions" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields" :search-filter="searchFilter">
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

const pageLoader = new TablePageLoader('collision');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Collisions',
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
    //   for (let i = 0; i < items.length; i += 1) {
    //     const row = items[i];
    //     if (row.completionStatus === 'Payment Due') {
    //       row._dirtyClass = 'danger';
    //       row._cellVariants = {
    //         completionStatus: 'danger',
    //       };
    //     } else if (row.completionStatus === 'Unconfirmed') {
    //       row._dirtyClass = 'alert';
    //       row._cellVariants = {
    //         completionStatus: 'alert',
    //       };
    //     }
    //   }
      return items;
    },
  },
};
</script>

<style scoped>
.collisions {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.collisions-upper {
  overflow: hidden;
  flex: 0.1;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #ececec;
}

.collisions-lower {
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
.collisions-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
