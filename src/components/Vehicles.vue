<template>
  <div class="vehicles d-flex flex-column">
    <datatable title="Vehicles" modalId="vehicleModal" modalTitle="Vehicle" @page-changed="pageChanged" :items="vehicleItems" :total-rows="vehicleTotalRows" :per-page="perPage" :fields="vehicleFields">
      <template slot="modal" slot-scope="props">
        <vehicle-modal :data="props.data" modal-id="vehicleModal"></vehicle-modal>
      </template>
    </datatable>
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
  background-color: #ececec;
  /* background-color: #2c2e4a; */
  padding: 8px;
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

.vehicles>>>.dark-card {
  width: 100%;
  flex: 1;
}

.vehicles>>>.datatable {
  flex: 1;
  width: 100% !important;
}
</style>

<style>
.vehicles-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
