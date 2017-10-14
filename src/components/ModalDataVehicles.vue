<template>
  <div class="modal-data-vehicles d-flex flex-column justify-content-start align-items-start">
    <span class="txt-label">Vehicles</span>
    <b-list-group class="vehicles-list">
      <b-list-group-item class="vehicle-item" v-for="(vehicle, index) in vehicles" :key="vehicle">
        <img class="img-avatar" src="../assets/car_placeholder.jpg"></img>
        {{vehicle}}
        <base-btn @click="clickEditUser(index)" class="ml-auto btn-view" icon="pencil"></base-btn>
        <b-badge pill variant="success">VIEW</b-badge>
        <!-- <edit-user-modal :user="user" :index="index"></edit-user-modal> -->
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'ModalDataVehicles',
  // props: ['label', 'images'],
  props: ['data'],
  components: {
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
      vehicles: ['DEF456', 'GWA1235JS', 'ASD123'],
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
  height: 30px !important;
  width: 30px !important;
  margin-right: 10px;
  padding: 0px !important;
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
