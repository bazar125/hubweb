<template>
  <div class="modal-data-vehicles d-flex flex-column justify-content-start align-items-start">
    <span class="txt-label">Vehicles</span>
    <b-list-group class="vehicles-list">
      <b-list-group-item class="vehicle-item" v-for="(vehicle, index) in vehicles" :key="vehicle.plate">
        <img class="img-avatar" src="../assets/car_placeholder.jpg"></img>
        {{vehicle.plate}}
        <base-btn @click="$emit('viewVehicle', vehicle)" class="ml-auto btn-view" text="View"></base-btn>
        <!-- <b-badge pill variant="success">VIEW</b-badge> -->
        <!-- <edit-user-modal :user="user" :index="index"></edit-user-modal> -->
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import BaseBtn from '@/components/BaseBtn';
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'ModalDataVehicles',
  // props: ['label', 'images'],
  props: ['data', 'vehicles'],
  components: {
    BaseBtn,
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

      const images = this.data.media ? this.data.media : this.data.images;
      return images.count > index ? images[index] : this.photoPlaceholder;
    },
  },
};
</script>

<style scoped>
.modal-data-vehicles {
  width: 100%;
  margin-bottom: 5px;
}

.vehicles-list {
  margin-top: 10px;
  width: 100%;
  flex: 1;
  max-height: 142px;
  overflow-y: auto;
}

.vehicle-item {
  position: relative;
  background: transparent;
  border-color: #8f90a8;
  /* color: white; */
  color: rgba(0,0,0,0.87);
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
