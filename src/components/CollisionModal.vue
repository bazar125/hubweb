<template>
  <boot-base-modal :hide-navigation="hideNavigation" class="collision-modal d-flex flex-column justify-content-center align-items-start" title="Collision" type="collision" :modalId="modalId" :data="data">
    <template slot="main" slot-scope="props">
      <div class="d-flex flex-column justify-content-start align-items-center">
        <div id="collision-modal-print-root" class="d-flex flex-column justify-content-start align-items-start">
          <div class="data-section d-flex justify-content-start align-items-start">
            <div class="data-container d-flex flex-column justify-content-start align-items-center">
              <modal-data-row label="Date" :text="props.data.date"></modal-data-row>
              <modal-data-row label="Time" :text="props.data.time"></modal-data-row>
              <modal-data-row label="Address" :text="props.data.address"></modal-data-row>
            </div>

            <div class="data-container d-flex flex-column justify-content-start align-items-center">
              <modal-data-row label="Location Description" :text="props.data.attendingOfficer"></modal-data-row>
              <modal-data-row label="Attending Officer" :text="props.data.attendingOfficer"></modal-data-row>
              <modal-data-row label="Reference" :text="props.data.reference"></modal-data-row>
              <modal-data-row label="Description" :text="props.data.description"></modal-data-row>
            </div>

            <div class="data-container d-flex flex-column justify-content-start align-items-center">
              <img class="img-main" :src="data.image ? data.image : photoPlaceholder"></img>
              <modal-data-attachments @clickImage="clickImage" :data="data"></modal-data-attachments>
            </div>
          </div>

           <div v-if="(props.data.audio && props.data.audio.length > 0)" class="data-section d-flex justify-content-start align-items-start">
            <div class="data-container d-flex flex-column justify-content-start align-items-center">
              <span class="data-label">Audio Attachments</span>
              <audio v-for="audioUrl in props.data.audio" :key="audioUrl" controls preload="none" class="audio-controls">
                <source :src="audioUrl" type="audio/mp4" />
              </audio>
            </div>
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
  name: 'CollisionModal',
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

.audio-controls {
  width: 100%;
  margin-bottom: 10px;
}

.data-label {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 11px;
  line-height: 1.5;
  text-align: start;
  color: rgba(0, 0, 0, 0.87);
}
</style>
