<template>
  <boot-base-modal :hide-navigation="hideNavigation" class="citation-modal d-flex flex-column justify-content-center align-items-start" title="Citation" type="citation" :modalId="modalId" :data="data">
    <template slot="main" slot-scope="props">
      <div class="d-flex flex-column justify-content-start align-items-center">
        <div id="citation-modal-print-root" class="data-section d-flex justify-content-start align-items-start">
          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <modal-data-row label="Completion Status" :text="props.data.completionStatus"></modal-data-row>
            <modal-data-row label="Date" :text="props.data.date"></modal-data-row>
            <modal-data-row label="Time" :text="props.data.time"></modal-data-row>
            <modal-data-row label="Location" :text="props.data.location"></modal-data-row>
            <!-- <modal-data-row label="Driver" :text="props.data.driverName"></modal-data-row>
              <modal-data-row label="Vehicle Registration" :text="props.data.vehicleRegistration"></modal-data-row> -->
          </div>

          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <modal-data-row label="Citation Code" :text="props.data.citationCode"></modal-data-row>
            <modal-data-row label="Description" :text="props.data.citationDescription"></modal-data-row>
            <modal-data-row label="Fine" :text="props.data.fineAmount"></modal-data-row>
            <modal-data-row label="Additional Penalty" :text="props.data.additionalPenalty"></modal-data-row>
            <modal-data-row label="Issuing Officers" :text="props.data.issuingOfficers ? props.data.issuingOfficers.join(', ') : ''"></modal-data-row>
          </div>

          <div class="data-container d-flex flex-column justify-content-start align-items-center">
            <img class="img-main" :src="data.image ? data.image : photoPlaceholder"/>
            <!-- <modal-data-row label="Attachments" :text="props.data.completionStatus"></modal-data-row> -->
            <modal-data-attachments @clickImage="clickImage" :data="data"></modal-data-attachments>
          </div>
        </div>
      </div>
    </template>
  </boot-base-modal>
</template>

<script>
import BootBaseModal from '@/components/BootBaseModal';
import ModalDataRow from '@/components/ModalDataRow';
import ModalDataAttachments from '@/components/ModalDataAttachments';
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'CitationModal',
  props: ['data', 'modalId', 'hideNavigation'],
  components: {
    BootBaseModal,
    ModalDataRow,
    ModalDataAttachments,
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
    };
  },
  computed: {
    modalImages() {
      const mediaOrEmpty = this.data.media ? this.data.media : [];
      return this.data.images ? this.data.images : mediaOrEmpty;
    },
  },
  methods: {
    clickImage(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
.citation-modal {}

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
