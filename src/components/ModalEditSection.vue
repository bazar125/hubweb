<template>
  <div class="modal-edit-section d-flex justify-content-start align-items-center">
    <!-- <json-editor :onChange="onChange" :json="json"></json-editor> -->
    <div ref="jsoneditor" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor';

export default {
  name: 'ModalEditSection',
  props: ['data'],
  components: {
    JSONEditor,
  },
  data() {
    return {
      json: {
        foo: 'bar',
      },
      editor: {},
    };
  },
  mounted() {
    this.editor = new JSONEditor(this.$refs.jsoneditor, {});
  },
};
</script>

<style scoped>
.modal-edit-section {
  width: 100%;
}
</style>
