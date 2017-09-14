<template>
  <div class="citations d-flex flex-column">
    <div class="citations-upper d-flex justify-content-start align-items-center">
      <table-search v-model="searchFilter"></table-search>
    </div>

    <div class="citations-lower d-flex flex-column justify-content-start align-items-center">
      <datatable title="Citations" modalId="citationModal" modalTitle="Citation" @resetModal="resetModal()" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields">
        <template slot="modal" scope="props">
          <citation-modal :data="props.data"></citation-modal>
        </template>
      </datatable>
    </div>
  </div>
</template>

<script>
import TableSearch from '@/components/TableSearch';
import TablePageLoader from '@/services/TablePageLoader';
import Datatable from '@/components/Datatable';
import CitationModal from '@/components/CitationModal';
import * as Firebase from 'firebase';

const pageLoader = new TablePageLoader('citation');
const DEBOUNCE_DELAY = 200;
const REFRESH_DELAY = 4000;
const MAPS_API_KEY = 'AIzaSyD5XSex8F-5VHZtQ8io0T9BFf8O3zg9yZg';

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Citations',
  components: {
    TableSearch,
    Datatable,
    CitationModal,
  },
  data() {
    return {
      items: [],
      fields: {
        completionStatus: { label: 'Status', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        date: { label: 'Date', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        time: { label: 'Time', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        paymentReference: { label: 'Reference', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        fineAmount: { label: 'Fine', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        driverName: { label: 'Name', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
        vehicleRegistration: { label: 'Plate', sortable: true, class: 'text-center vertical-middle', tdClass: 'custom-datatable-cell' },
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

      this.searchQuery = {
        bool: {
          should: [
            {
              match_phrase_prefix: { driverName: newValue },
            },
            {
              match_phrase_prefix: { vehicleRegistration: newValue },
            },
            {
              match_phrase_prefix: { paymentReference: newValue },
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
      this.searchFilter = '';
      this.searchQuery = null;
      pageLoader.load(1).then((page) => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });

      if (this.unsub) {
        this.unsub();
      }

      const ref = Firebase.database().ref();
      this.unsub = ref.child('citations').on('value', () => {
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
        if (row.completionStatus === 'Overdue') {
          row._dirtyClass = 'danger';
          row._cellVariants = {
            completionStatus: 'danger',
          };
        } else if (row.completionStatus === 'Awaiting Payment') {
          row._dirtyClass = 'alert';
          row._cellVariants = {
            completionStatus: 'alert',
          };
        } else if (row.completionStatus === 'Paid') {
          row._dirtyClass = 'success';
          row._cellVariants = {
            completionStatus: 'success',
          };
        }

        const lat = row.coords ? row.coords.lat : 10.3080;
        const lng = row.coords ? row.coords.lng : 7.0142;
        const width = 200;
        const height = 200;

        row.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=${width}x${height}&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${MAPS_API_KEY}`;
      }
      return items;
    },
    resetModal() {
      this.pageChanged(this.currentPage);
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
.citations {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.citations-upper {
  overflow: hidden;
  /* flex: 0.1; */
  height: 52px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #455a64;
}

.citations-lower {
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






















/* 
.custom-pagination-info {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
} */

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
.vuetable-pagination .page-item {
  cursor: pointer;
}

.custom-table-cell {
  cursor: pointer;
}

.citations-lower .table-footer {
  margin-bottom: 0px !important;
}


































/* .data-table thead tr th {
  text-align: center;
}

.data-table thead {
  background-color: rgba(0, 0, 0, 0.82);
  color: white;
}

.pagination-container {
  width: 100%;
  position: relative;
} */
</style>
