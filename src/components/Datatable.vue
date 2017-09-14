<template>
  <div class="datatable d-flex flex-column justify-content-start align-items-center">

    <div class="container-pagination d-flex justify-content-end align-items-center">
      <!-- <span class="txt-rows-per-page">Rows Per Page</span>
          <b-form-select class="rows-per-page" size="sm" :options="pageOptions" v-model="perPage" />
          <b-button size="sm" :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button> -->
      <span class="title mr-auto">{{title ? title : ''}}</span>
      <b-pagination @input="paginationChanged" class="custom-pagination" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
    </div>

    <!-- <b-table bordered hover show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered"> -->
    <b-table class="custom-table" bordered hover show-empty :items="items" :fields="fields" :per-page="perPage" :filter="searchFilter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered">
      <!-- <template slot="name" scope="row">{{row.value.first}} {{row.value.last}}</template>
            <template slot="isActive" scope="row">{{row.value?'Yes :)':'No :('}}</template> -->
      <template slot="actions" scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-btn size="sm" class="btn-action" :class="{'btn-danger': row.item._dirtyClass === 'danger', 'btn-warning': row.item._dirtyClass === 'alert'}" @click.stop="details(row.item,row.index,$event.target)">Details</b-btn>
      </template>
    </b-table>

    <b-modal :title="modalTitle" :id="modalId" @hide="resetModal" ok-only>
      <slot name="modal" :data="modalDetails.data"></slot>
    </b-modal>    
  </div>
</template>

<script>
export default {
  name: 'Datatable',
  props: ['perPage', 'items', 'fields', 'totalRows', 'searchFilter', 'title', 'modalId', 'modalTitle'],
  components: {
  },
  data() {
    return {
      currentPage: 1,
      pageOptions: [{ text: 5, value: 5 }, { text: 10, value: 10 }, { text: 15, value: 15 }],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalDetails: { index: '', data: '' },
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
  },
};
</script>

<style scoped>
.title {
  font-size: 22px;
  font-weight: 300;
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
  font-size: 9px;
  padding-top: 2px;
  padding-bottom: 2px;
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

.custom-datatable-cell {
  font-size: 11px;
}

/* .custom-datatable-action-cell {
  padding: 0px;
} */

.table-alert {
  background-color: #f0ad4e;
}

.table-danger {
  background-color: #d9534f;
  color: white;
}

.datatable .table th,
.table td {
  padding: 0.25rem 0.75rem;
}
</style>