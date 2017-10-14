<template>
  <div class="modal-data-row d-flex flex-column justify-content-center align-items-start">
    <span class="data-label">{{label}}</span>
    <span class="data-text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'ModalDataRow',
  props: ['label', 'text'],
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.modal-data-row {
  width: 100%;
  margin-bottom: 5px;
}

.data-label {
  font-weight: 700;
  font-size: 11px;
  line-height: 1.5;
  text-align: start;
  /* color: #8f90a8; */
  color: rgba(0, 0, 0, 0.87);
}

.data-text {
  text-align: start;
  line-height: 1.5;
  font-size: 11px;
  /* color: rgba(255,255,255,0.84); */
  color: rgba(0, 0, 0, 0.87);
}
</style>
