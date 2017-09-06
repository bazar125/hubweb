<template>
  <div class="citations d-flex flex-column">
    <div class="citations-upper d-flex">
    </div>

    <div class="citations-lower d-flex flex-column justify-content-start align-items-center">
      <datatable></datatable>
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
      flashlightSearch.search('citation', query).then((dat) => {
        console.log(dat);
        console.log(this.data);
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
  flex: 0.15;
}

.citations-lower {
  overflow: hidden;
  flex: 0.85;
  padding: 20px;
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
