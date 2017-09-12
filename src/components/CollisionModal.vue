<template>
  <base-modal class="collision-modal d-flex flex-column justify-content-center align-items-start" type="collision" :data="data">
    <template slot="main" scope="props">
      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Date" :text="props.data.date"></modal-data-row>
        <modal-data-row label="Time" :text="props.data.time"></modal-data-row>
        <modal-data-row label="Address" :text="props.data.address"></modal-data-row>
        <modal-data-row label="Reference" :text="props.data.reference"></modal-data-row>
        <modal-data-row label="Description" :text="props.data.description"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row v-for="(driver, index) in props.data.drivers" :key="driver" :label="`Driver ${index+1}`" :text="`${driver.name}, ${driver.dob}, ${driver.gender}`"></modal-data-row>
        <modal-data-row v-for="(vehicle, index) in props.data.vehicles" :key="vehicle" :label="`Vehicle ${index+1}`" :text="`${vehicle.plate}, ${vehicle.color}`"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Attending Officer" :text="props.data.attendingOfficer"></modal-data-row>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal';
import ModalDataRow from '@/components/ModalDataRow';

export default {
  name: 'CollisionModal',
  props: ['data'],
  components: {
    BaseModal,
    ModalDataRow,
  },
  data() {
    return {
    };
  },
  computed: {
    drivers() {
      return [];
    },
    vehicles() {
      return [];
    },
  },
};
</script>

<style scoped>

</style>
