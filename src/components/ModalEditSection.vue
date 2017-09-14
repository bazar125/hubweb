<template>
  <div class="modal-edit-section d-flex flex-column justify-content-start align-items-start">
    <!-- <json-editor :onChange="onChange" :json="json"></json-editor> -->
    <template v-if="name === 'driver'">
      <div class="root-input-container d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-start" style="width: 100%;">
          <div class="container-input d-flex flex-column justify-content-center align-items-center">
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">First Name</span>
              <b-form-input v-model="data.firstName" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Last Name</span>
              <b-form-input v-model="data.lastName" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Gender</span>
              <b-form-input v-model="data.gender" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Height</span>
              <b-form-input v-model="data.height" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Date of Birth</span>
              <b-form-input v-model="data.dob" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Registered Address</span>
              <b-form-input v-model="data.registeredAddresses[0]" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
          </div>

          <div class="container-input d-flex flex-column justify-content-center align-items-center">
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Email</span>
              <b-form-input v-model="data.email" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Phone</span>
              <b-form-input v-model="data.phone" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">License Class</span>
              <b-form-input v-model="data.licenseClass" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">License Type</span>
              <b-form-input v-model="data.licenseType" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">License Expiry</span>
              <b-form-input v-model="data.licenseExpiry" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">License Date of First Issue</span>
              <b-form-input v-model="data.licenseDateOfFirstIssue" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>

          </div>
        </div>

        <b-btn @click="saveDriver()" id="btnSave" size="sm" style="margin-top: 20px;" class="btn-action">
          <div class="d-flex justify-content-center align-items-center">
            <icon class="icon-confirm" name="floppy-o"></icon>
            <span>Save Changes</span>
          </div>
        </b-btn>
      </div>
    </template>

    <template v-if="name === 'vehicle'">
      <div class="root-input-container d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-start" style="width: 100%;">
          <div class="container-input d-flex flex-column justify-content-center align-items-center">
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Body</span>
              <b-form-input v-model="data.body" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Color</span>
              <b-form-input v-model="data.color" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Country of Origin</span>
              <b-form-input v-model="data.countryOfOrigin" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Cylinder Capacity</span>
              <b-form-input v-model="data.cylinderCapacity" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Date of First Registration</span>
              <b-form-input v-model="data.dateOfFirstRegistration" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Engine Number</span>
              <b-form-input v-model="data.engineNumber" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Year of Manufacture</span>
              <b-form-input v-model="data.yearOfManufacture" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Registration State</span>
              <b-form-input v-model="data.registrationState" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
          </div>

          <div class="container-input d-flex flex-column justify-content-center align-items-center">
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Fuel Type</span>
              <b-form-input v-model="data.fuelType" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Import Date</span>
              <b-form-input v-model="data.importDate" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Manufacturer</span>
              <b-form-input v-model="data.manufacturer" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">Model</span>
              <b-form-input v-model="data.model" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">MOT Expiry</span>
              <b-form-input v-model="data.motExpiry" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">PIN</span>
              <b-form-input v-model="data.pin" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>
            <div class="input-edit-container d-flex flex-column justify-content-start align-items-start">
              <span class="input-label">VIN</span>
              <b-form-input v-model="data.vin" class="input-edit" size="sm" type="text" :formatter="format"></b-form-input>
            </div>

          </div>
        </div>

        <b-btn @click="saveVehicle()" id="btnSave" size="sm" style="margin-top: 20px;" class="btn-action">
          <div class="d-flex justify-content-center align-items-center">
            <icon class="icon-confirm" name="floppy-o"></icon>
            <span>Save Changes</span>
          </div>
        </b-btn>
      </div>
    </template>

    <template v-else-if="name === 'vehicle'">
      <div class="container-input d-flex justify-content-center align-items-center">
        <b-form-input v-model="txtAsd" size="sm" type="text" placeholder="Enter your name" :formatter="format"></b-form-input>
      </div>
    </template>
    <!-- <template v-else-if="name !== 'collision'">
                                    </template> -->
    <template v-else-if="name === 'citation'">
      <div class="container-delete d-flex flex-column justify-content-start align-items-center">
        <textarea class="form-control input-justification" v-model="deleteJustification" placeholder="Provide a justification" rows="3"></textarea>
        <b-btn @click="deleteCitation()" :class="{'btn-disabled': !deleteJustification}" id="btnDelete" size="sm" style="margin-top: 10px;" class="btn-confirm">
          <div class="d-flex justify-content-center align-items-center">
            <icon class="icon-confirm" name="exclamation-triangle"></icon>
            <span>I confirm, delete this citation</span>
          </div>
        </b-btn>
      </div>
    </template>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor';
