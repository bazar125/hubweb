<template>
  <div class="vehicle-modal d-flex flex-column justify-content-center align-items-start">
    <modal-image-section :auditBtnTitle="auditBtnTitle" @clickEdit="toggleEdit()" @clickAuditHistory="toggleAudit()" type="vehicle" :data="data"></modal-image-section>

    <div v-if="showAudit" class="audit-root-container d-flex justify-content-start align-items-start">
      <modal-audit-section record-type="vehicle" :data="data"></modal-audit-section>
    </div>
    <div v-else-if="showEdit" class="edit-root-container d-flex justify-content-start align-items-start">
      <div class="edit-row d-flex justify-content-start align-items-center">
        <json-editor :onChange="onChange" :json="json"></json-editor>
      </div>
    </div>
    <div v-else class="data-outer-container d-flex flex-column justify-content-start align-items-start">
      <span class="details-title">Details</span>
      <div class="data-root-container d-flex justify-content-start align-items-start">
        <div class="data-container d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
          <modal-data-row label="Current Plate" :text="data.currentPlate"></modal-data-row>
          <modal-data-row label="Manufacturer" :text="data.manufacturer"></modal-data-row>
          <modal-data-row label="Model" :text="data.model"></modal-data-row>
          <modal-data-row label="Year of Manufacture" :text="data.yearOfManufacture"></modal-data-row>
          <modal-data-row label="Body" :text="data.body"></modal-data-row>
          <modal-data-row label="Color" :text="data.color"></modal-data-row>
        </div>

        <div class="data-container d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
          <modal-data-row label="Country of Origin" :text="data.countryOfOrigin"></modal-data-row>
          <modal-data-row label="Cylinder Capacity" :text="data.cylinderCapacity"></modal-data-row>
          <modal-data-row label="Date of First Reg." :text="data.dateOfFirstRegistration"></modal-data-row>
          <modal-data-row label="Import Date" :text="data.importDate"></modal-data-row>
          <modal-data-row label="Fuel Type" :text="data.fuelType"></modal-data-row>
          <modal-data-row label="Odometer History" :text="data.odometerHistory ? data.odometerHistory.join(', ') : ''"></modal-data-row>
        </div>

        <div class="data-container d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
          <modal-data-row label="Mot Expiry" :text="data.motExpiry"></modal-data-row>
          <modal-data-row label="Engine Number" :text="data.engineNumber"></modal-data-row>
          <modal-data-row label="Pin" :text="data.pin"></modal-data-row>
          <modal-data-row label="Vin" :text="data.vin"></modal-data-row>
          <modal-data-row label="Insured Drivers" :text="!data.insuredDrivers ? '' : `${data.insuredDrivers[0].name} (${data.insuredDrivers[0].coverageType}, ${data.insuredDrivers[0].startDate} - ${data.insuredDrivers[0].validUntil})`"></modal-data-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalImageSection from '@/components/ModalImageSection';
import ModalAuditSection from '@/components/ModalAuditSection';
import ModalDataRow from '@/components/ModalDataRow';

export default {
  name: 'VehicleModal',
  props: ['data'],
  components: {
    ModalImageSection,
    ModalAuditSection,
    ModalDataRow,
  },
  data() {
    return {
      showAudit: false,
      showEdit: false,
      auditBtnTitle: 'Audit History',
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
    },
    toggleEdit() {
      this.showEdit = !this.showEdit;
      this.showAudit = false;
    },
    onChange(newJson) {
      console.log(newJson);
    },
  },
};
</script>

<style scoped>
.audit-root-container {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.edit-root-container {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.data-root-container {
  width: 100%;
  height: 100%;
}

.data-container .modal-data-row {
  flex: 1;
}

.data-outer-container {
  width: 100%;
  margin-top: 10px;
}

.edit-row {}

.details-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
