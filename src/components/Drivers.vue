<template>
  <div class="drivers d-flex flex-column">
    <div class="drivers-upper d-flex justify-content-start align-items-center">
      <b-form-input class="search-input" size="sm" v-model="searchFilter" placeholder="Type to Search" />
    </div>

    <div class="drivers-lower d-flex flex-column justify-content-start align-items-center">
      <div class="container-drivers d-flex flex-column justify-content-center align-items-center">
        <datatable title="Drivers" modalId="driverModal" modalTitle="Driver" class="driver-table" @page-changed="pageChanged" :items="driverItems" :total-rows="driverTotalRows" :per-page="perPage" :fields="driverFields" :search-filter="searchFilter">
          <template slot="modal" scope="props">
            <driver-modal :data="props.data"></driver-modal>
          </template>
        </datatable>
      </div>
    </div>
  </div>
</template>

<script>
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';
import DriverModal from '@/components/DriverModal';

const driverPageLoader = new TablePageLoader('driver');

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
  }
  return items;
}

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Drivers',
  components: {
    Datatable,
    DriverModal,
  },
  data() {
    return {
      driverItems: [],
      driverFields: {
        firstName: { label: 'First Name', sortable: true, class: 'text-center vertical-middle' },
        lastName: { label: 'Last Name', sortable: true, class: 'text-center vertical-middle' },
        dob: { label: 'Date of Birth', sortable: true, class: 'text-center vertical-middle' },
        gender: { label: 'Gender', sortable: true, class: 'text-center vertical-middle' },
        height: { label: 'Height', sortable: true, class: 'text-center vertical-middle' },
        licenseExpiry: { label: 'License Expiry', sortable: true, class: 'text-center vertical-middle' },
        citationPoints: { label: 'Points', sortable: true, class: 'text-center vertical-middle' },
        actions: { label: 'Actions', class: 'text-center vertical-middle' },
      },
      driverTotalRows: 0,
      perPage: 10,
      searchFilter: '',
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      driverPageLoader.load(1).then((page) => {
        this.driverItems = processDrivers(page.items);
        this.driverTotalRows = page.totalRows;
      });
    },
    pageChanged(newPage) {
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
}

.drivers-upper {
  overflow: hidden;
  flex: 0.1;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #ececec;
}

.drivers-lower {
  overflow: hidden;
  flex: 0.9;
  padding: 10px 20px;
}

.container-drivers {
  width: 100%;
  flex: 0.5;
}

.datatable {
  width: 100%;
}

.driver-table {
  flex: 1;
  margin-bottom: 10px;
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

.drivers-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
