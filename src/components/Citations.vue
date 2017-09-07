<template>
  <div class="citations d-flex flex-column">
    <div class="citations-upper d-flex justify-content-start align-items-center">
      <b-form-input class="search-input" size="sm" v-model="filter" placeholder="Type to Search" />
    </div>

    <div class="citations-lower d-flex flex-column justify-content-start align-items-center">
      <datatable :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields"></datatable>
    </div>
  </div>
</template>

<script>
import FlashlightSearch from '@/services/FlashlightSearch';
import Datatable from '@/components/Datatable';

const flashlightSearch = new FlashlightSearch();

export default {
  name: 'Citations',
  components: {
    Datatable,
  },
  data() {
    return {
      items: [],
      fields: {
        date: { label: 'Date', sortable: true, class: 'text-center vertical-middle' },
        time: { label: 'Time', sortable: true, class: 'text-center vertical-middle' },
        paymentReference: { label: 'Reference', sortable: true, class: 'text-center vertical-middle' },
        completionStatus: { label: 'Status', sortable: true, class: 'text-center vertical-middle' },
        fineAmount: { label: 'Fine', sortable: true, class: 'text-center vertical-middle' },
        driverName: { label: 'Name', sortable: true, class: 'text-center vertical-middle' },
        vehicleRegistration: { label: 'Plate', sortable: true, class: 'text-center vertical-middle' },
        actions: { label: 'Actions', class: 'text-center vertical-middle' },
      },
      totalRows: 0,
      perPage: 10,
      // citationCode:
      // citationDescription:
      // coords
      // lat:
      // lng:
      // identity:
      // issuingOfficers: {}
      // location: {},
      // timestamp:
      // additionalPenalty:
      // { label: 'Person age', sortable: true, class: 'text-center vertical-middle' },
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      /*
"body": [
  "query": [
      "bool": [
          "must": [
              [ "match_phrase_prefix": [ "firstName": searchTokens[0]] ],
              [ "match_phrase_prefix": [ "lastName": searchTokens[1]] ]
          ]
      ]
  ]
      */
      const query = {
        query: {
          match_all: { boost: 1.0 },
        },
      };
      // const from = 1;
      // const size = 1;
      /* eslint-disable no-underscore-dangle */
      flashlightSearch.search('citation', query).then((dat) => {
        console.log(dat);
        for (let i = 0; i < dat.hits.length; i += 1) {
          const hit = dat.hits[i];
          if (hit.completionStatus === 'Payment Due') {
            hit._rowVariant = 'danger';
          } else if (hit.completionStatus === 'Unconfirmed') {
            hit._rowVariant = 'alert';
          }
        }
        this.items = dat.hits;
        this.totalRows = dat.total;
        // this.totalRows = dat.
      });
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
  background-color: rosybrown;
  flex: 0.1;
  padding-left: 20px;
  padding-right: 20px;
}

.citations-lower {
  overflow: hidden;
  flex: 0.9;
  padding: 20px;
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
