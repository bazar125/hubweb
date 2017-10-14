<template>
  <div class="driver-modal d-flex flex-column justify-content-center align-items-start">
    <div :class="{'yellow-heading': isWarning}" class="modal-heading d-flex justify-content-start align-items-center">
      <span class="txt-title">{{title}}</span>
      <span class="mx-auto txt-reference">Ref: {{data.location ? data.paymentReference : ''}}</span>
      <div @click="clickNewTab()" class="heading-btn-container d-flex justify-content-start align-items-center">
        <span class="txt-heading">open in new tab</span>
        <icon class="icon-heading" name="external-link"></icon>
        <!-- <base-btn @click="clickDelete()" class="btn-heading" icon="external-link"></base-btn> -->
      </div>
      <div @click="clickClose()" class="heading-btn-container d-flex justify-content-start align-items-center">
        <span class="txt-heading">close</span>
        <icon class="icon-heading" name="times-circle-o"></icon>
        <!-- <base-btn @click="clickClose()" class="btn-heading" icon="times-circle-o"></base-btn> -->
      </div>
    </div>
    <!-- <modal-image-section :editBtnTitle="editBtnTitle" :auditBtnTitle="auditBtnTitle" @clickEdit="toggleEdit()" @clickAuditHistory="toggleAudit()" :type="type" :data="data"></modal-image-section> -->

    <div v-if="showAudit" class="audit-root-container d-flex justify-content-start align-items-start">
      <modal-audit-section :record-type="type" :data="data"></modal-audit-section>
    </div>
    <div v-else-if="showEdit" class="edit-root-container d-flex justify-content-start align-items-start">
      <modal-edit-section :name="type" :data="data"></modal-edit-section>
    </div>
    <div v-else class="data-root-container d-flex justify-content-start align-items-start">
      <slot name="main" :data="data ? data : {}"></slot>
    </div>

    <div v-if="!showEdit && this.type === 'citation' || this.type === 'collision'" class="driver-vehicle-container d-flex justify-content-center align-items-start">
      <div class="d-flex" style="flex: 1; height: 100%;">
        <modal-data-drivers></modal-data-drivers>
      </div>
      <div class="d-flex" style="flex: 1; height: 100%;">
        <modal-data-vehicles></modal-data-vehicles>
      </div>
    </div>

    <span v-if="!showEdit && (this.type === 'citation' && this.data.completionStatus !== 'Warning') || this.type === 'collision'" class="txt-timeleft">There are 12 days left to pay this citation</span>

    <div :class="{'timeleft-hidden': showEdit || this.type === 'citation' && this.data.completionStatus === 'Warning' }" class="action-container d-flex justify-content-end align-items-center">
      <base-btn @click="toggleEdit()" :class="{'btn-back': showEdit}" class="btn-delete" :text="editBtnTitle" :icon="editBtnIcon"></base-btn>
      <base-btn @click="clickPrint()" class="btn-print" text="Print" icon="print"></base-btn>
      <base-btn @click="clickEmail()" class="btn-email" text="Email" icon="envelope-o"></base-btn>
      <base-btn @click="clickPdf()" class="btn-pdf" text="PDF" icon="file-pdf-o"></base-btn>
    </div>
  </div>
</template>

<script>
import ModalImageSection from '@/components/ModalImageSection';
import ModalAuditSection from '@/components/ModalAuditSection';
import ModalEditSection from '@/components/ModalEditSection';
import ModalDataDrivers from '@/components/ModalDataDrivers';
import ModalDataVehicles from '@/components/ModalDataVehicles';
import BaseBtn from '@/components/BaseBtn';
import html2canvas from 'html2canvas';
// import domtoimage from 'dom-to-image';
import printJS from 'print-js';

export default {
  name: 'BaseModal',
  props: ['data', 'type', 'modalId'],
  components: {
    ModalImageSection,
    ModalAuditSection,
    ModalEditSection,
    ModalDataDrivers,
    ModalDataVehicles,
    BaseBtn,
  },
  data() {
    return {
      showAudit: false,
      showEdit: false,
      auditBtnTitle: 'History',
      editBtnTitle: this.type === 'citation' ? 'Delete' : 'Edit',
      editBtnIcon: this.type === 'citation' ? 'trash-o' : 'pencil',
    };
  },
  computed: {
    title() {
      if (this.data.completionStatus && this.data.completionStatus === 'Warning') {
        return 'Warning';
      }

      return this.type;
    },
    isWarning() {
      if (this.data.completionStatus && this.data.completionStatus === 'Warning') {
        return true;
      }

      return false;
    },
  },
  methods: {
    toggleAudit() {
      this.showAudit = !this.showAudit;
      this.showEdit = false;

      if (this.showAudit) {
        this.auditBtnTitle = 'Details';
      } else {
        this.auditBtnTitle = 'History';
      }
      if (this.type === 'citation') {
        this.editBtnTitle = 'Delete';
        this.editBtnIcon = 'trash-o';
      } else {
        this.editBtnTitle = 'Edit';
        this.editBtnIcon = 'pencil';
      }
    },
    toggleEdit() {
      this.showEdit = !this.showEdit;
      this.showAudit = false;

      if (this.showEdit) {
        this.editBtnTitle = 'Back';
        this.editBtnIcon = 'angle-left';
      } else if (this.type === 'citation') {
        this.editBtnTitle = 'Delete';
        this.editBtnIcon = 'trash-o';
      } else {
        this.editBtnTitle = 'Edit';
        this.editBtnIcon = 'pencil';
      }
      this.auditBtnTitle = 'History';
    },
    onChange(newJson) {
      console.log(newJson);
    },
    clickClose() {
      console.log(this.modalId);
      this.$root.$emit('hide::modal', this.modalId);
    },
    clickNewTab() {

    },
    clickPrint() {
      // console.log(this.$refs.printRoot);
      const node = document.getElementById('citation-modal-print-root');
      // html2canvas(this.$refs.printRoot).then((canvas) => {
      html2canvas(node, { allowTaint: false, useCORS: true }).then((canvas) => {
        const dataUrl = canvas.toDataURL();
        printJS(dataUrl, 'image');
      });
    },
  },
};
</script>

