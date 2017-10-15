<template>
  <div class="base-card d-flex flex-column justify-content-start align-items-start">
    <div v-if="this.loading" class="darken-overlay"></div>
    <clip-loader class="loading-spinner" :loading="loading" color="#3798c4" size="100px"></clip-loader>

    <!-- <div class="header d-flex justify-content-center align-items-center" style="width: 100%;">
          <span class="header-text">Citation Details</span>
        </div> -->

    <div v-if="!data && !hidePlaceholder" class="placeholder-container d-flex justify-content-center align-items-center">      
      <slot name="placeholder">
        <icon class="placeholder-icon" name="history"></icon>
        <span class="placeholder-text">No data available</span>
      </slot>
    </div>
    <div v-else class="content-container d-flex justify-content-start align-items-center">
      <!-- <slot name="main" :data="data ? data : {}"></slot> -->
      <slot>
        
      </slot>
    </div>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader';

/* Prop for padding? */
export default {
  name: 'BaseCard',
  props: ['data', 'hidePlaceholder'],
  components: {
    ClipLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style scoped>
.base-card {
  position: relative;
  flex: 1;
  height: 100%;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
}

.content-container {
  padding: 20px;
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.placeholder-container {
  flex: 1;
  width: 100%;
}

.placeholder-icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.placeholder-text {
  font-weight: 300;
  font-size: 18px;
}

.loading-spinner {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 120px;
  height: 120px;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.74);
}

.darken-overlay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.43);
}
</style>
