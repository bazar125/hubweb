<template>
  <div class="table-search d-flex justify-content-start align-items-center">
    <icon name="search" class="search-icon"></icon>
    <b-form-input class="search-input" size="sm" v-model="searchInput" placeholder="Type to Search" />
  </div>
</template>

<script>
export default {
  name: 'TableSearch',
  props: ['value'],
  components: {
  },
  data() {
    return {
      searchInput: '',
    };
  },
  watch: {
    searchInput(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>
.table-search {
  width: 300px;
}

.search-input {
  width: 100%;
  /* border-right-width: 0px;
  border-left-width: 0px;
  border-top-width: 0px; */
  background-color: transparent;
  /* color: white; */
  color: rgba(0,0,0,0.87);
  border-color: #00b0ff;
  /* border-color: #0275d8; */
  /* border-color: rgba(255,255,255,0.8); */
}

.search-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  /* color: white; */
  color: rgba(0,0,0,0.87);
}

.table-search ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  /* color: rgba(255, 255, 255, 0.4); */
  color: rgba(0,0,0, 0.4);
}

.table-search :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  /* color: rgba(255, 255, 255, 0.4); */
  color: rgba(0,0,0, 0.4);
  opacity: 1;
}

.table-search ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  /* color: rgba(255, 255, 255, 0.4); */
  color: rgba(0,0,0, 0.4);
  opacity: 1;
}

.table-search :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  /* color: rgba(255, 255, 255, 0.4); */
  color: rgba(0,0,0, 0.4);
}

.table-search ::-ms-input-placeholder {
  /* Microsoft Edge */
  /* color: rgba(255, 255, 255, 0.4); */
  color: rgba(0,0,0, 0.4);
}
</style>
