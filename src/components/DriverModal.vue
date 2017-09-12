<template>
  <base-modal class="driver-modal d-flex flex-column justify-content-center align-items-start" type="driver" :data="data">
    <template slot="main" scope="props">
      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="First Name" :text="props.data.firstName"></modal-data-row>
        <modal-data-row label="Last Name" :text="props.data.lastName"></modal-data-row>
        <modal-data-row label="Gender" :text="props.data.gender"></modal-data-row>
        <modal-data-row label="Date of Birth" :text="props.data.dob"></modal-data-row>
        <modal-data-row label="Citation Points" :text="props.data.citationPoints"></modal-data-row>
        <modal-data-row label="Prosecutions" :text="props.data.prosecutions"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Email" :text="props.data.email"></modal-data-row>
        <modal-data-row label="Current License Date Issue" :text="props.data.email"></modal-data-row>
        <modal-data-row label="License Class" :text="props.data.licenseClass"></modal-data-row>
        <modal-data-row label="License Type" :text="props.data.licenseType"></modal-data-row>
        <modal-data-row label="License Date of First Issue" :text="props.data.licenseDateOfFirstIssue"></modal-data-row>
        <modal-data-row label="License Expiry." :text="props.data.licenseExpiry"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Phone" :text="props.data.phone"></modal-data-row>
        <modal-data-row label="Registered Addresses" :text="props.data.registeredAddresses ? props.data.registeredAddresses.join(', ') : ''"></modal-data-row>
        <modal-data-row label="Insured Vehicles" :text="props.data.insuredVehicles ? Object.keys(props.data.insuredVehicles).length : ''"></modal-data-row>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal';
import ModalDataRow from '@/components/ModalDataRow';

export default {
  name: 'DriverModal',
  props: ['data'],
  components: {
    BaseModal,
    ModalDataRow,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
