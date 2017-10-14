<template>
  <base-modal class="citation-modal d-flex flex-column justify-content-center align-items-start" title="Citation" type="citation" :modalId="modalId" :data="data">
    <template slot="main" scope="props">
      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <modal-data-row label="Completion Status" :text="props.data.completionStatus"></modal-data-row>
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
        <modal-data-row label="Issuing Officers" :text="props.data.issuingOfficers ? props.data.issuingOfficers.join(', ') : ''"></modal-data-row>
      </div>

      <div class="data-container d-flex flex-column justify-content-start align-items-center">
        <img :class="{'img-full': type === 'citation' || type === 'collision'}" class="img-main" :src="data.image ? data.image : photoPlaceholder"></img>
        <!-- <modal-data-row label="Attachments" :text="props.data.completionStatus"></modal-data-row> -->
        <modal-data-attachments :data="data"></modal-data-attachments>
      </div>      
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal';
import ModalDataRow from '@/components/ModalDataRow';
import ModalDataAttachments from '@/components/ModalDataAttachments';

export default {
  name: 'CitationModal',
  props: ['data', 'modalId'],
  components: {
    BaseModal,
    ModalDataRow,
    ModalDataAttachments,
  },
  data() {
    return {
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
}

.img-full {
  margin-right: 0px;
  flex: 1;
}

.attachment-container {
  flex: 1;
  width: 100%;
  max-width: 100%;
}

.img-attachment {
  height: auto;
  flex: 1;
  object-fit: cover;
  object-position: center center;
}
</style>
