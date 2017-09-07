<template>
  <div class="datatable d-flex flex-column justify-content-start align-items-center">

    <b-table bordered hover show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered">
      <!-- <template slot="name" scope="row">{{row.value.first}} {{row.value.last}}</template>
        <template slot="isActive" scope="row">{{row.value?'Yes :)':'No :('}}</template> -->
      <template slot="actions" scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-btn size="sm" @click.stop="details(row.item,row.index,$event.target)">Details</b-btn>
      </template>
    </b-table>  

    <div class="container-pagination d-flex justify-content-end align-items-center">
      <!-- <span class="txt-rows-per-page">Rows Per Page</span>
      <b-form-select class="rows-per-page" size="sm" :options="pageOptions" v-model="perPage" />
      <b-button size="sm" :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button> -->
      <b-pagination class="custom-pagination" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
    </div>

    <!-- Details modal -->
    <b-modal id="modal1" @hide="resetModal" ok-only>
      <h4 class="my-1 py-1" slot="modal-header">{{ modalDetails.data.paymentReference }}</h4>
      <pre>{{ modalDetails.data }}</pre>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Datatable',
  props: ['perPage', 'items', 'fields', 'totalRows'],
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
      this.modalDetails.data = JSON.stringify(item, null, 2);
      this.modalDetails.index = index;
      this.$root.$emit('show::modal', 'modal1', button);
    },
    resetModal() {
      this.modalDetails.data = '';
      this.modalDetails.index = '';
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.container-pagination {
  width: 100%;
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

</style>

<style>
.datatable .btn {
  cursor: pointer;
}
.vertical-middle {
  vertical-align: middle !important;
  padding-right: 10px !important;
}

.table-alert {
  background-color: #fcf8e3;
}

.table-danger {
  background-color: #f2dede;
}

.datatable .table th,
.table td {
  padding: 0.25rem 0.75rem;
}
</style>