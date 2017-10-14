<template>
  <base-modal class="citation-modal d-flex flex-column justify-content-center align-items-start" title="Citation" type="citation" :modalId="modalId" :data="data">
    <template slot="main" scope="props">
      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Date" :text="props.data.date"></modal-data-row>
        <modal-data-row label="Time" :text="props.data.time"></modal-data-row>
        <modal-data-row label="Location" :text="props.data.location"></modal-data-row>
        <modal-data-row label="Driver" :text="props.data.driverName"></modal-data-row>
        <modal-data-row label="Vehicle Registration" :text="props.data.vehicleRegistration"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Citation Code" :text="props.data.citationCode"></modal-data-row>
        <modal-data-row label="Description" :text="props.data.citationDescription"></modal-data-row>
        <modal-data-row label="Fine" :text="props.data.fineAmount"></modal-data-row>
        <modal-data-row label="Additional Penalty" :text="props.data.additionalPenalty"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Issuing Officers" :text="props.data.issuingOfficers ? props.data.issuingOfficers.join(', ') : ''"></modal-data-row>
        <!-- <modal-data-row label="Payment Reference" :text="props.data.paymentReference"></modal-data-row> -->
        <modal-data-row label="Completion Status" :text="props.data.completionStatus"></modal-data-row>
      </div>      
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal';
import ModalDataRow from '@/components/ModalDataRow';

export default {
  name: 'CitationModal',
  props: ['data', 'modalId'],
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
