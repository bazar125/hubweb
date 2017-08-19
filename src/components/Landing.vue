<template>
  <div class="landing d-flex flex-column">
    <div class="landing-upper d-flex">
    </div>
  
    <!-- <div class="landing-lower d-flex flex-column justify-content-start align-items-center"> -->
    <div class="landing-lower d-flex flex-column justify-content-start align-items-center">
      <my-vuetable api-url="https://vuetable.ratiw.net/api/users" :fields="fields" :sort-order="sortOrder" :append-params="moreParams" :per-page="7" detail-row-component="my-detail-row">
        <template slot="actions" scope="props">
          <div class="custom-actions">
            <button class="btn btn-default btn-sm" @click="onAction('view-item', props.rowData, props.rowIndex)">
              <span class="glyphicon glyphicon-zoom-in"></span>
            </button>
            <button class="btn btn-default btn-sm" @click="onAction('edit-item', props.rowData, props.rowIndex)">
              <i class="glyphicon glyphicon-pencil"></i>
            </button>
            <button class="btn btn-default btn-sm" @click="onAction('delete-item', props.rowData, props.rowIndex)">
              <i class="glyphicon glyphicon-trash"></i>
            </button>
          </div>
        </template>
      </my-vuetable>
  
      <!-- <vuetable ref="vuetable"      
          api-url="https://vuetable.ratiw.net/api/users"
          pagination-path=""
          @vuetable:pagination-data="onPaginationData"
          :css="css"
          :per-page="7"
          :fields="['name', 'email', 'birthdate', 'address.line1', 'address.line2', 'address.zipcode']">
          </vuetable>
      
          <div class="d-flex justify-content-end align-items-center pagination-container">
            <vuetable-pagination-info class="custom-pagination-info" ref="paginationInfo"></vuetable-pagination-info>
            <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
          </div> -->
    </div>
  </div>
</template>

<script>
import FieldDefs from '@/components/Vuetable/FieldDefs';
import MyVuetable from '@/components/Vuetable/MyVuetable';

export default {
  name: 'Landing',
  components: {
    MyVuetable,
  },
  data() {
    return {
      fields: FieldDefs,
      sortOrder: [
        {
          field: 'email',
          sortField: 'email',
          direction: 'asc',
        },
      ],
      moreParams: {},
    };
  },
  methods: {
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
