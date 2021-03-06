<template>
  <div class="datatable d-flex flex-column justify-content-start align-items-center">
    <dark-card :title="title" @clickClose="clickClose" @clickNewTab="clickNewTab" :showNavigation="showNavigation" class="dark-card-container d-flex flex-column justify-content-start align-items-center">
      <div class="container-pagination d-flex justify-content-end align-items-center">
        <!-- <span class="txt-rows-per-page">Rows Per Page</span>
              <b-form-select class="rows-per-page" size="sm" :options="pageOptions" v-model="perPage" />
              <b-button size="sm" :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button> -->
        <!-- <span class="title mr-auto">{{title ? title : ''}}</span> -->
        <table-search v-model="searchFilter"></table-search>
        <b-pagination @input="paginationChanged" class="ml-auto custom-pagination" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
      </div>

      <!-- <b-table bordered hover show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered"> -->
      <b-table class="custom-table" bordered hover show-empty :items="items" :fields="fields" :per-page="perPage" :filter="searchFilter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered">
        <!-- <template slot="name" scope="row">{{row.value.first}} {{row.value.last}}</template>
                <template slot="isActive" scope="row">{{row.value?'Yes :)':'No :('}}</template> -->
        <template slot="actions" slot-scope="row">
          <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-btn size="sm" class="btn-action" :class="{'btn-danger': row.item._dirtyClass === 'danger', 'btn-warning': row.item._dirtyClass === 'alert', 'btn-wwarning': row.item._dirtyClass === 'wwarning', 'btn-success': row.item._dirtyClass === 'success'}" @click.stop="details(row.item,row.index,$event.target)">VIEW</b-btn>
        </template>
      </b-table>

      <b-modal :title="modalTitle" :id="modalId" @hide="resetModal" :no-close-on-esc="true" :hide-header="true" :hide-footer="true">
        <slot name="modal" :data="modalDetails.data"></slot>
      </b-modal>
    </dark-card>
  </div>
</template>

<script>
import TableSearch from '@/components/TableSearch';
import DarkCard from '@/components/DarkCard';

