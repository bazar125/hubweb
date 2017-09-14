<template>
  <div class="collisions d-flex flex-column">
    <div class="collisions-upper d-flex justify-content-start align-items-center">
      <table-search v-model="searchFilter"></table-search>
    </div>

    <div class="collisions-lower d-flex flex-column justify-content-start align-items-center">
      <datatable title="Collisions" modalId="collisionModal" modalTitle="Collision" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields">
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
import * as Firebase from 'firebase';

const pageLoader = new TablePageLoader('collision');
const MAPS_API_KEY = 'AIzaSyD5XSex8F-5VHZtQ8io0T9BFf8O3zg9yZg';
const DEBOUNCE_DELAY = 200;
const REFRESH_DELAY = 4000;

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
        reference: { label: 'Reference', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        date: { label: 'Date', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        time: { label: 'Time', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        address: { label: 'Address', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        description: { label: 'Description', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        attendingOfficer: { label: 'Attending Officer', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        allDrivers: { label: 'Drivers', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        allVehicles: { label: 'Vehicles', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        actions: { label: 'Actions', class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
      },
      totalRows: 0,
      perPage: 13,
      searchFilter: '',
      currentPage: 1,
      unsub: null,
      searchQuery: null,
    };
  },
  mounted() {
    this.initialize();
  },
  watch: {
    searchFilter(newValue) {
      if (!newValue) {
        this.searchFilter = '';
        this.searchQuery = null;
        this.debounce(() => {
          this.pageChanged(1);
        }, DEBOUNCE_DELAY).bind(this)();

        return;
      }

      // const parsedInt = parseInt(newValue, 10);
      // let refInt = parsedInt;
      // if (!refInt) {
      //   refInt = 0;
      // }

      this.searchQuery = {
        bool: {
          should: [
            {
              match_phrase_prefix: { address: newValue },
            },
            {
              match_phrase_prefix: { reference: newValue },
            },
          ],
        },
      };

      this.debounce(() => {
        this.pageChanged(this.currentPage);
      }, DEBOUNCE_DELAY).bind(this)();
    },
  },
  methods: {
    initialize() {
      this.currentPage = 1;
      pageLoader.load(1).then((page) => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });

      if (this.unsub) {
        this.unsub();
      }

      const ref = Firebase.database().ref();
      this.unsub = ref.child('collisions').on('value', () => {
        setTimeout(() => {
          this.pageChanged(this.currentPage);
        }, REFRESH_DELAY);
      });
    },
    pageChanged(newPage) {
      this.currentPage = newPage;
      pageLoader.load(newPage, this.searchQuery).then((page) => {
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

        const lat = row.coords ? row.coords.lat : 10.3080;
        const lng = row.coords ? row.coords.lng : 7.0142;
        const width = 200;
        const height = 200;

        row.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=${width}x${height}&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${MAPS_API_KEY}`;
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
    debounce(callback, wait, context = this) {
      let timeout = null;
      let callbackArgs = null;

      const later = () => callback.apply(context, callbackArgs);

      /* eslint-disable prefer-rest-params */
      return () => {
        callbackArgs = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
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
