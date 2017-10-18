<template>
  <div class="drivers d-flex flex-column">
    <datatable title="Drivers" modalId="driverModal" modalTitle="Driver" @page-changed="pageChanged" :items="driverItems" :total-rows="driverTotalRows" :per-page="perPage" :fields="driverFields">
      <template slot="modal" scope="props">
        <driver-modal :data="props.data" modal-id="driverModal"></driver-modal>
      </template>
    </datatable>
  </div>
</template>

<script>
import TableSearch from '@/components/TableSearch';
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';
import DriverModal from '@/components/DriverModal';
import * as Firebase from 'firebase';

const REFRESH_DELAY = 4000;
const driverPageLoader = new TablePageLoader('driver');
driverPageLoader.setSortBy('_uid');

/* eslint-disable no-underscore-dangle */
function processDrivers(items) {
  const now = Date.now();
  for (let i = 0; i < items.length; i += 1) {
    const row = items[i];
    const licenseExpiry = Date.parse(row.licenseExpiry);
    if (now > licenseExpiry) {
      row._dirtyClass = 'danger';
      row._cellVariants = {
        licenseExpiry: 'danger',
      };
    }
    if (row.citationPoints > 0) {
      row._dirtyClass = 'danger';
      row._cellVariants = {
        citationPoints: 'danger',
      };
    }
    if (row.status === 'Unverified') {
      row._dirtyClass = 'wwarning';
      row._cellVariants = {
        status: 'wwarning',
      };
    } else {
      row.status = 'Verified';
    }
  }
  return items;
}

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Drivers',
  components: {
    Datatable,
    DriverModal,
    TableSearch,
  },
  data() {
    return {
      driverItems: [],
      driverFields: {
        status: { label: 'Status', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        firstName: { label: 'First Name', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        lastName: { label: 'Last Name', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        dob: { label: 'Date of Birth', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        gender: { label: 'Gender', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        height: { label: 'Height', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        licenseExpiry: { label: 'License Expiry', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        citationPoints: { label: 'Points', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        actions: { label: 'Actions', class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
      },
      driverTotalRows: 0,
      perPage: 13,
      searchFilter: '',
      currentPage: 1,
      unsub: null,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.currentPage = 1;
      driverPageLoader.load(1).then((page) => {
        this.driverItems = processDrivers(page.items);
        this.driverTotalRows = page.totalRows;
      });

      if (this.unsub) {
        this.unsub();
      }

      const ref = Firebase.database().ref();
      this.unsub = ref.child('drivers').on('value', () => {
        setTimeout(() => {
          this.pageChanged(this.currentPage);
        }, REFRESH_DELAY);
      });
    },
    pageChanged(newPage) {
      this.currentPage = newPage;
      driverPageLoader.load(newPage).then((page) => {
        this.driverItems = processDrivers(page.items);
        this.driverTotalRows = page.totalRows;
      });
    },
  },
};
</script>

<style scoped>
.drivers {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
  /* background-color: #2c2e4a; */
  background-color: #ececec;
  padding: 10px;
  padding-right: 0px;
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

.drivers>>>.dark-card {
  width: 100%;
  flex: 1;
}

.drivers>>>.datatable {
  flex: 1;
  width: 100% !important;
}
</style>

<style>
.custom-table-cell {
  cursor: pointer;
}

.drivers-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
