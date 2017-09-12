<template>
  <div class="modal-edit-section d-flex flex-column justify-content-start align-items-start">
    <!-- <json-editor :onChange="onChange" :json="json"></json-editor> -->
    <template v-if="name !== 'citation'">
      <div class="container-readonly d-flex justify-content-start align-items-center">
        <icon name="lock" class="icon-readonly"></icon>
        <span class="txt-readonly">This is a write-protected record, and may only be edited by an administrator.</span>
      </div>
      <div ref="jsoneditor" style="width: 100%; height: 300px;"></div>
    </template>
    <template v-else>
      <div class="container-delete d-flex flex-column justify-content-start align-items-center">
        <textarea class="form-control input-justification" v-model="deleteJustification" placeholder="Provide a justification" rows="3"></textarea>
        <b-btn @click="deleteCitation()" :class="{'btn-disabled': !deleteJustification}" id="btnDelete" size="sm" style="margin-top: 10px;" class="btn-confirm">
          <div class="d-flex justify-content-center align-items-center">
            <icon class="icon-confirm" name="exclamation-triangle"></icon>
            <span>I confirm, delete this citation</span>
          </div>
        </b-btn>
      </div>
    </template>
    <!-- <div v-if="name && name === 'driver'" class="edit-point-container d-flex justify-content-start align-items-center">
                        <span class="label-editpoints">Current Citation Points</span>
                        <span class="txt-editpoints">{{data.citationPoints}}</span>

                        <span class="ml-auto label-editpoints">New Citation Points</span>
                        <b-form-input class="input-points" v-model="newPoints" size="sm" type="number" min="0" max="5" placeholder="Points"></b-form-input>

                        <b-btn @click="saveCitationPoints()" id="btnEdit" size="sm" style="margin-left: 10px;" class="ml-auto btn-action" :class="{'btn-cancel': editBtnTitle === 'Back'}">Save</b-btn>
                      </div> -->
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor';
// import * as Firebase from 'firebase';

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
      newPoints: '',
      deleteJustification: '',
    };
  },
  methods: {
    deleteCitation() {
      if (!this.deleteJustification) {
        return;
      }

      // const ref = Firebase.database().ref();
      console.log('delete citation');
      console.log(this.data.$id);
      this.$root.$emit('hide::modal', `${this.name}Modal`);
    },
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
    this.newPoints = this.data.citationPoints;
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

.title-editpoints {
  font-weight: 600;
}

.label-editpoints {
  font-weight: 600;
  margin-right: 10px;
}

.edit-point-container {
  width: 100%;
  margin-top: 10px;
}

.input-points {
  width: 100px;
}

.btn-action {
  background-color: #0275d8;
  border-color: #0275d8;
  color: white;
  font-size: 13px;
  transition: 0.4s;
}

.btn-action:hover {
  /* background-color: #1893fd; */
  /* border-color: #1893fd; */
  background-color: #01559e;
  border-color: #01559e;
  transition: 0.4s;
}

.container-delete {
  width: 100%;
}

.input-justification {
  margin-top: 10px;
  font-size: 14px;
}

.btn-confirm {
  background-color: #ef3135;
  border-color: #ef3135;
  color: white;
  transition: 0.4s;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #c20f13;
  border-color: #c20f13;
  color: white;
  transition: 0.4s;
}

.btn-disabled {
  background-color: lightgray !important;
  border-color: lightgray !important;
  cursor: default;
  transition: 0.4s;
}

.icon-confirm {
  margin-right: 8px;
}
</style>
