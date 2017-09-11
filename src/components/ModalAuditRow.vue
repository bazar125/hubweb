<template>
  <div class="modal-audit-row d-flex flex-column justify-content-start align-items-start">
    <div class="d-flex justify-content-start align-items-center">
      <icon v-if="data && data.type === 'edit'" name="pencil-square" class="row-icon"></icon>
      <icon v-else-if="data && data.type === 'delete'" name="times-circle" class="row-icon"></icon>
      <icon v-else-if="data && data.type === 'addPoint'" name="plus-circle" class="row-icon"></icon>
      <icon v-else-if="data && data.type === 'deletePoint'" name="eraser" class="row-icon"></icon>
      <icon v-else name="pencil-square" class="row-icon"></icon>

      <span class="data-title">{{data.label}}</span>
      <span class="ml-auto data-timeago">{{data.timeAgo}}</span>
    </div>

    <div class="inner-container d-flex flex-column justify-content-center align-items-start">
      <div class="container-justification d-flex flex-column justify-content-start align-items-start">
        <span class="data-label">Justification</span>
        <span class="data-text">{{data.justification}}</span>
      </div>

      <div v-for="action in data.actions" :key="action.description"
        class="container-action d-flex justify-content-start align-items-center">
        <div class="container-description d-flex flex-column justify-content-start align-items-start">
          <span class="data-label">Description</span>
          <span class="data-text">{{action.description}}</span>
        </div>
        <div class="container-old-value d-flex flex-column justify-content-start align-items-start">
          <span class="data-label">Old Value</span>
          <span class="data-text">{{action.oldValue}}</span>
        </div>
        <div class="container-new-value d-flex flex-column justify-content-start align-items-start">
          <span class="data-label">New Value</span>
          <span class="data-text">{{action.newValue}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalAuditRow',
  props: ['data'],
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.modal-audit-row {
  width: 100%;
  padding-top: 10px;
}

.modal-audit-row:not(:last-child) {
  border-bottom: 1px solid #ececec;
  padding-bottom: 10px;
}

.modal-audit-row>* {
  width: 100%;
}

.data-label {
  font-weight: 600;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.82);
  line-height: 1.5;
  text-align: start;
}

.data-title {
  font-weight: 600;
  font-size: 14px;
}

.data-timeago {
  font-size: 10px;
}

.data-text {
  text-align: start;
  line-height: 1.5;
  font-size: 10px;
}

.row-icon {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

.inner-container {
  padding: 10px;
}

.container-description {
  width: 200px;
}

.container-old-value {
  width: 100px;
  margin-right: 20px;
}

.container-old-value>* {
  width: 100%;
}

.container-new-value {
  width: 100px;
}

.container-new-value>* {
  width: 100%;
}

.container-justification {
  width: 100%;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ececec;
}

.container-action {
  margin-bottom: 5px;
}
</style>
