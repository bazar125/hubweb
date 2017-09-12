<template>
  <div class="modal-edit-section d-flex flex-column justify-content-start align-items-start">
    <!-- <json-editor :onChange="onChange" :json="json"></json-editor> -->
    <div class="container-readonly d-flex justify-content-start align-items-center">
      <icon name="lock" class="icon-readonly"></icon>
      <span class="txt-readonly">This is a write-protected record, and may only be edited by an administrator.</span>
    </div>
    <div ref="jsoneditor" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor';

export default {
  name: 'ModalEditSection',
  props: ['data', 'name'],
  components: {
    JSONEditor,
  },
  data() {
    return {
      json: {
        foo: 'bar',
      },
      dataClone: {},
      editor: {},
    };
  },
  mounted() {
    this.dataClone = JSON.parse(JSON.stringify(this.data));
    const options = {
      mode: 'view',
      name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
      // onEditable: (node) => {
      //   switch (node.field) {
      //     case 'citationPoints':
      //       return {
      //         field: false,
      //         value: true,
      //       };
      //     default:
      //       return false;
      //   }
      // },
    };
    this.editor = new JSONEditor(this.$refs.jsoneditor, options);
    this.editor.set(this.data);
  },
  watch: {
    data(newValue) {
      if (!newValue) {
        return;
      }

      this.editor.set(newValue);
    },
  },
};
</script>

<style scoped>
.modal-edit-section {
  width: 100%;
}

.container-readonly {
  padding: 10px 0px;
}

.icon-readonly {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.txt-readonly {
  font-weight: 500;
  font-size: 10px;
}
</style>
