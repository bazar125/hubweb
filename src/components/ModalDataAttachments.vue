<template>
  <div class="modal-data-attachments d-flex flex-column justify-content-center align-items-start">
    <span class="data-label">Attachments</span>
    <div v-viewer class="attachment-container d-flex justify-content-start align-items-center">
      <img class="img-attachment" :src="getImage(0)"></img>
      <img class="img-attachment" @click="$emit('clickImage', 1)" :src="getImage(1)"></img>
    </div>
    <div v-viewer class="attachment-container d-flex justify-content-start align-items-center">
      <img class="img-attachment" @click="$emit('clickImage', 2)" :src="getImage(2)"></img>
      <img class="img-attachment" @click="$emit('clickImage', 3)" :src="getImage(3)"></img>
    </div>
  </div>
</template>

<script>
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'ModalDataAttachments',
  props: ['label', 'data'],
  components: {
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
    };
  },
  methods: {
    getImage(index) {
      if (!this.data) {
        return this.photoPlaceholder;
      }

      const imagesOrEmpty = this.data.images ? this.data.images : [];
      const images = this.data.media ? this.data.media : imagesOrEmpty;
      console.log(index);
      console.log(images);
      return images.length > index ? images[index] : this.photoPlaceholder;
    },
    clickImage(index) {
      console.log(`print image ${index}`);
    },
  },
};
</script>

<style scoped>
.modal-data-attachments {
  width: 100%;
  margin-bottom: 5px;
}

.attachment-container {
  flex: 1;
  width: 100%;
  max-width: 100%;
}

.attachment-container:not(:last-child) {
  margin-bottom: 5px;
}

.img-attachment {
  height: 40px;
  flex: 1;
  object-fit: cover;
  object-position: center center;
  cursor: pointer;
}

.img-attachment:first-child {
  margin-right: 5px;
}

.data-label {
  font-weight: 700;
  font-size: 11px;
  line-height: 1.5;
  text-align: start;
  /* color: #8f90a8; */
  color: rgba(0, 0, 0, 0.87);
}

.data-text {
  text-align: start;
  line-height: 1.5;
  font-size: 10px;
  /* color: rgba(255,255,255,0.84); */
  color: rgba(0, 0, 0, 0.87);
}
</style>
