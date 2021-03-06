<template>
  <div class="mot-history-card d-flex justify-content-start align-items-center">
    <dark-card class="mot-history-card" title="MOT History">
      <b-list-group v-if="motSubmissions && motSubmissions.length === 0" class="history-list">
        <b-list-group-item class="history-list-item d-flex flex-column justify-content-start align-items-start">
          <div class="placeholder-row-container d-flex justify-content-start align-items-center">
            <icon class="placeholder-icon" name="history"></icon>
            <span class="placeholder-text">No active MOT or history available</span>
          </div>
        </b-list-group-item>
      </b-list-group>
      <b-list-group v-else class="history-list">
        <b-list-group-item class="history-list-item d-flex flex-column justify-content-start align-items-start" v-for="(mot, index) in motSubmissions" :key="mot.vehicleRegistration">
          <div class="data-row-container d-flex justify-content-start align-items-center">
            <modal-data-row label="MOT Reference" :text="mot.motReference"></modal-data-row>
            <modal-data-row label="MOT Start Date" :text="`${mot.motStartDate}, ${mot.motStartTime}`"></modal-data-row>
            <modal-data-row label="MOT End Date" :text="`${mot.motEndDate}, ${mot.motEndTime}`"></modal-data-row>
          </div>
          <div class="data-row-container d-flex justify-content-start align-items-center">
            <modal-data-row label="Vehicle Registration" :text="mot.vehicleRegistration"></modal-data-row>
            <modal-data-row label="Manufacturer" :text="mot.manufacturer"></modal-data-row>
            <modal-data-row label="Model" :text="mot.model"></modal-data-row>
          </div>
          <div class="data-row-container d-flex justify-content-start align-items-center">
            <modal-data-row label="Color" :text="mot.color"></modal-data-row>
            <modal-data-row label="Year of Manufacture" :text="mot.yearOfManufacture"></modal-data-row>
            <modal-data-row label="Country of Origin" :text="mot.countryOfOrigin"></modal-data-row>
          </div>
          <div class="data-row-container d-flex justify-content-start align-items-center">
            <modal-data-row label="Issuer Name" :text="mot.issuerName"></modal-data-row>
            <modal-data-row label="Issuing Authority" :text="mot.issuingAuthority"></modal-data-row>
            <modal-data-row label="Issuing Reference" :text="mot.issuingReference"></modal-data-row>
          </div>
          <div class="data-row-container d-flex justify-content-start align-items-center">
            <modal-data-row label="Engine Capacity" :text="mot.engineCapacity"></modal-data-row>
            <modal-data-row label="Advisory Actions" :text="mot.advisoryActions"></modal-data-row>
            <modal-data-row label="Current Odometer" :text="mot.currentOdometer"></modal-data-row>
          </div>
        </b-list-group-item>
      </b-list-group>
    </dark-card>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
import DarkCard from '@/components/DarkCard';
import ModalDataRow from '@/components/ModalDataRow';

export default {
  props: ['vehicle'],
  name: 'MotHistoryCard',
  components: {
    DarkCard,
    ModalDataRow,
  },
  data() {
    return {
      motSubmissions: [],
    };
  },
  mounted() {
    if (!this.vehicle) {
      return;
    }

    const ref = Firebase.database().ref();
    ref
      .child('motSubmission')
      .orderByChild('vehicleRegistration')
      .equalTo(this.vehicle.currentPlate)
      .on('value', snap => {
        if (!snap) {
          this.motSubmissions = [];
          return;
        }
        const motSubmissions = [];
        snap.forEach(child => {
          const mot = child.val();
          motSubmissions.$id = child.key;
          motSubmissions.push(mot);
        });

        this.motSubmissions = motSubmissions;
      });
  },
};
</script>

<style scoped>
.mot-history-card {
}

.history-list {
  width: 100%;
  flex: 1;
  max-height: 200px;
  overflow-y: auto;
}

.history-list-item {
  position: relative;
  background: transparent;
  /* border-color: #8f90a8;
  color: white; */
  padding: 0.75rem 1rem;
  border-radius: 4px;
}

.history-list-item:first-child {
  margin-bottom: 10px;
}

.data-row-container {
  width: 100%;
}

.data-row-container > *:first-child {
  margin-right: 10px;
}

.placeholder-row-container {
  flex: 1;
  width: 100%;
}

.placeholder-icon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}

.placeholder-text {
  font-size: 15px;
}
</style>
