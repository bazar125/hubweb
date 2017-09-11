<template>
  <div class="image-container d-flex justify-content-start align-items-center">
    <img class="img-main" :src="data.image"></img>

    <div class="d-flex flex-column justify-content-start align-items-start" style="height: 100%; flex: 1;">
      <div class="d-flex justify-content-start align-items-center" style="width: 100%; padding: 5px;">
        <span class="alert-title mr-auto">Notices</span>
        <b-btn @click="clickEdit()" id="btnEdit" size="sm" class="btn-disabled" style="margin-right: 10px;">Edit</b-btn>
        <b-btn @click="clickAuditHistory()" id="btnAuditHistory" size="sm" class="btn-action" :class="{'btn-show-details': btnTitle === 'Show Details'}">{{btnTitle}}</b-btn>
      </div>
      <div class="d-flex justify-content-start align-items-center" style="flex: 1; padding: 5px; width: 100%;">
        <icon v-if="!alertText" name="check-circle-o" class="alert-icon icon-success"></icon>
        <icon v-else name="exclamation-triangle" class="alert-icon icon-error"></icon>
        <span class="alert-text">{{alertText ? alertText : `This ${type} has no new notices`}}</span>
      </div>
    </div>
  </div>
</template>

<script>

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
  props: ['data', 'type'],
  components: {
  },
  data() {
    return {
      alertText: '',
      btnTitle: 'Audit History',
    };
  },
  methods: {
    clickAuditHistory() {
      if (this.btnTitle === 'Audit History') {
        this.btnTitle = 'Show Details';
      } else {
        this.btnTitle = 'Audit History';
      }
      this.$emit('clickAuditHistory');
    },
    clickEdit() {
      // this.$emit('clickEdit');
    },
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
  width: 100%;
  border: 1px solid #ececec;
  border-radius: 4px;
}

.img-main {
  margin-right: 5px;
  width: 125px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
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
}

.btn-disabled {
  background-color: #ececec;
  border-color: #ececec;
  color: lightgray;
  cursor: default;
}
</style>
