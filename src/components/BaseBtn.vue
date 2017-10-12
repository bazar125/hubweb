<template>
  <b-btn @click="$emit('click')" size="sm" class="btn-base">
    <div class="d-flex justify-content-center align-items-center">
      <icon v-if="icon" class="btn-icon" :name="icon" :style="{'margin-right': !text ? '0px': ''}"></icon>
      <span>{{text}}</span>
    </div>
  </b-btn>
</template>

<script>
export default {
  name: 'BaseBtn',
  props: ['bgColor', 'textColor', 'borderColor', 'text', 'icon'],
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.btn-base {
  position: relative;
  background-color: transparent;
  border-color: #8f90a8;
  color: white;
  border-radius: 20px;
  font-weight: 600;
  font-size: 11px;
  height: 40px;
  /* padding: 6px 6px; */
  padding: 10px;
  cursor: pointer;
  transition: ease-out 0.2s;
  text-transform: uppercase;
}

.btn-base:hover {
  background-color: #8f90a8;
  border-color: #8f90a8;
  transition: ease-out 0.2s;
}

.btn-base:active {
  background-color: #585e8c;
  border-color: #585e8c;
  transition: ease-out 0.2s;
}

.btn-icon {
  margin-right: 6px;
  width: 10px;
}
</style>
