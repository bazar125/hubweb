<template>
<div class="personnel d-flex flex-column justify-content-start align-items-center">
    <datatable title="Personnel" modalId="modalUserDetails" modalTitle="Personnel" @resetModal="resetModal()" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields">
      <template slot="modal" slot-scope="props">
        <modal-user-details :user="props.data" modal-id="modalUserDetails"></modal-user-details>
      </template>
    </datatable>
  </div>
  <!-- <div class="personnel d-flex flex-column">
    
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
  </div> -->
</template>

<script>
import TableSearch from '@/components/TableSearch';
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';
import ModalUserDetails from '@/components/ModalUserDetails';

const pageLoader = new TablePageLoader('user');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Personnel',
  components: {
    TableSearch,
    Datatable,
    ModalUserDetails,
  },
  data() {
    return {
      items: [],
      fields: {
        role: {
          label: 'Role',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        firstName: {
          label: 'First Name',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        middleName: {
          label: 'Middle Name(s)',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        lastName: {
          label: 'Last Name',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        email: {
          label: 'Email',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        state: {
          label: 'State',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        // currentDeploymentZone: {
        //   label: 'Zone',
        //   sortable: true,
        //   class: 'text-center vertical-middle',
        //   tdClass: 'custom-datatable-cell',
        // },
        actions: {
          label: 'Actions',
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
      },
      totalRows: 0,
      perPage: 13,
      searchFilter: '',
      searchQuery: null,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.searchQuery = {
        bool: {
          must: [
            {
              term: { accountType: 'officer' },
            },
          ],
        },
      };
      pageLoader.load(1, this.searchQuery).then(page => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });
    },
    pageChanged(newPage) {
      pageLoader.load(newPage, this.searchQuery).then(page => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });
    },
    processRows(items) {
      for (let i = 0; i < items.length; i += 1) {
        const user = items[i];
        user.role = 'Officer';
        if (!user.middleName) {
          user.middleName = '-';
        }
        // if (row.completionStatus === 'Payment Due') {
        //   row._dirtyClass = 'danger';
        //   row._cellVariants = {
        //     completionStatus: 'danger',
        //   };
        // } else if (row.completionStatus === 'Unconfirmed') {
        //   row._dirtyClass = 'alert';
        //   row._cellVariants = {
        //     completionStatus: 'alert',
        //   };
        // }
      }
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
  /* background-color: #2c2e4a; */
  background-color: #ececec;
  padding: 10px;
  padding-right: 0px;
}

.personnel>>>.modal-body {
  padding: 0px !important;
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
.personnel>>>.dark-card {
  width: 100%;
  flex: 1;
}

.personnel>>>.datatable {
  flex: 1;
  width: 100% !important;
}
</style>

<style>
.collisions-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
