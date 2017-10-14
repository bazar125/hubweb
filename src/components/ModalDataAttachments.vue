<template>
  <div class="modal-data-row d-flex flex-column justify-content-center align-items-start">
    <span class="data-label">Attachments</span>
    <div class="attachment-container d-flex justify-content-start align-items-center">
      <img class="img-attachment" :src="getImage(0)"></img>
      <img class="img-attachment" :src="getImage(1)"></img>
    </div>
    <div class="attachment-container d-flex justify-content-start align-items-center">
      <img class="img-attachment" :src="getImage(2)"></img>
      <img class="img-attachment" :src="getImage(3)"></img>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDataAttachments',
  // props: ['label', 'images'],
  props: ['label', 'data'],
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    getImage(index) {
      if (!this.data) {
        return this.photoPlaceholder;
      }

      const images = this.data.media ? this.data.media : this.data.images;
      return images.count > index ? images[index] : this.photoPlaceholder;
    },
  },
};
</script>

<style scoped>
.modal-data-attachments {
  width: 100%;
  margin-bottom: 5px;
}

.data-label {
  font-weight: 600;
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
