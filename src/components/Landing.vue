<template>
  <div class="landing d-flex flex-column">
    <div class="landing-upper d-flex">
    </div>
  
    <div class="landing-lower d-flex flex-column justify-content-start align-items-center">
      <vuetable ref="vuetable"      
      api-url="https://vuetable.ratiw.net/api/users"
      pagination-path=""
      @vuetable:pagination-data="onPaginationData"
      :css="css"
      :per-page="7"
      :fields="['name', 'email', 'birthdate', 'address.line1', 'address.line2', 'address.zipcode']">
      </vuetable>
  
      <div class="d-flex justify-content-center align-items-center pagination-container">
        <vuetable-pagination-info class="mx-auto" ref="paginationInfo"></vuetable-pagination-info>
        <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
      </div>
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
      css: {
        tableClass: 'table table-striped table-bordered data-table',
        titleClass: 'thead-inverse',
        loadingClass: 'loading',
        ascendingIcon: 'blue chevron up icon',
        descendingIcon: 'blue chevron down icon',
        detailRowClass: 'vuetable-detail-row',
        handleIcon: 'grey sidebar icon',
      },
    };
  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
  },
};
</script>


<style scoped>
.landing {
  height: 100%;
}

.landing-upper {
  overflow: hidden;
  background-color: yellowgreen;
  flex: 0.2;
}

.landing-lower {
  overflow: hidden;
  flex: 0.8;
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
</style>

<style>
.data-table thead tr th {
  text-align: center;
}

.data-table thead {
  background-color: rgba(0, 0, 0, 0.82);
  color: white;
}

.pagination-container {
  width: 100%;
}
</style>