import * as Firebase from 'firebase';
import TablePageLoader from '@/services/TablePageLoader';

const driverLoader = new TablePageLoader('driver');

export default {
  name: 'ModalEditSection',
  props: ['data', 'name'],
  components: {
    JSONEditor,
  },
  data() {
    return {
      json: {
        foo: 'bar',
      },
      dataClone: {},
      editor: {},
      newPoints: '',
      deleteJustification: '',
    };
  },
  methods: {
    deleteCitation() {
      if (!this.deleteJustification) {
        return;
      }

      const ref = Firebase.database().ref();
      const unsub = Firebase.auth().onAuthStateChanged((fbUser) => {
        ref.child(`users/${fbUser.uid}`).once('value').then((snap) => {
          const user = snap.val();
          /* eslint-disable no-underscore-dangle */
          const driverQuery = {
            bool: {
              must: [
                {
                  term: { _id: this.data.driverId },
                },
              ],
            },
          };

          driverLoader.load(1, driverQuery).then((page) => {
            const driver = page.items[0];

            const auditKey = ref.child('auditHistory').push().key;
            const auditRecord = {
              justification: this.deleteJustification,
              recordId: this.data.$id,
              recordType: 'deletePoint',
              timestamp: Firebase.database.ServerValue.TIMESTAMP,
              type: 'citation',
              userEmail: user.email,
              userId: fbUser.uid,
              userName: `${user.firstName} ${user.lastName}`,
            };

            let points = parseInt(driver.citationPoints, 10);
            if (points > 1) {
              points -= 1;
            }

            const updates = {};
            updates[`/auditHistory/${auditKey}`] = auditRecord;
            updates[`/citations/${this.data.$id}`] = null;
            updates[`/drivers/${driver.$id}/citationPoints`] = points;
            ref.update(updates).then(() => {
              this.$root.$emit('hide::modal', `${this.name}Modal`);
              unsub();
            });
          });
        });
      });
    },
    saveDriver() {
      if (!this.data.$id) {
        return;
      }

      const ref = Firebase.database().ref();
      const updates = {};
      updates[`/drivers/${this.data.$id}/firstName`] = this.data.firstName;
      updates[`/drivers/${this.data.$id}/lastName`] = this.data.lastName;
      updates[`/drivers/${this.data.$id}/gender`] = this.data.gender;
      updates[`/drivers/${this.data.$id}/height`] = this.data.height;
      updates[`/drivers/${this.data.$id}/dob`] = this.data.dob;
      updates[`/drivers/${this.data.$id}/registeredAddresses/0`] = this.data.registeredAddresses[0];
      updates[`/drivers/${this.data.$id}/email`] = this.data.email;
      updates[`/drivers/${this.data.$id}/phone`] = this.data.phone;
      updates[`/drivers/${this.data.$id}/licenseClass`] = this.data.licenseClass;
      updates[`/drivers/${this.data.$id}/licenseType`] = this.data.licenseType;
      updates[`/drivers/${this.data.$id}/licenseExpiry`] = this.data.licenseExpiry;
      updates[`/drivers/${this.data.$id}/licenseDateOfFirstIssue`] = this.data.licenseDateOfFirstIssue;

      ref.update(updates).then(() => {
        this.$root.$emit('hide::modal', `${this.name}Modal`);
      });
    },
    saveVehicle() {
      if (!this.data.$id) {
        return;
      }

      const ref = Firebase.database().ref();
      const updates = {};
      updates[`/vehicles/${this.data.$id}/body`] = this.data.body;
      updates[`/vehicles/${this.data.$id}/color`] = this.data.color;
      updates[`/vehicles/${this.data.$id}/countryOfOrigin`] = this.data.countryOfOrigin;
      updates[`/vehicles/${this.data.$id}/cylinderCapacity`] = this.data.cylinderCapacity;
      updates[`/vehicles/${this.data.$id}/dateOfFirstRegistration`] = this.data.dateOfFirstRegistration;
      updates[`/vehicles/${this.data.$id}/engineNumber`] = this.data.engineNumber;
      updates[`/vehicles/${this.data.$id}/fuelType`] = this.data.fuelType;
      updates[`/vehicles/${this.data.$id}/importDate`] = this.data.importDate;
      updates[`/vehicles/${this.data.$id}/manufacturer`] = this.data.manufacturer;
      updates[`/vehicles/${this.data.$id}/motExpiry`] = this.data.motExpiry;
      updates[`/vehicles/${this.data.$id}/pin`] = this.data.pin;
      updates[`/vehicles/${this.data.$id}/registrationState`] = this.data.registrationState;
      updates[`/vehicles/${this.data.$id}/vin`] = this.data.vin;
      updates[`/vehicles/${this.data.$id}/yearOfManufacture`] = this.data.yearOfManufacture;

      ref.update(updates).then(() => {
        this.$root.$emit('hide::modal', `${this.name}Modal`);
      });
    },
  },
  mounted() {
    this.dataClone = JSON.parse(JSON.stringify(this.data));
    const options = {
      mode: 'view',
      name: this.name.charAt(0).toUpperCase() + this.name.slice(1),
      // onEditable: (node) => {
      //   switch (node.field) {
      //     case 'citationPoints':
      //       return {
      //         field: false,
      //         value: true,
      //       };
      //     default:
      //       return false;
      //   }
      // },
    };
    this.editor = new JSONEditor(this.$refs.jsoneditor, options);
    this.editor.set(this.data);
    this.newPoints = this.data.citationPoints;
  },
  watch: {
    data(newValue) {
      if (!newValue) {
        return;
      }

      this.editor.set(newValue);
    },
  },
};
</script>

