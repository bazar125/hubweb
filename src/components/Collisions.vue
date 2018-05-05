<template>
  <div class="collisions d-flex flex-column">
    <datatable title="Collisions" modalId="collisionModal" modalTitle="Collision" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields">
      <template slot="modal" slot-scope="props">
        <collision-modal :data="props.data" modal-id="collisionModal"></collision-modal>
      </template>
    </datatable>
  </div>
</template>

<script>
import TableSearch from '@/components/TableSearch';
import Datatable from '@/components/Datatable';
import CollisionModal from '@/components/CollisionModal';
import TablePageLoader from '@/services/TablePageLoader';
import ModelFactory from '@/services/ModelFactory';
import * as Firebase from 'firebase';

const pageLoader = new TablePageLoader('collision');
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
        address: { label: 'Address', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell custom-datatable-address-cell' },
        description: { label: 'Description', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        attendingOfficer: { label: 'Attending Officer', sortable: true, class: 'text-center vertical-middle', thClass: 'shorten-header', tdClass: 'custom-datatable-cell custom-datatable-address-cell' },
        allDrivers: { label: 'Drivers', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell custom-datatable-address-cell' },
        allVehicles: { label: 'Vehicles', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell custom-datatable-address-cell' },
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
        ModelFactory.collision(row);
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
  /* background-color: #2c2e4a; */
  background-color: #ececec;
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

.collisions >>> .dark-card {
  width: 100%;
  flex: 1;
}

.collisions >>> .datatable {
  flex: 1;
  width: 100% !important;
}
</style>

<style>
.collisions-lower .table-footer {
  margin-bottom: 0px !important;
}
</style>
