<template>
  <div class="database d-flex flex-column">
    <div class="database-upper d-flex justify-content-start align-items-center">
      <b-form-input class="search-input" size="sm" v-model="searchFilter" placeholder="Type to Search" />
    </div>

    <div class="database-lower d-flex flex-column justify-content-start align-items-center">
      <div class="container-drivers d-flex flex-column justify-content-center align-items-center">
        <datatable title="Drivers" modalId="driverModal" class="driver-table" @page-changed="pageChanged" :items="vehicleItems" :total-rows="vehicleTotalRows" :per-page="perPage" :fields="vehicleFields" :search-filter="searchFilter">
          <template slot="modal" scope="props">
            <h4 class="my-1 py-1" slot="modal-header">{{ props.data.paymentReference }}</h4>
            <pre>{{ props.data }}</pre>
          </template>
        </datatable>
      </div>

      <div class="container-vehicles d-flex flex-column justify-content-center align-items-center">
        <datatable title="Vehicles" modalId="vehicleModal" class="vehicle-table" @page-changed="pageChanged" :items="driverItems" :total-rows="driverTotalRows" :per-page="perPage" :fields="driverFields" :search-filter="searchFilter">
          <template slot="modal" scope="props">
            <h4 class="my-1 py-1" slot="modal-header">{{ props.data.paymentReference }}</h4>
            <pre>{{ props.data }}</pre>
          </template>
        </datatable>
      </div>
    </div>
  </div>
</template>

<script>
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';

const vehiclePageLoader = new TablePageLoader('vehicle');
const driverPageLoader = new TablePageLoader('driver');

/* eslint-disable no-underscore-dangle */
function processVehicles(items) {
  const now = Date.now();
  for (let i = 0; i < items.length; i += 1) {
    const row = items[i];
    const motExpiry = Date.parse(row.motExpiry);
    if (now > motExpiry) {
      row._dirtyClass = 'danger';
      row._cellVariants = {
        motExpiry: 'danger',
      };
    }
  }
  return items;
}

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
  name: 'Database',
  components: {
    Datatable,
  },
  data() {
    return {
      vehicleItems: [],
      driverItems: [],
      vehicleFields: {
        currentPlate: { label: 'Plate', sortable: true, class: 'text-center vertical-middle' },
        manufacturer: { label: 'Manufacturer', sortable: true, class: 'text-center vertical-middle' },
        model: { label: 'Model', sortable: true, class: 'text-center vertical-middle' },
        color: { label: 'Color', sortable: true, class: 'text-center vertical-middle' },
        yearOfManufacture: { label: 'Year of Manufacture', sortable: true, class: 'text-center vertical-middle' },
        motExpiry: { label: 'MOT Expiry', sortable: true, class: 'text-center vertical-middle' },
        actions: { label: 'Actions', class: 'text-center vertical-middle' },
      },
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
      vehicleTotalRows: 0,
      driverTotalRows: 0,
      perPage: 4,
      searchFilter: '',
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      vehiclePageLoader.load(1).then((page) => {
        this.vehicleItems = processVehicles(page.items);
        this.vehicelTotalRows = page.totalRows;
      });

      driverPageLoader.load(1).then((page) => {
        this.driverItems = processDrivers(page.items);
        this.driverTotalRows = page.totalRows;
      });
    },
    pageChanged(newPage) {
      vehiclePageLoader.load(newPage).then((page) => {
        this.vehicleItems = processVehicles(page.items);
        this.vehicelTotalRows = page.totalRows;
      });

      driverPageLoader.load(newPage).then((page) => {
        this.driverItems = processDrivers(page.items);
        this.driverTotalRows = page.totalRows;
      });
    },
  },
};
</script>

<style scoped>
.database {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.database-upper {
  overflow: hidden;
  flex: 0.1;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #ececec;
}

.database-lower {
  overflow: hidden;
  flex: 0.9;
  padding: 10px 20px;
}

.container-drivers {
  width: 100%;
  flex: 0.5;
}

.container-vehicles {
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

.vehicle-table {
  flex: 1;
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

.database-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
