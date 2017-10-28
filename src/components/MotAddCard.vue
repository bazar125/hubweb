<template>
  <div class="mot-add-card d-flex justify-content-start align-items-center">
    <dark-card class="mot-add-card" title="Add MOT Certificate">
      <div class="d-flex justify-content-center align-items-center" style="width: 100%;">
        <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1;">
          <span>
            <b>Step 1:</b> Select MOT certificate from PC</span>
          <div class="d-flex">
            <input style="display: none;" ref="fileInput" type="file" @change="addFile($event)">
            <b-form-input :disabled="true" class="name-file" v-model="fileName" size="sm" type="text"></b-form-input>
            <base-btn @click="clickBrowse()" text="Browse" class="btn-browse"></base-btn>
          </div>
          <base-btn :class="{'btn-disabled': !allowSubmitCertificate}" @click="clickSubmitCertificate()" text="Submit Certificate" class="btn-submit-certificate"></base-btn>
        </div>
        <div v-viewer class="attachment-container d-flex justify-content-start align-items-center">
          <img class="attachment-preview" :src="attachmentSource ? attachmentSource : photoPlaceholder"></img>
        </div>
      </div>
    </dark-card>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import ModalDataRow from '@/components/ModalDataRow';

import PhotoPlaceholder from '../assets/photo_placeholder.png';

export default {
  props: ['vehicle'],
  name: 'MotAddCard',
  components: {
    BaseBtn,
    DarkCard,
    ModalDataRow,
  },
  data() {
    return {
      motSubmissions: [],
      fileName: '',
      file: '',
      attachmentSource: '',
      photoPlaceholder: PhotoPlaceholder,
    };
  },
  mounted() {
    // if (!this.vehicle) {
    //   return;
    // }
  },
  computed: {
    allowSubmitCertificate() {
      if (this.file) {
        return true;
      }
      return false;
    },
  },
  methods: {
    clickSubmitCertificate() {
      if (!this.file || !this.vehicle.$id) {
        return;
      }
      const certificateGuid = this.getGuid();
      const certificateRef = Firebase.storage().ref(
        `motCertificate/${certificateGuid}.jpg`
      );

      certificateRef.put(this.file).then(snap => {
        const downloadUrl = snap.downloadURL;
        let motCertificates = this.vehicle.motCertificates;
        if (!motCertificates) {
          motCertificates = [];
        }
        motCertificates.push(downloadUrl);
        const ref = Firebase.database().ref();
        const updates = {};
        updates[
          `/vehicles/${this.vehicle.$id}/motCertificates`
        ] = motCertificates;
        ref.update(updates).then(() => {
          this.file = '';
          this.fileName = '';
          this.attachmentSource = '';
        });
      });
    },
    S4() {
      // eslint-disable-next-line no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    getGuid() {
      return `${this.S4()}${this.S4()}-${this.S4()}-4${this.S4().substr(
        0,
        3
      )}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`.toLowerCase();
    },
    addFile(event) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;

      const fileReader = new FileReader();
      fileReader.onload = e => {
        this.attachmentSource = e.target.result;
      };
      fileReader.readAsDataURL(this.file);
    },
    clickBrowse() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
.mot-add-card {
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

.btn-verify {
  margin-left: 10px;
  height: 20px !important;
  width: 40px !important;
  padding: 0px !important;
  background-color: #4869a4 !important;
  border-color: #4869a4 !important;
  color: white;
  font-size: 9px !important;
  font-weight: 600;
  transition: ease-out 0.2;
}

.btn-verify:hover {
  background-color: #094977 !important;
  border-color: #094977 !important;
  transition: ease-out 0.2;
}

.btn-browse {
  height: 30px !important;
  background-color: #4869a4 !important;
  border-color: #4869a4 !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  margin-left: 10px;
}

.btn-browse:hover {
  background-color: #094977 !important;
  border-color: #094977 !important;
}

.btn-submit-certificate {
  margin-top: 10px;
  margin-left: 40px;
  width: 160px;
  height: 30px !important;
  background-color: #63a54b !important;
  border-color: #63a54b !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.btn-submit-certificate.btn-disabled {
  background-color: lightgray !important;
  border-color: lightgray !important;
}

.btn-submit-certificate:hover {
  background-color: #83bd6e !important;
  border-color: #83bd6e !important;
}

.btn-submit-certificate.btn-disabled:hover {
  background-color: lightgray !important;
  border-color: lightgray !important;
}

.name-file {
  width: 250px;
  font-size: 11px;
}

.attachment-preview {
  margin-left: 20px;
  flex: 1; 
  height: 100px;
  border: 1px solid #eceeef;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
 }

.attachment-container {
  flex: 1;
  width: 100%;
  max-width: 100%;
}

.attachment-container:not(:last-child) {
  margin-bottom: 5px;
}
</style>
