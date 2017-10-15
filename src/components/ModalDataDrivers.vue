<template>
  <div class="modal-data-drivers d-flex flex-column justify-content-start align-items-start">
    <span class="txt-label">Drivers</span>
    <b-list-group class="drivers-list">
      <b-list-group-item class="driver-item" v-for="(driver, index) in drivers" :key="driver">
        <img class="img-avatar" src="../assets/user_avatar.jpg"></img>
        {{driver}}
        <base-btn @click="$emit('viewDriver', index)" class="ml-auto btn-view" text="View"></base-btn>
        <!-- <edit-user-modal :user="user" :index="index"></edit-user-modal> -->
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import BaseBtn from '@/components/BaseBtn';
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'ModalDataDrivers',
  // props: ['label', 'images'],
  props: ['data'],
  components: {
    BaseBtn,
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
      drivers: ['John Doe'],
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
.modal-data-drivers {
  width: 100%;
  margin-bottom: 5px;
}

.drivers-list {
  margin-top: 10px;
  width: 100%;
  flex: 1;
  max-height: 142px;
  overflow-y: auto;
}

.driver-item {
  position: relative;
  background: transparent;
  border-color: #8f90a8;
  /* color: white; */
  color: rgba(0, 0, 0, 0.87);
  padding: 0.5rem 1rem;
}

.img-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
}

.txt-timeago {
  /* position: absolute;
  top: 2px;
  right: 4px; */
  font-size: 8px;
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.7);
}

.btn-view {
  height: 20px !important;
  width: 40px !important;
  padding: 0px !important;
  background-color: #63a54b !important;
  border-color: #63a54b !important;
  font-size: 9px !important;
  transition: ease-out 0.2;
}

.btn-view:hover {
  background-color: #9ac98f !important;
  border-color: #9ac98f !important;
  transition: ease-out 0.2;
}

.txt-label {
  font-weight: 700;
  font-size: 11px;
  line-height: 1.5;
  text-align: start;
  /* color: #8f90a8; */
  color: rgba(0, 0, 0, 0.87);
}
</style>
