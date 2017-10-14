<template>
  <div class="modal-data-drivers d-flex flex-column justify-content-start align-items-center">
    <span class="txt-label">Drivers</span>
    <b-list-group class="drivers-list">
      <b-list-group-item class="driver-item" v-for="(user, index) in users" :key="user">
        <img class="img-avatar" src="../assets/user_avatar.jpg"></img>
        {{user}}
        <base-btn @click="clickEditUser(index)" class="ml-auto btn-view" icon="pencil"></base-btn>
        <b-badge pill variant="success">ACCEPTED</b-badge>
        <edit-user-modal :user="user" :index="index"></edit-user-modal>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'ModalDataDrivers',
  // props: ['label', 'images'],
  props: ['data'],
  components: {
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
      users: ['John Doe', 'Jane Doe', 'Bob Doe'],
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
}

.driver-item {
  position: relative;
  background: transparent;
  border-color: #8f90a8;
  /* color: white; */
  color: rgba(0,0,0,0.87);
  padding: 0.75rem 1rem;
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
