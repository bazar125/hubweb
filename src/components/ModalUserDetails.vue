<template>
  <div class="modal-user-details d-flex flex-column justify-content-start align-items-start">
    <dark-card title="User Details" @clickClose="clickClose" @clickNewTab="clickNewTab" :showNavigation="true" class="root-container d-flex flex-column justify-content-start align-items-center">
      <div class="d-flex flex justify-content-start align-items-center" style="flex: 1; width: 100%;">
        <div v-viewer class="image-container d-flex justify-content-start align-items-center">
          <img class="attachment-preview" :src="user.image ? user.image : photoPlaceholder"></img>
        </div>
        <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1; height: 100%;">
          <div class="d-flex justify-content-start align-items-start" style="flex: 1; width: 100%;">
            <modal-data-row label="First Name" :text="user.firstName"></modal-data-row>
            <modal-data-row label="Middle Name(s)" :text="user.middleName ? user.middleName : '-'"></modal-data-row>
            <modal-data-row label="Last Name" :text="user.lastName"></modal-data-row>
          </div>
          <div class="d-flex justify-content-start align-items-start" style="flex: 1; width: 100%;">
            <modal-data-row label="Email" :text="user.email" style="flex: 0.33;"></modal-data-row>
            <modal-data-row label="Account Type" :text="accountType" style="flex: 0.33;"></modal-data-row>
          </div>
        </div>
      </div> 
    </dark-card>
  </div>
</template>

<script>
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import ModalDataRow from '@/components/ModalDataRow';

import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  name: 'ModalUserDetails',
  props: ['user'],
  components: {
    BaseBtn,
    DarkCard,
    ModalDataRow,
  },
  data() {
    return {
      photoPlaceholder: PhotoPlaceholder,
      showMot: false,
    };
  },
  mounted() {
    if (this.startShowMot) {
      this.showMot = true;
    }
  },
  computed: {
    accountType() {
      if (!this.user) {
        return '';
      }

      if (this.user.accountType === 'stateAdmin') {
        return 'Administrator';
      }

      if (this.user.accountType === 'personnel') {
        return 'Personnel';
      }

      if (this.user.accountType === 'officer') {
        return 'Officer';
      }

      return '';
    },
  },
  methods: {
    clickViewMot() {
      this.showMot = true;
    },
    hideMot() {
      this.showMot = false;
    },
    clickClose() {
      this.$root.$emit('hide::modal', 'modalUserDetails');
    },
    clickNewTab() {},
  },
};
</script>

<style scoped>
.btn-view {
  background-color: #b97310 !important;
  border-color: #b97310 !important;
  color: white !important;
  /* color: black !important; */
  margin-top: 10px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  height: 30px !important;
}

.btn-view:hover {
  background-color: #ed9c2b !important;
  border-color: #ed9c2b !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
}

.root-container {
  flex: 1;
  width: 100%;
}

.attachment-preview {
  margin-right: 10px;
  flex: 1;
  height: 100px;
  /* border: 1px solid #eceeef; */
  object-fit: cover;
  object-position: center;
  cursor: pointer;
}
</style>
