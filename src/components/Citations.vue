<template>
  <div class="citations d-flex flex-column">
    <div class="citations-upper d-flex">
    </div>

    <div class="citations-lower d-flex flex-column justify-content-start align-items-center">
      <!-- <my-vuetable :api-mode="false" :data="data" :data-total="dataTotal" :data-manager="dataManager" :fields="fields" :sort-order="sortOrder" :append-params="moreParams" :per-page="7" detail-row-component="my-detail-row">
          <template slot="actions" scope="props">
            <div class="custom-actions">
              <button class="btn btn-outline-primary btn-sm" @click="onAction('view-item', props.rowData, props.rowIndex)">
                <icon name="search-plus"></icon>
              </button>
            </div>
          </template>
        </my-vuetable> -->
      <vue-good-table class="custom-table" :perPage="7" :columns="columns" :rows="rows" :paginate="true" :lineNumbers="true" />
    </div>
  </div>
</template>

<script>
import FlashlightSearch from '@/services/FlashlightSearch';
// import CitationFieldDefs from '@/components/Vuetable/CitationFieldDefs';
// import MyVuetable from '@/components/Vuetable/MyVuetable';

const flashlightSearch = new FlashlightSearch();

export default {
  name: 'Citations',
  components: {
    // MyVuetable,
  },
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          // filterable: true,
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
          html: false,
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          inputFormat: 'YYYYMMDD',
          outputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
          html: false,
        },
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '201-10-31:9:35 am', score: 0.03343 },
        { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 },
        { id: 7, name: 'Jane', age: 24, createdAt: '20111031' },
        { id: 8, name: 'Susan', age: 16, createdAt: '2013-10-31', score: 0.03343 },
        { id: 9, name: 'Chris', age: 55, createdAt: '2012-10-31', score: 0.03343 },
        { id: 10, name: 'Dan', age: 40, createdAt: '2011-10-31', score: 0.03343 },
        { id: 11, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 },
        { id: 12, name: 'Jane', age: 24, createdAt: '2011-07-31', score: 0.03343 },
        { id: 13, name: 'Susan', age: 16, createdAt: '2017-02-28', score: 0.03343 },
        { id: 14, name: 'Chris', age: 55, createdAt: '', score: 0.03343 },
        { id: 15, name: 'Dan', age: 40, createdAt: '2011-10-31', score: 0.03343 },
        { id: 19, name: 'Chris', age: 55, createdAt: '2011-10-31', score: 0.03343 },
        { id: 20, name: 'Dan', age: 40, createdAt: '2011-10-31', score: 0.03343 },
      ],
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
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage() {
    },
    onAction(action, data, index) {
      return `${action}${data}${index}`;
      // console.log('slot action: ' + action, data.name, index)
    },
    dataManager(sortOrder, pag) {
      console.log('dataManager: ', sortOrder, pag);
      const data = this.data.data;
      // account for search filter
      // if (this.searchFor) {
      //   // the text should be case insensitive
      //   let txt = new RegExp(this.searchFor, 'i');

      //   // search on name, email, and nickname
      //   data = _.filter(data, function(item) {
      //     return item.name.search(txt) >= 0 ||
      // item.email.search(txt) >= 0 || item.nickname.search(txt) >= 0
      //   });
      // }

      // sortOrder can be empty, so we have to check for that as well
      // if (sortOrder.length > 0) {
      //   data = _.orderBy(data, sortOrder[0].sortField, sortOrder[0].direction);
      // }

      // since the filter might affect the total number of records
      // we can ask Vuetable to recalculate the pagination for us
      // by calling makePagination()
      const pagination = this.$refs.vuetable.makePagination(data.length);

      return {
        links: {
          pagination,
        },
        data: this.data.data,
        // data: _.slice(data, pagination.from - 1, pagination.to),
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