export default {
  name: 'Datatable',
  props: ['perPage', 'items', 'fields', 'totalRows', 'title', 'modalId', 'modalTitle', 'showNavigation'],
  components: {
    DarkCard,
    TableSearch,
  },
  data() {
    return {
      currentPage: 1,
      pageOptions: [{ text: 5, value: 5 }, { text: 10, value: 10 }, { text: 15, value: 15 }],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalDetails: { index: '', data: '' },
      searchFilter: '',
    };
  },
  methods: {
    details(item, index, button) {
      // this.modalDetails.data = JSON.stringify(item, null, 2);
      this.modalDetails.data = item;
      this.modalDetails.index = index;
      this.$root.$emit('show::modal', this.modalId, button);
    },
    resetModal() {
      this.modalDetails.data = '';
      this.modalDetails.index = '';
      this.$emit('resetModal');
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    paginationChanged(page) {
      this.$emit('page-changed', page);
    },
    clickClose() {
      console.log('datatable clickClose');
      this.$emit('clickClose');
    },
    clickNewTab() {
      console.log('datatable clickNewTab');
      this.$emit('clickNewTab');
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 300;
  /* color: #8f90a8; */
  color: white;
  text-transform: uppercase;
}

.custom-table {
  margin-bottom: auto;
}

.container-pagination {
  width: 100%;
  margin-bottom: 10px;
}

.custom-pagination {
  margin-bottom: 0px;
  margin-left: 20px;
  color: rgba(0,0,0,0.87);
}

.custom-pagination>>>.page-link {
  /* background-color: transparent; */
  /* border-color: #4a59ad; */
  /* color: white;
  border-color: #4f6f8f; */
  padding: 0.4rem 0.75rem;
}

.custom-pagination>>>.page-link.active {
  background-color: #31429E;
  /* background-color: #4a59ad;
  border-color: #4f6f8f; */
  /* color: white; */
  /* color: rgba(0,0,0,0.87); */
  padding: 0.4rem 0.75rem;
}

.rows-per-page {
  margin-bottom: 0px;
  width: 20px;
}

.txt-rows-per-page {
  font-size: 12px;
  font-weight: 300;
}

.btn-action {
  font-size: 8px;
  font-weight: 600;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
  background-color: #1565c0;
  border-color: #1565c0;
  color: white;
}

.datatable .btn-warning {
  background-color: #1565c0;
  border-color: #1565c0;
}

.datatable .btn-wwarning {
  background-color: #b97310;
  /* background-color: #f0ad4e; */
  border-color: #b97310;
  /* color: rgba(255, 255, 255, 0.84); */
  color: white;
  /* color: rgba(0,0,0,0.84); */
}

.dark-card-container {
  width: 100%;
}
</style>

<style>
.datatable .btn {
  cursor: pointer;
}

.vertical-middle {
  vertical-align: middle !important;
  padding-right: 10px !important;
}

.shorten-header {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-datatable-cell {
  font-size: 11px;
}

.custom-datatable-address-cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100px;
}

/* .custom-datatable-action-cell {
  padding: 0px;
} */

.table-wwarning {
  /* background-color: #f0ad4e; */
  background-color: #b97310 !important;
  color: white !important;
}

.table-wwarning:hover {
  /* background-color: #f0ad4e; */
  background-color: #b97310 !important;
  color: white !important;
}

.table-alert {
  /* background-color: #f0ad4e; */
  background-color: #1565c0 !important;
  color: white !important;
}

.table-alert:not(:last-child) {
  /* border-bottom-color: rgba(255, 255, 255, 0.5) !important; */
}

.table-danger {
  background-color: #d9534f !important;
  /* background-color: #1565c0;; */
  color: white !important;
}

.table-danger:hover {
  background-color: #d9534f !important;
}

.table-success {
  background-color: #5cb85c !important;
  color: white !important;
  /* background-color: transparent; */
}

.table-success:hover {
  background-color: #5cb85c !important;
}

.datatable .table {
  border-radius: 4px;
  overflow: hidden;
}



/* .datatable .table th,
.table td { */

.table td {
  padding: 0.35rem 0.75rem;
}

.datatable .table th {
  padding: 0.5rem 0.75rem;
  /* background-color: #212338; */
  background-color: #31429E;
  /* border-color: white; */
  color: white;
}

.datatable .table th::before,
.datatable .table th::after {
  color: white;
}

table.b-table>tfoot>tr>.sorting::after,
table.b-table>tfoot>tr>.sorting::before,
table.b-table>thead>tr>.sorting::after,
table.b-table>thead>tr>.sorting::before {
  opacity: 1;
}

.datatable .table-bordered td {
  border-color: rgba(0,0,0,0.12);
  color: rgba(0,0,0,0.87);
}

.datatable .table-bordered th {
  border-color: rgba(0,0,0,0.12);
}

.datatable .table-bordered {
  /* border: none; */
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 3px;
  border-collapse: separate;
  border-spacing: 0;
}

.datatable th {
  color: #d5dde5;
  background: #1b1e24;
  border-bottom: 4px solid #9ea7af;
  border-right: 1px solid #343a45;
  border-left: none;
  border-top: none;
  font-size: 11px;
  font-weight: 600;
  /* padding: 4px 24px; */
  text-align: left;
  /* text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); */
  vertical-align: middle;
}

.datatable th:first-child {
  border-left: none;
}

.datatable th:last-child {
  border-right: none;
  /* position: relative; */
}

.datatable tr {
  border-top: 1px solid #c1c3d1;
  border-bottom: 1px solid #c1c3d1;
  color: #666b85;
  font-size: 11px;
  font-weight: normal;
  border-top: none;
  /* text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1); */
}

.datatable tr:hover td {
  background: #4e5066;
  color: #ffffff;
  /* border-top: 1px solid #22262e; */
}

.datatable tr:first-child {
  border-top: none;
}

.datatable tr:last-child {
  border-bottom: none;
  /* border-bottom: 2px solid #9ea7af */
}

.datatable tr:nth-child(odd) td {
  background: #ebebeb;
}

.datatable tr:nth-child(odd):hover td {
  background: #4e5066;
}

.datatable td:first-child {
  border-left: none;
}

.datatable tr:last-child td:first-child {
  border-bottom-left-radius: 3px;
  border-bottom: none;
}

.datatable tr:last-child td:last-child {
  border-bottom-right-radius: 3px;
}

.datatable tr:last-child td {
  border-bottom: none;
}

.datatable td {
  background: #ffffff;
  /* padding: 8px 20px; */
  text-align: left;
  vertical-align: middle;
  font-weight: 400;
  font-size: 11px;
  /* text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1); */
  border-right: 1px solid #c1c3d1;
  border-left: none;
  border-bottom: none;
}

.datatable td:last-child {
  border-right: 0px;
}

.datatable th.text-left {
  text-align: left;
}

.datatable th.text-center {
  text-align: center;
}

.datatable th.text-right {
  text-align: right;
}

.datatable td.text-left {
  text-align: left;
}

.datatable td.text-center {
  text-align: center;
}

.datatable td.text-right {
  text-align: right;
}


</style>