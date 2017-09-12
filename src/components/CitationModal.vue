<template>
  <base-modal class="citation-modal d-flex flex-column justify-content-center align-items-start" type="citation" :data="data">
    <template slot="main" scope="props">
      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Current Plate" :text="props.data.currentPlate"></modal-data-row>
        <modal-data-row label="Manufacturer" :text="props.data.manufacturer"></modal-data-row>
        <modal-data-row label="Model" :text="props.data.model"></modal-data-row>
        <modal-data-row label="Year of Manufacture" :text="props.data.yearOfManufacture"></modal-data-row>
        <modal-data-row label="Body" :text="props.data.body"></modal-data-row>
        <modal-data-row label="Color" :text="props.data.color"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Country of Origin" :text="props.data.countryOfOrigin"></modal-data-row>
        <modal-data-row label="Cylinder Capacity" :text="props.data.cylinderCapacity"></modal-data-row>
        <modal-data-row label="Date of First Reg." :text="props.data.dateOfFirstRegistration"></modal-data-row>
        <modal-data-row label="Import Date" :text="props.data.importDate"></modal-data-row>
        <modal-data-row label="Fuel Type" :text="props.data.fuelType"></modal-data-row>
        <modal-data-row label="Odometer History" :text="props.data.odometerHistory ? props.data.odometerHistory.join(', ') : ''"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Mot Expiry" :text="props.data.motExpiry"></modal-data-row>
        <modal-data-row label="Engine Number" :text="props.data.engineNumber"></modal-data-row>
        <modal-data-row label="Pin" :text="props.data.pin"></modal-data-row>
        <modal-data-row label="Vin" :text="props.data.vin"></modal-data-row>
        <modal-data-row label="Insured Drivers" :text="!props.data.insuredDrivers ? '' : `${props.data.insuredDrivers[0].name} (${props.data.insuredDrivers[0].coverageType}, ${props.data.insuredDrivers[0].startDate} - ${props.data.insuredDrivers[0].validUntil})`"></modal-data-row>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal';
import ModalDataRow from '@/components/ModalDataRow';

export default {
  name: 'CitationModal',
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
