<template>
  <div class="driver-modal d-flex flex-column justify-content-center align-items-start">
    <modal-image-section :editBtnTitle="editBtnTitle" :auditBtnTitle="auditBtnTitle" @clickEdit="toggleEdit()" @clickAuditHistory="toggleAudit()" :type="type" :data="data"></modal-image-section>

    <div v-if="showAudit" class="audit-root-container d-flex justify-content-start align-items-start">
      <modal-audit-section :record-type="type" :data="data"></modal-audit-section>
    </div>
    <div v-else-if="showEdit" class="edit-root-container d-flex justify-content-start align-items-start">
      <modal-edit-section :name="type" :data="data"></modal-edit-section>
    </div>
    <div v-else class="data-root-container d-flex justify-content-start align-items-start">
      <slot name="main" :data="data ? data : {}"></slot>
    </div>
  </div>
</template>

<script>
import ModalImageSection from '@/components/ModalImageSection';
import ModalAuditSection from '@/components/ModalAuditSection';
import ModalEditSection from '@/components/ModalEditSection';

export default {
  name: 'BaseModal',
  props: ['data', 'type'],
  components: {
    ModalImageSection,
    ModalAuditSection,
    ModalEditSection,
  },
  data() {
    return {
      showAudit: false,
      showEdit: false,
      auditBtnTitle: 'Audit History',
      editBtnTitle: this.type === 'citation' ? 'Delete' : 'Edit',
    };
  },
  methods: {
    toggleAudit() {
      this.showAudit = !this.showAudit;
      this.showEdit = false;

      if (this.showAudit) {
        this.auditBtnTitle = 'Show Details';
      } else {
        this.auditBtnTitle = 'Audit History';
      }
      if (this.type === 'citation') {
        this.editBtnTitle = 'Delete';
      } else {
        this.editBtnTitle = 'Edit';
      }
    },
    toggleEdit() {
      this.showEdit = !this.showEdit;
      this.showAudit = false;

      if (this.showEdit) {
        this.editBtnTitle = 'Back';
      } else if (this.type === 'citation') {
        this.editBtnTitle = 'Delete';
      } else {
        this.editBtnTitle = 'Edit';
      }
      this.auditBtnTitle = 'Audit History';
    },
    onChange(newJson) {
      console.log(newJson);
    },
  },
};
</script>

<style scoped>
.data-root-container {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.data-root-container>* {
  flex: 1;
}

.data-container .modal-data-row {
  flex: 1;
}

.audit-root-container {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.edit-root-container {
  width: 100%;
  height: 100%;
}
</style>

<style>
.modal-header {
  padding: 5px 10px;
}

.modal-header > h5 {
  font-size: 16px;
  font-weight: 600;
}

.modal-footer {
  padding: 5px 10px;
}

.modal-footer .btn {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
