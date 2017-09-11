<template>
  <div class="driver-modal d-flex flex-column justify-content-center align-items-start">
    <modal-image-section type="driver" :data="data"></modal-image-section>

    <div class="data-root-container d-flex justify-content-start align-items-start">
      <div class="data-container d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
        <modal-data-row label="First Name" :text="data.firstName"></modal-data-row>
        <modal-data-row label="Last Name" :text="data.lastName"></modal-data-row>
        <modal-data-row label="Gender" :text="data.gender"></modal-data-row>
        <modal-data-row label="Date of Birth" :text="data.dob"></modal-data-row>
        <modal-data-row label="Citation Points" :text="data.citationPoints"></modal-data-row>
        <modal-data-row label="Prosecutions" :text="data.prosecutions"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
        <modal-data-row label="Email" :text="data.email"></modal-data-row>
        <modal-data-row label="Current License Date Issue" :text="data.email"></modal-data-row>
        <modal-data-row label="License Class" :text="data.licenseClass"></modal-data-row>
        <modal-data-row label="License Type" :text="data.licenseType"></modal-data-row>
        <modal-data-row label="License Date of First Issue" :text="data.licenseDateOfFirstIssue"></modal-data-row>
        <modal-data-row label="License Expiry." :text="data.licenseExpiry"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center" style="flex: 1;">
        <modal-data-row label="Phone" :text="data.phone"></modal-data-row>
        <modal-data-row label="Registered Addresses" :text="data.registeredAddresses ? data.registeredAddresses.join(', ') : ''"></modal-data-row>
        <modal-data-row label="Insured Vehicles" :text="data.insuredVehicles ? Object.keys(data.insuredVehicles).length : ''"></modal-data-row>
      </div>
    </div>
  </div>
</template>

<script>
import ModalImageSection from '@/components/ModalImageSection';
import ModalDataRow from '@/components/ModalDataRow';

export default {
  name: 'DriverModal',
  props: ['data'],
  components: {
    ModalImageSection,
    ModalDataRow,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.data-root-container {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.data-container .modal-data-row {
  flex: 1;
}
</style>
