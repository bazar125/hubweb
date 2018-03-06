<template>
  <base-modal :hide-navigation="hideNavigation" :modalId="modalId" class="driver-modal d-flex flex-column justify-content-center align-items-start" type="driver" :data="data">
    <template slot="main" slot-scope="props">
      <div class="d-flex flex-column justify-content-start align-items-center">
        <div id="driver-modal-print-root" class="data-section d-flex justify-content-start align-items-start">
          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <modal-data-row label="First Name" :text="props.data.firstName"></modal-data-row>
            <modal-data-row label="Middle Name" :text="props.data.middleName"></modal-data-row>
            <modal-data-row label="Last Name" :text="props.data.lastName"></modal-data-row>
            <modal-data-row label="Gender" :text="props.data.gender"></modal-data-row>
            <modal-data-row label="Date of Birth" :text="props.data.dob"></modal-data-row>
            <modal-data-row label="Citation Points" :text="props.data.citationPoints"></modal-data-row>
            <modal-data-row label="Prosecutions" :text="props.data.prosecutions ? props.data.prosecutions : 'None'"></modal-data-row>
          </div>

          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <modal-data-row label="Email" :text="props.data.email"></modal-data-row>
            <modal-data-row label="Current License Date Issue" :text="props.data.currentLicenseDateIssue"></modal-data-row>
            <modal-data-row label="License Class" :text="props.data.licenseClass ? props.data.licenseClass : 'n/a' "></modal-data-row>
            <modal-data-row label="License Type" :text="props.data.licenseType ? props.data.licenseType : 'n/a'"></modal-data-row>
            <modal-data-row label="License Date of First Issue" :text="props.data.licenseDateOfFirstIssue"></modal-data-row>
            <modal-data-row label="License Expiry." :text="props.data.licenseExpiry"></modal-data-row>
          </div>

          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <img class="img-main" :src="data.image ? data.image : photoPlaceholder"></img>
            <modal-data-row label="Phone" :text="props.data.phone"></modal-data-row>
            <modal-data-row label="Registered Addresses" :text="props.data.registeredAddresses ? props.data.registeredAddresses.join(', ') : ''"></modal-data-row>
            <modal-data-row label="Insured Vehicles" :text="props.data.insuredVehicles ? Object.keys(props.data.insuredVehicles).length : '0'"></modal-data-row>
          </div>
        </div>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal';
import ModalDataRow from '@/components/ModalDataRow';
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'DriverModal',
  props: ['data', 'modalId', 'hideNavigation'],
  components: {
    BaseModal,
    ModalDataRow,
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
    };
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
</style>