<style scoped>
.modal-edit-section {
  width: 100%;
}

.container-readonly {
  padding: 10px 0px;
}

.icon-readonly {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.txt-readonly {
  font-weight: 500;
  font-size: 10px;
}

.title-editpoints {
  font-weight: 600;
}

.label-editpoints {
  font-weight: 600;
  margin-right: 10px;
}

.edit-point-container {
  width: 100%;
  margin-top: 10px;
}

.input-points {
  width: 100px;
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

.container-delete {
  width: 100%;
}

.input-justification {
  margin-top: 10px;
  font-size: 14px;
}

.btn-confirm {
  background-color: #ef3135;
  border-color: #ef3135;
  color: white;
  transition: 0.4s;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #c20f13;
  border-color: #c20f13;
  color: white;
  transition: 0.4s;
}

.btn-disabled {
  background-color: lightgray !important;
  border-color: lightgray !important;
  cursor: default;
  transition: 0.4s;
}

.icon-confirm {
  margin-right: 8px;
}

.root-input-container {
  width: 100%;
}

.container-input {
  margin-top: 10px;
  width: 100%;
}

.input-edit-container {
  width: 200px;
}

.input-edit {
  font-size: 12px;
}

.input-label {
  font-size: 12px;
  font-weight: 600;
}
</style>
