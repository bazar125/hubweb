<template>
  <div class="vehicles d-flex flex-column">
    <div class="vehicles-upper d-flex justify-content-start align-items-center">
      <table-search v-model="searchFilter"></table-search>
    </div>
    <div class="vehicles-lower d-flex flex-column justify-content-start align-items-center">
      <div class="container-vehicles d-flex flex-column justify-content-center align-items-center">
        <datatable title="Vehicles" modalId="vehicleModal" modalTitle="Vehicle" class="vehicle-table" @page-changed="pageChanged" :items="vehicleItems" :total-rows="vehicleTotalRows" :per-page="perPage" :fields="vehicleFields" :search-filter="searchFilter">
          <template slot="modal" scope="props">
            <vehicle-modal :data="props.data"></vehicle-modal>
          </template>
        </datatable>
      </div>
    </div>
  </div>
</template>

<script>
import TableSearch from '@/components/TableSearch';
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';
import VehicleModal from '@/components/VehicleModal';
import * as Firebase from 'firebase';

const vehiclePageLoader = new TablePageLoader('vehicle');
vehiclePageLoader.setSortBy('_uid');
const REFRESH_DELAY = 4000;

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

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Vehicles',
  components: {
    Datatable,
    VehicleModal,
    TableSearch,
  },
  data() {
    return {
      vehicleItems: [],
      vehicleFields: {
        currentPlate: { label: 'Plate', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        manufacturer: { label: 'Manufacturer', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        model: { label: 'Model', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        color: { label: 'Color', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        yearOfManufacture: { label: 'Year of Manufacture', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        motExpiry: { label: 'MOT Expiry', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        actions: { label: 'Actions', class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
      },
      vehicleTotalRows: 0,
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
      vehiclePageLoader.load(1).then((page) => {
        this.vehicleItems = processVehicles(page.items);
        this.vehicelTotalRows = page.totalRows;
      });

      if (this.unsub) {
        this.unsub();
      }

      const ref = Firebase.database().ref();
      this.unsub = ref.child('vehicles').on('value', () => {
        setTimeout(() => {
          this.pageChanged(this.currentPage);
        }, REFRESH_DELAY);
      });
    },
    pageChanged(newPage) {
      this.currentPage = newPage;
      vehiclePageLoader.load(newPage).then((page) => {
        this.vehicleItems = processVehicles(page.items);
        this.vehicelTotalRows = page.totalRows;
      });
    },
  },
};
</script>

<style scoped>
.vehicles {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
  background-color: #323444;
}

.vehicles-upper {
  overflow: hidden;
  height: 52px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #455a64;
}

.vehicles-lower {
  overflow: hidden;
  flex: 1;
  padding: 10px 20px;
}

.container-vehicles {
  width: 100%;
  flex: 0.5;
}

.datatable {
  width: 100%;
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
.vehicles-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
