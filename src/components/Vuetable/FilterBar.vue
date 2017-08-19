<template>
  <div class="filter-bar">
    <form class="form-inline">
      <label>Search for:</label>
      <div class="search-input-container">
        <!-- <input type="text" class="search form-control" v-model="vm.searchPlace" v-google-maps-autocomplete:myProperty.name.website.formatted_address.geometry="vm"></input> -->
        <!-- <input id="input" type="text" v-model="filterText" class="search form-control form-control-sm" @keyup.enter.prevent="doFilter" placeholder="name, nickname, or email"></input> -->
        <input id="input" type="text" v-model="filterText" class="search form-control" @keyup.enter.prevent="doFilter" placeholder="name, nickname, or email"></input>
        <icon class="search-icon" name="search"></icon>
      </div>
      <!-- <input id="input" type="text" v-model="filterText" class="form-control form-control-sm" @keyup.enter.prevent="doFilter" placeholder="name, nickname, or email"> -->
      <button id="go" class="btn btn-primary btn-sm" @click.prevent="doFilter">Go</button>
      <button id="rest" class="btn btn-default btn-sm" @click.prevent="resetFilter">Reset</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
    };
  },
  methods: {
    doFilter() {
      this.$events.fire('filter-set', this.filterText);
    },
    resetFilter() {
      this.filterText = '';
      this.$events.fire('filter-reset');
    },
  },
};
</script>

<style scoped>
.filter-bar {
  margin-bottom: 8px;
}

#input {
  margin-left: 15px;
  margin-right: 15px;
}

#go {
  margin-right: 15px;
}

#rest {

}

.search-input-container {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 7px;
  right: 24px;
  width: 16px;
  height: 16px;
}

.search {
  font-size: 11px;
  /* border-radius: 0px; */
  padding-right: 30px;
  overflow-y: hidden;
  overflow-x: auto;
}

</style>