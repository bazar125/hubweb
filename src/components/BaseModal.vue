<template>
  <div class="driver-modal d-flex flex-column justify-content-center align-items-start">
    <div :class="{'yellow-heading': isWarning}" class="modal-heading d-flex justify-content-start align-items-center">
      <span class="txt-title">{{title}}</span>
      <span :class="{'reference-nav-hidden': hideNavigation}" class="mx-auto txt-reference">Ref: {{data.location ? data.paymentReference : ''}}</span>
      <div v-if="!hideNavigation" @click="clickNewTab()" class="heading-btn-container d-flex justify-content-start align-items-center">
        <span class="txt-heading">open in new tab</span>
        <icon class="icon-heading" name="external-link"></icon>
        <!-- <base-btn @click="clickDelete()" class="btn-heading" icon="external-link"></base-btn> -->
      </div>
      <div v-if="!hideNavigation" @click="clickClose()" class="heading-btn-container d-flex justify-content-start align-items-center">
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
        <modal-data-drivers :drivers="drivers" @viewDriver="viewDriver"></modal-data-drivers>
      </div>
      <div class="d-flex" style="flex: 1; height: 100%;">
        <modal-data-vehicles :vehicles="vehicles" @viewVehicle="viewVehicle"></modal-data-vehicles>
      </div>
    </div>

    <div v-if="!showEdit && this.type === 'collision'" class="driver-vehicle-container d-flex justify-content-center align-items-start">
      <div class="d-flex" style="flex: 0.5; height: 100%;">
        <modal-data-drivers title="Perpetrators" :drivers="perpetrators" @viewDriver="viewDriver"></modal-data-drivers>
      </div>
      <div v-if="this.passengers.count > 0" class="d-flex" style="flex: 0.5; height: 100%;">
        <modal-data-drivers title="Passengers" :drivers="passengers" @viewDriver="viewDriver" style="margin-right: 0px;"></modal-data-drivers>
      </div>
    </div>

    <div v-if="!showEdit && this.type === 'collision' && this.pedestrians.count > 0" class="driver-vehicle-container d-flex justify-content-center align-items-start">
      <div class="d-flex" style="flex: 0.5; height: 100%;">
        <modal-data-drivers title="Pedestrians" :drivers="pedestrians" @viewDriver="viewDriver"></modal-data-drivers>
      </div>
    </div>

    <span v-if="!showEdit && (this.type === 'citation' && this.data.completionStatus !== 'Warning')" class="txt-timeleft">There are 12 days left to pay this citation</span>

    <div :class="{'timeleft-hidden': showEdit || this.type === 'citation' && this.data.completionStatus === 'Warning' || this.type === 'collision' }" class="action-container d-flex justify-content-end align-items-center">
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
  props: ['data', 'type', 'modalId', 'hideNavigation'],
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
    drivers() {
      if (this.type === 'citation') {
        return [{
          id: this.data.driverId,
          name: this.data.driverName,
        }];
      }

      return this.data.drivers;
    },
    perpetrators() {
      return this.data.perpetrators ? this.data.perpetrators : [];
    },
    passengers() {
      return this.data.passengers ? this.data.passengers : [];
    },
    pedestrians() {
      return this.data.pedestrians ? this.data.pedestrians : [];
    },
    vehicles() {
      if (this.type === 'citation') {
        return [{
          id: this.data.vehicleRegistration,
          name: this.data.vehicleRegistration,
        }];
      }

      return this.data.vehicles;
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
      const win = window.open(`/#/_citation/${ref}`, '_blank');
      win.focus();
    },
    viewDriver(driver) {
      console.log(driver);
      const win = window.open(`/#/_driver/${driver.$id}`, '_blank');
      win.focus();
    },
    viewVehicle(vehicle) {
      console.log(vehicle);
      const win = window.open(`/#/_vehicle/${vehicle.$id}`, '_blank');
      win.focus();
    },
    clickPrint() {
      const id = `${this.type}-modal-print-root`;
      const node = document.getElementById(id);
      html2canvas(node, { allowTaint: false, useCORS: true }).then((canvas) => {
        const dataUrl = canvas.toDataURL();
        printJS(dataUrl, 'image');
      });
    },
    clickEmail() {
      // eslint-disable-next-line max-len
      const ref = this.data.paymentReference ? this.data.paymentReference : this.data.reference;
      const additionalPenalty = this.data.additionalPenalty.replace(/\u2013|\u2014/g, '-');
      let loc;
      if (this.data.location) {
        loc = this.data.location;
      } else if (this.data.address) {
        loc = this.data.address;
      } else {
        loc = '';
      }
      const location = loc.replace(/\u2013|\u2014/g, '-');
      const typeCapital = this.type.charAt(0).toUpperCase() + this.type.slice(1);

      let body;
      if (this.type === 'citation') {
        // eslint-disable-next-line max-len
        const citationBody = `Payment%20Reference%3A%20${ref}%0ACompletion%20Status%3A%20${escape(this.data.completionStatus)}%0ADate%3A%20${escape(this.data.date)}%0ATime%3A%20${escape(this.data.time)}%0ALocation%3A%20${escape(location)}%0ADriver%3A%20${escape(this.data.driverName)}%0AVehicle%20Registration%3A%20${escape(this.data.vehicleRegistration)}%0ACitation%20Code%3A%20${escape(this.data.citationCode)}%0ADescription%3A%20${escape(this.data.citationDescription)}%0AFine%3A%20${escape(this.data.fineAmount)}%0AAdditional%20Penalty%3A%20${escape(additionalPenalty)}%0AIssuing%20Officers%3A%20${escape(this.data.issuingOfficers[0])}`;
        body = citationBody;
      } else if (this.type === 'collision') {
        // eslint-disable-next-line max-len
        const collisionBody = `Reference%3A%20${ref}%0ADate%3A%20${escape(this.data.date)}%0ATime%3A%20${escape(this.data.time)}%0ALocation%3A%20${escape(location)}%0ADrivers%3A%20${encodeURI(this.drivers.map(x => x.name).join('\n'))}%0APerpetrators%3A%20${encodeURI(this.perpetrators.map(x => x.name).join('\n'))}%0APassengers%3A%20${encodeURI(this.passengers.map(x => x.name).join('\n'))}%0APedestrians%3A%20${encodeURI(this.pedestrians.map(x => x.name).join('\n'))}%0AVehicles%3A%20${encodeURI(this.vehicles.map(x => x.plate).join('\n'))}%0A`;
        body = collisionBody;
      } else if (this.type === 'driver') {
        // eslint-disable-next-line max-len
        const driverBody = `First Name: ${this.data.firstName}\nMiddle Name(s): ${this.data.middleName}\nLast Name: ${this.data.lastName}\nGender: ${this.data.gender}\nDate of Birth: ${this.data.dob}\nCitation Points: ${this.data.citationPoints}\nProsecutions: ${this.data.prosecutions}\nEmail: ${this.data.email}\nCurrent License Date Issue: ${this.data.currentLicenseDateIssue}\nLicense Class: ${this.data.licenseClass}\nLicense Type: ${this.data.licenseType}\nLicense Date of First Issue: ${this.data.licenseDateOfFirstIssue}\nLicense Expiry: ${this.data.licenseExpiry}\nPhone: ${this.data.phone}\nRegistered Addresses: ${this.data.registeredAddresses.join('\n')}\nInsured Vehicles: ${this.data.insuredVehicles.join('\n')}\n`;
        body = encodeURI(driverBody);
      } else if (this.type === 'vehicle') {
        // eslint-disable-next-line max-len
        const vehicleBody = `Current Plate: ${this.data.currentPlate}\nManufacturer: ${this.data.manufacturer}\nModel: ${this.data.model}\nYear of Manufacture: ${this.data.yearOfManufacture}\nBody: ${this.data.body}\nColor: ${this.data.color}\nCountry of Origin: ${this.data.countryOfOrigin}\nCylinder Capacity: ${this.data.cylinderCapacity}\nDate of First Reg.: ${this.data.dateOfFirstRegistration}\nImport Date: ${this.data.importDate}\nFuel Type: ${this.data.fuelType}\nOdometer History: ${this.data.odometerHistory.join('\n')}\nMOT Expiry: ${this.data.motExpiry}\nEngine Number: ${this.data.engineNumber}\nPin: ${this.data.pin}\nVin: ${this.data.vin}\nInsured Drivers: ${this.data.insuredVehicles.map(x => `${x.name} (${x.coverageType}, ${x.startDate} - ${x.validUntil})`)}\n`;
        body = encodeURI(vehicleBody);
      }

      // eslint-disable-next-line max-len
      const mailTo = `mailto:?Subject=MotoHub%20${typeCapital}%20${ref}&Body=${body}`;
      console.log(mailTo);
      window.location.href = mailTo;
    },
    clickPdf() {
      const id = `${this.type}-modal-print-root`;
      const node = document.getElementById(id);
      html2canvas(node, { allowTaint: false, useCORS: true }).then((canvas) => {
        const dataUrl = canvas.toDataURL();
        // const doc = new JsPDF();
        const doc = new JsPDF('p', 'mm');
        // doc.addImage(dataUrl, 0, 0, canvas.width, canvas.height);
        // doc.addImage(dataUrl, 0, 0, 200, 300);
        doc.addImage(dataUrl, 'PNG', 10, 10);
        const ref = this.data.paymentReference ? this.data.paymentReference : this.data.reference;
        const typeCapital = this.type.charAt(0).toUpperCase() + this.type.slice(1);
        doc.save(`${typeCapital}-${ref}.pdf`);
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

.reference-nav-hidden {
  margin-right: 0px !important;
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