<style scoped>
.data-root-container {
  width: 100%;
  margin-top: 10px;
}

.data-root-container>* {
  flex: 1;
}

.data-container:not(:last-child) {
  padding-right: 5px;
}

.data-container .modal-data-row {
  flex: 1;
}

.data-container {
  flex: 1;
}

.audit-root-container {
  width: 100%;
  margin-top: 10px;
}

.edit-root-container {
  width: 100%;
}

.heading-btn-container {
  cursor: pointer;
  padding: 3px 10px;
  transition: ease-out 0.2s;
  border: 1px solid transparent;
}

.heading-btn-container:hover {
  /* background-color: rgba(255, 255, 255, 0.2) !important; */
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  transition: ease-out 0.2s;
}

.heading-btn-container:active {
  /* background-color: rgba(255, 255, 255, 0.5) !important; */
  border: 1px solid rgba(255, 255, 255, 0.84) !important;
  transition: ease-out 0.2s;
}

.btn-action {
  position: relative;
  background-color: transparent;
  /* border-color: #DF90B8; */
  border-color: #8f90a8;
  color: rgba(255, 255, 255, 0.84);
  /* border-radius: 4px; */
  border-radius: 20px;
  font-weight: 600;
  font-size: 11px;
  width: 40px;
  height: 40px;
  padding: 6px 0px;
  cursor: pointer;
  transition: ease-out 0.2s;
  margin-right: 10px;
}

.btn-action:hover {
  background-color: #8f90a8;
  border-color: #8f90a8;
  transition: ease-out 0.2s;
}

.btn-action:active {
  background-color: #585e8c;
  border-color: #585e8c;
  transition: ease-out 0.2s;
}

.modal-heading {
  /* width: 100%; */
  width: calc(100% + 30px);
  margin-top: -15px;
  margin-left: -15px;
  margin-bottom: 5px;
  padding: 8px 10px;
  color: white;
  background-color: #ef3135;
  overflow: hidden;
  /* border-color: #8f90a8; */
  /* color: #8f90a8; */
}

.yellow-heading {
  background-color: #b97310 !important;
}

.modal-heading>>>.btn-icon {
  width: 17px !important;
  height: 17px !important;
}

.txt-title {
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
}

.txt-heading {
  font-weight: 600;
  font-size: 10px;
  margin-right: 5px;
  user-select: none;
}

.txt-reference {
  font-weight: 600;
  font-size: 14px;
}

.btn-delete {
  height: 30px !important;
  width: 80px !important;
  padding: 0px !important;
  color: white !important;
  background-color: #ef3135 !important;
  border-color: #ef3135 !important;
  transition: ease-out 0.2;
}

.btn-delete:hover {
  background-color: #f3686b !important;
  border-color: #f3686b !important;
  transition: ease-out 0.2;
}

.btn-back,
.btn-back:hover {
  background-color: #b97310 !important;
  border-color: #b97310 !important;
}


.icon-heading {
  height: 17px !important;
  width: 17px !important;
  padding: 0px !important;
  color: white !important;
}

.btn-print {
  height: 30px !important;
  width: 80px !important;
  padding: 0px !important;
  color: white !important;
  background-color: #4869a4 !important;
  border-color: #4869a4 !important;
  transition: ease-out 0.2;
}

.btn-print:hover {
  background-color: #6988bd !important;
  border-color: #6988bd !important;
  transition: ease-out 0.2;
}

.btn-email {
  height: 30px !important;
  width: 80px !important;
  padding: 0px !important;
  color: white !important;
  background-color: #63a54b !important;
  border-color: #63a54b !important;
  transition: ease-out 0.2;
}

.btn-email:hover {
  background-color: #9ac98f !important;
  border-color: #9ac98f !important;
  transition: ease-out 0.2;
}

.btn-pdf {
  height: 30px !important;
  width: 80px !important;
  padding: 0px !important;
  color: white !important;
  background-color: #094977 !important;
  border-color: #094977 !important;
  transition: ease-out 0.2 !important;
}

.btn-pdf:hover {
  background-color: #0d6bae !important;
  border-color: #0d6bae !important;
  transition: ease-out 0.2 !important;
}

.action-container {
  width: 100%;
}

.action-container .btn-base:not(:last-child) {
  margin-right: 10px;
}

.txt-timeleft {
  font-size: 14px;
  font-weight: 700;
  color: #094977;
  margin-top: 5px;
  margin-bottom: 10px;
}

.driver-vehicle-container {
  width: 100%;
}

.modal-data-drivers {
  margin-right: 10px;
  flex: 1;
}

.modal-data-vehicles {
  flex: 1;
}

.timeleft-hidden {
  margin-top: 10px;
}
</style>

<style>
.modal-header>h5 {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
}

.modal-content {
  /* background-color: #2c2e4a; */
  background-color: white;
  overflow: hidden;
}

.modal-footer {
  padding: 5px 10px;
  border-color: #8f90a8;
}

.modal-footer .btn {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}

.modal-dialog {
  max-width: 590px;
}
</style>
