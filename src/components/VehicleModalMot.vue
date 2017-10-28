<template>
  <div class="vehicle-modal-mot d-flex flex-column justify-content-start align-items-start">
    <div class="d-flex justify-content-start align-items-center" style="position: relative; width: 100%;">
      <base-btn @click="$emit('onHide')" class="btn-back" text="Vehicle Details" icon="caret-left"></base-btn>
      <span class="mx-auto txt-title">MOT Status: <span :class="{'txt-green': !motExpired, 'txt-red': motExpired}">{{motStatus}}</span></span>
      <div></div>
    </div>
    
    <div class="d-flex flex-column justify-content-start align-items-center" style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
      <div class="d-flex justify-content-start align-items-center" style="flex: 1; width: 100%; padding-bottom: 5px;">
        <mot-history-card :vehicle="vehicle"></mot-history-card>
      </div>
      <div class="d-flex justify-content-start align-items-center" style="flex: 1; width: 100%; padding-top: 5px;">
        <mot-add-card></mot-add-card>
      </div>
    </div>
  </div>
</template>

<script>
import DarkCard from '@/components/DarkCard';
import BaseBtn from '@/components/BaseBtn';
import MotHistoryCard from '@/components/MotHistoryCard';
import MotAddCard from '@/components/MotAddCard';

export default {
  props: ['vehicle'],
  name: 'VehicleModalMot',
  components: {
    BaseBtn,
    DarkCard,
    MotHistoryCard,
    MotAddCard,
  },
  data() {
    return {};
  },
  computed: {
    motExpired() {
      if(!this.vehicle) {
        return false;
      }

      const now = Date.now();
      const motExpiry = Date.parse(this.vehicle.motExpiry);
      if (now > motExpiry) {
        return true;
      }

      return false;
    },
    motStatus() {
      if(!this.vehicle) {
        return '';
      }

      return this.motExpired ? 'Expired' : 'OK';
    },
  },
};
</script>

<style scoped>
.btn-back {
  position: absolute;
  top: 0;
  left: 0;
  color: black !important;
  padding-top: 3px !important;
  padding-bottom: 3px !important;
  height: 25px !important;
}

.btn-back:hover {
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.txt-title {
  font-weight: 700;
  font-size: 15px;
}

.mot-history-card {
  flex: 1;
  width: 100%;
}

.mot-add-card {
  flex: 1;
  width: 100%;
}

.txt-green {
  color: #63a54b;
}

.txt-red {
  color: #ef3135
}
</style>
