<template>
  <div class="personnel d-flex flex-column">
    <div class="personnel-upper d-flex justify-content-start align-items-center">
      <table-search v-model="searchFilter"></table-search>
    </div>

    <div class="personnel-lower d-flex flex-column justify-content-start align-items-center">
      <datatable title="Personnel" modalId="personnelModal" modalTitle="Personnel" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields" :search-filter="searchFilter">
        <template slot="modal" scope="props">
          <h4 class="my-1 py-1" slot="modal-header">{{ props.data.paymentReference }}</h4>
          <pre>{{ props.data }}</pre>
        </template>
      </datatable>
    </div>
  </div>
</template>

<script>
import TableSearch from '@/components/TableSearch';
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';

const pageLoader = new TablePageLoader('personnel');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Personnel',
  components: {
    TableSearch,
    Datatable,
  },
  data() {
    return {
      items: [],
      fields: {

      },
      totalRows: 0,
      perPage: 15,
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
.personnel {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.personnel-upper {
  overflow: hidden;
  height: 52px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #455a64;
}

.personnel-lower {
  overflow: hidden;
  flex: 1;
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
