<template>
  <div class="image-container d-flex justify-content-start align-items-center">
    <img :class="{'img-full': type === 'citation' || type === 'collision'}" class="img-main" :src="data.image ? data.image : photoPlaceholder"></img>

    <div v-if="type !== 'collision'" :class="{'container-overlay': type === 'citation'}" class="d-flex flex-column justify-content-start align-items-start" style="height: 100%; flex: 1;">
      <div class="d-flex justify-content-start align-items-center" style="width: 100%; padding: 5px;">
        <span v-if="type === 'driver' || type === 'vehicle'" class="alert-title mr-auto">Alerts</span>
        <b-btn v-if="type !== 'collision' "@click="$emit('clickEdit');" id="btnEdit" size="sm" class="btn-action" :class="{'btn-cancel': editBtnTitle === 'Back', 'btn-delete': editBtnTitle === 'Delete', 'ml-auto': type === 'citation'}">{{editBtnTitle}}</b-btn>
        <b-btn v-if="type === 'driver' || type === 'vehicle'" @click="$emit('clickAuditHistory');" id="btnAuditHistory" size="sm" class="btn-action" :class="{'btn-show-details': auditBtnTitle === 'Details'}">{{auditBtnTitle}}</b-btn>
      </div>
      <div v-if="type === 'driver' || type === 'vehicle'" class="d-flex justify-content-start align-items-center" style="flex: 1; padding: 5px; width: 100%;">
        <icon v-if="!alertText" name="check-circle-o" class="alert-icon icon-success"></icon>
        <icon v-else name="exclamation-triangle" class="alert-icon icon-error"></icon>
        <span class="alert-text">{{alertText ? alertText : `This ${type} has no new notices`}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoPlaceholder from '../assets/photo_placeholder.png';

function validateVehicle(val) {
  const now = Date.now();
  const motExpiry = Date.parse(val.motExpiry);
  if (now > motExpiry) {
    this.alertText = 'Vehicle MOT has expired';
  } else {
    this.alertText = '';
  }
}

function validateDriver(val) {
  const now = Date.now();
  const licenseExpiry = Date.parse(val.licenseExpiry);
  const citationPoints = val.citationPoints;
  if (now > licenseExpiry && citationPoints > 0) {
    this.alertText = 'Driver license has expired, driver has citation points';
  } else if (now > licenseExpiry) {
    this.alertText = 'Driver license has expired';
  } else if (citationPoints > 0) {
    this.alertText = 'Driver has citation points';
  } else {
    this.alertText = '';
  }
}

export default {
  name: 'ModalImageSection',
  props: ['data', 'type', 'auditBtnTitle', 'editBtnTitle'],
  components: {
  },
  data() {
    return {
      alertText: '',
      photoPlaceholder: PhotoPlaceholder,
    };
  },
  watch: {
    data(newValue) {
      if (!this.type) {
        return;
      }

      if (this.type === 'vehicle') {
        validateVehicle.bind(this)(newValue);
      } else if (this.type === 'driver') {
        validateDriver.bind(this)(newValue);
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  /* border: 1px solid #ececec; */
  border: 1px solid #797a97;
  overflow: hidden;
  border-radius: 4px;
}

.img-main {
  margin-right: 5px;
  width: 125px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
}

.img-full {
  margin-right: 0px;
  flex: 1;
}

.alert-title {
  font-weight: 600;
  font-size: 14px;
}

.alert-text {
  font-size: 14px;
}

.alert-icon {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

.icon-success {
  color: #00B76F;
}

.icon-error {
  color: #ef3135;
}

.btn-action {
  background-color: #0275d8;
  border-color: #0275d8;
  color: white;
  font-size: 13px;
  transition: 0.4s;
  cursor: pointer;
}

.btn-action:hover {
  /* background-color: #1893fd; */
  /* border-color: #1893fd; */
  background-color: #01559e;
  border-color: #01559e;
  transition: 0.4s;
}

.btn-show-details {
  background-color: #5bc0de !important;
  border-color: #5bc0de !important;
  transition: 0.4s;
}

.btn-show-details:hover {
  background-color: #2badd4 !important;
  border-color: #2badd4 !important;
  transition: 0.4s;
}

.btn-cancel {
  background-color: #f0ad4e !important;
  border-color: #f0ad4e !important;
  transition: 0.4s;
}

.btn-cancel:hover {
  background-color: #cb7e11 !important;
  border-color: #cb7e11 !important;
  transition: 0.4s;
}

.btn-delete {
  background-color: #ef3135 !important;
  border-color: #ef3135 !important;
  transition: 0.4s;
}

.btn-delete:hover {
  background-color: #ef3135 !important;
  border-color: #ef3135 !important;
  transition: 0.4s;
}

.btn-disabled {
  background-color: #ececec;
  border-color: #ececec;
  color: lightgray;
  cursor: default;
}

.container-overlay {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
