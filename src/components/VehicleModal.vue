<template>
  <div class="vehicle-modal d-flex flex-column justify-content-center align-items-start">
    <div class="image-container d-flex justify-content-start align-items-center">
      <img class="img-main" :src="data.image"></img>

      <div class="d-flex flex-column justify-content-start align-items-start" style="height: 100%; flex: 1;">
        <div class="d-flex justify-content-start align-items-center" style="width: 100%; padding: 5px;">
          <span class="alert-title mr-auto">Notices</span>
          <b-btn size="sm" class="btn-action" style="margin-right: 10px;">Details</b-btn>
          <b-btn size="sm" class="btn-action">Audit History</b-btn>
        </div>
        <div class="d-flex justify-content-start align-items-center" style="flex: 1; padding: 5px; width: 100%;">
          <icon v-if="!alertText" name="check-circle-o" class="alert-icon icon-success"></icon>
          <icon v-if="alertText" name="exclamation-triangle" class="alert-icon icon-error"></icon>
          <span class="alert-text">{{alertText ? alertText : 'This vehicle has no new notices'}}</span>
        </div>
      </div>
    </div>

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
        <modal-data-row label="Year of Manufacture" :text="data.yearOfManufacture"></modal-data-row>
        <modal-data-row label="Insured Drivers" :text="`${data.insuredDrivers[0].name} (${data.insuredDrivers[0].coverageType}, ${data.insuredDrivers[0].startDate} - ${data.insuredDrivers[0].validUntil})`"></modal-data-row>
      </div>

    </div>

  </div>
</template>

<script>
import ModalDataRow from '@/components/ModalDataRow';

export default {
  name: 'VehicleModal',
  props: ['data'],
  components: {
    ModalDataRow,
  },
  data() {
    return {
      alertText: '',
    };
  },
  watch: {
    data(newValue) {
      const now = Date.now();
      const motExpiry = Date.parse(newValue.motExpiry);
      console.log(`aaa ${now}, ${motExpiry}`);
      if (now > motExpiry) {
        this.alertText = 'Vehicle MOT has expired';
      } else {
        this.alertText = '';
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  width: 100%;
  border: 1px solid #ececec;
  border-radius: 4px;
}

.data-root-container {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.data-container .modal-data-row {
  flex: 1;
}

.img-main {
  margin-right: 5px;
  width: 125px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
}

.alert-title {
  font-weight: 600;
  font-size: 14px;
}

.alert-text {
  font-size: 14px;
}

.alert-icon {
  height: 25px;
  width: 25px;
  margin-right: 15px;
}

.icon-success {
  color: #00B76F;
}

.icon-error {
  color: #ef3135;
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
</style>
