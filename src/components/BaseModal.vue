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
        <modal-data-drivers @viewDriver="viewDriver"></modal-data-drivers>
      </div>
      <div class="d-flex" style="flex: 1; height: 100%;">
        <modal-data-vehicles @viewVehicle="viewVehicle"></modal-data-vehicles>
      </div>
    </div>

    <span v-if="!showEdit && (this.type === 'citation' && this.data.completionStatus !== 'Warning') || this.type === 'collision'" class="txt-timeleft">There are 12 days left to pay this citation</span>

    <div :class="{'timeleft-hidden': showEdit || this.type === 'citation' && this.data.completionStatus === 'Warning' }" class="action-container d-flex justify-content-end align-items-center">
      <base-btn @click="toggleEdit()" :class="{'btn-back': showEdit}" class="btn-delete" :text="editBtnTitle" :icon="editBtnIcon"></base-btn>
      <base-btn v-if="!showEdit" @click="clickPrint()" class="btn-print" text="Print" icon="print"></base-btn>
      <base-btn v-if="!showEdit" :class="{'btn-disabled': !userHasEmail}" @click="clickEmail()" class="btn-email" text="Email" icon="envelope-o"></base-btn>
      <base-btn v-if="!showEdit" @click="clickPdf()" class="btn-pdf" text="PDF" icon="file-pdf-o"></base-btn>
    </div>
  </div>
</template>

<script>
import ModalImageSection from '@/components/ModalImageSection';
import ModalAuditSection from '@/components/ModalAuditSection';
import ModalEditSection from '@/components/ModalEditSection';
import ModalDataDrivers from '@/components/ModalDataDrivers';
import ModalDataVehicles from '@/components/ModalDataVehicles';
// import TablePageLoader from '@/services/TablePageLoader';
import BaseBtn from '@/components/BaseBtn';
import html2canvas from 'html2canvas';
import * as JsPDF from 'jspdf';
import printJS from 'print-js';

// const driverLoader = new TablePageLoader('driver');

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
      userHasEmail: true,
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
  mounted() {
    this.userHasEmail = true;
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
      const ref = this.data.paymentReference ? this.data.paymentReference : this.data.reference;
      const win = window.open(`http://localhost:8080/#/citations/${ref}`, '_blank');
      win.focus();
    },
    viewDriver(driver) {
      console.log(driver);
      const win = window.open(`http://localhost:8080/#/drivers/${driver.$id}`, '_blank');
      win.focus();
    },
    viewVehicle(vehicle) {
      console.log(vehicle);
      const win = window.open(`http://localhost:8080/#/vehicles/${vehicle.$id}`, '_blank');
      win.focus();
    },
    clickPrint() {
      const node = document.getElementById('citation-modal-print-root');
      html2canvas(node, { allowTaint: false, useCORS: true }).then((canvas) => {
        const dataUrl = canvas.toDataURL();
        printJS(dataUrl, 'image');
      });
    },
    clickEmail() {
      // eslint-disable-next-line max-len
      const ref = this.data.paymentReference ? this.data.paymentReference : this.data.reference;
      const additionalPenalty = this.data.additionalPenalty.replace(/\u2013|\u2014/g, '-');
      // eslint-disable-next-line max-len
      const mailTo = `mailto:?Subject=MotoHub%20Citation%20${ref}&Body=Payment%20Reference%3A%20${ref}%0ACompletion%20Status%3A%20${escape(this.data.completionStatus)}%0ADate%3A%20${escape(this.data.date)}%0ATime%3A%20${escape(this.data.time)}%0ALocation%3A%20${escape(this.data.location)}%0ADriver%3A%20${escape(this.data.driverName)}%0AVehicle%20Registration%3A%20${escape(this.data.vehicleRegistration)}%0ACitation%20Code%3A%20${escape(this.data.citationCode)}%0ADescription%3A%20${escape(this.data.citationDescription)}%0AFine%3A%20${escape(this.data.fineAmount)}%0AAdditional%20Penalty%3A%20${escape(additionalPenalty)}%0AIssuing%20Officers%3A%20${escape(this.data.issuingOfficers[0])}`;
      console.log(mailTo);
      window.location.href = mailTo;
    },
    clickPdf() {
      const node = document.getElementById('citation-modal-print-root');
      html2canvas(node, { allowTaint: false, useCORS: true }).then((canvas) => {
        const dataUrl = canvas.toDataURL();
        // const doc = new JsPDF();
        const doc = new JsPDF('p', 'mm');
        // doc.addImage(dataUrl, 0, 0, canvas.width, canvas.height);
        // doc.addImage(dataUrl, 0, 0, 200, 300);
        doc.addImage(dataUrl, 'PNG', 10, 10);
        const ref = this.data.paymentReference ? this.data.paymentReference : this.data.reference;
        doc.save(`Citation-${ref}.pdf`);
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
  margin-right: auto;
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

.btn-disabled {
  background-color: #888888 !important;
  border-color: #888888 !important;
  cursor: default !important;
}

.btn-disabled:hover {
  background-color: #888888 !important;
  border-color: #888888 !important;
  cursor: default !important;
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
