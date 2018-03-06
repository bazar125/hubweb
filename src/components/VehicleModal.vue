<template>
  <base-modal :hide-navigation="hideNavigation" :modalId="modalId" class="vehicle-modal d-flex flex-column justify-content-center align-items-start" type="vehicle" :data="data">
    <template slot="main" slot-scope="props">
      <div class="d-flex flex-column justify-content-start align-items-center">
        <vehicle-modal-mot v-if="showMot" @onHide="hideMot" :vehicle="props.data" style="width: 100%;"></vehicle-modal-mot>
        <div v-else id="vehicle-modal-print-root" class="data-section d-flex justify-content-start align-items-start">
          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <modal-data-row label="Current Plate" :text="props.data.currentPlate"></modal-data-row>
            <modal-data-row label="Manufacturer" :text="props.data.manufacturer"></modal-data-row>
            <modal-data-row label="Model" :text="props.data.model"></modal-data-row>
            <modal-data-row label="Year of Manufacture" :text="props.data.yearOfManufacture"></modal-data-row>
            <modal-data-row label="Body" :text="props.data.body"></modal-data-row>
            <modal-data-row label="Color" :text="props.data.color"></modal-data-row>
            <modal-data-row label="Insured Drivers" :text="!props.data.insuredDrivers ? '' : `${props.data.insuredDrivers[0].name} (${props.data.insuredDrivers[0].coverageType}, ${props.data.insuredDrivers[0].startDate} - ${props.data.insuredDrivers[0].validUntil})`"></modal-data-row>
          </div>

          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <modal-data-row label="Country of Origin" :text="props.data.countryOfOrigin"></modal-data-row>
            <modal-data-row label="Cylinder Capacity" :text="props.data.cylinderCapacity"></modal-data-row>
            <modal-data-row label="Date of First Reg." :text="props.data.dateOfFirstRegistration"></modal-data-row>
            <modal-data-row label="Import Date" :text="props.data.importDate"></modal-data-row>
            <modal-data-row label="Fuel Type" :text="props.data.fuelType"></modal-data-row>
            <modal-data-row label="Odometer History" :text="props.data.odometerHistory ? props.data.odometerHistory.join(', ') : ''"></modal-data-row>
            <base-btn @click="clickViewMot" class="mr-auto btn-view" text="MOT Information" icon="search"></base-btn>
          </div>

          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <img class="img-main" :src="data.image ? data.image : photoPlaceholder"></img>
            <modal-data-row label="Mot Expiry" :text="props.data.motExpiry"></modal-data-row>
            <modal-data-row label="Engine Number" :text="props.data.engineNumber"></modal-data-row>
            <modal-data-row label="Pin" :text="props.data.pin"></modal-data-row>
            <modal-data-row label="Vin" :text="props.data.vin"></modal-data-row>
          </div>
        </div>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseBtn from '@/components/BaseBtn';
import BaseModal from '@/components/BaseModal';
import ModalDataRow from '@/components/ModalDataRow';
import VehicleModalMot from '@/components/VehicleModalMot';
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'VehicleModal',
  props: ['data', 'modalId', 'hideNavigation', 'startShowMot'],
  components: {
    BaseBtn,
    BaseModal,
    ModalDataRow,
    VehicleModalMot,
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
      showMot: false,
    };
  },
  mounted() {
    if(this.startShowMot) {
      this.showMot = true;
    }
  },
  methods: {
    clickViewMot() {
      this.showMot = true;
    },
    hideMot() {
      this.showMot = false;
    },
  },
};
</script>

<style scoped>
.img-main {
  /* margin-right: 5px; */
  width: 180px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
  margin-bottom: 5px;
}

.img-full {
  margin-right: 0px;
  flex: 1;
}

.data-section {
  flex: 1;
  width: 100%;
}

.btn-view {
  background-color: #b97310 !important;
  border-color: #b97310 !important;
  color: white !important;
  /* color: black !important; */
  margin-top: 10px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  height: 30px !important;
}

.btn-view:hover {
  background-color: #ed9c2b !important;
  border-color: #ed9c2b !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) !important;
}
</style>
