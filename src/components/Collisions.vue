<template>
  <div class="collisions d-flex flex-column">
    <div class="collisions-upper d-flex justify-content-start align-items-center">
      <table-search v-model="searchFilter"></table-search>
    </div>

    <div class="collisions-lower d-flex flex-column justify-content-start align-items-center">
      <datatable title="Collisions" modalId="collisionModal" modalTitle="Collision" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields" :search-filter="searchFilter">
        <template slot="modal" scope="props">
          <collision-modal :data="props.data"></collision-modal>
        </template>
      </datatable>
    </div>
  </div>
</template>

<script>
import TableSearch from '@/components/TableSearch';
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';
import CollisionModal from '@/components/CollisionModal';

const pageLoader = new TablePageLoader('collision');

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Collisions',
  components: {
    TableSearch,
    Datatable,
    CollisionModal,
  },
  data() {
    return {
      items: [],
      fields: {
        reference: { label: 'Reference', sortable: true, class: 'text-center vertical-middle' },
        date: { label: 'Date', sortable: true, class: 'text-center vertical-middle' },
        time: { label: 'Time', sortable: true, class: 'text-center vertical-middle' },
        address: { label: 'Address', sortable: true, class: 'text-center vertical-middle' },
        description: { label: 'Description', sortable: true, class: 'text-center vertical-middle' },
        attendingOfficer: { label: 'Attending Officer', sortable: true, class: 'text-center vertical-middle' },
        allDrivers: { label: 'Drivers', sortable: true, class: 'text-center vertical-middle' },
        allVehicles: { label: 'Vehicles', sortable: true, class: 'text-center vertical-middle' },
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
      for (let i = 0; i < items.length; i += 1) {
        const row = items[i];

        row.allDrivers = [];
        for (let j = 0; j < row.drivers.length; j += 1) {
          const driver = row.drivers[j];
          row.allDrivers.push(driver.name);
        }
        row.allDrivers = row.allDrivers.join(', ');

        row.allVehicles = [];
        for (let j = 0; j < row.vehicles.length; j += 1) {
          const vehicle = row.vehicles[j];
          row.allVehicles.push(vehicle.plate);
        }
        row.allVehicles = row.allVehicles.join(', ');
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
  height: 52px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #455a64;
}

.collisions-lower {
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
