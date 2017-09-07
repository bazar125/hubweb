<template>
  <div class="landing d-flex flex-column">
    <div class="landing-upper d-flex">
    </div>
    
    <div class="landing-lower d-flex flex-column justify-content-start align-items-center">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  components: {
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
};
</script>


<style scoped>
.landing {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.landing-upper {
  overflow: hidden;
  background-color: rosybrown;
  flex: 0.15;
}

.landing-lower {
  overflow: hidden;
  flex: 0.85;
  padding: 20px;
}

.landing-carousel {
  padding-left: 15px;
  padding-top: 20px;
  flex: 0.6;
}

.fuel-price-widget {
  padding-right: 15px;
  flex: 0.4;
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
