<template>
  <base-card hidePlaceholder="true" class="dark-card">
    <div class="root-container d-flex flex-column justify-content-start align-items-start">
      <div class="title-container d-flex justify-content-center align-items-center">
        <span class="txt-title">{{title}}</span>

        <div v-if="showNavigation" class="navigation-container d-flex justify-content-start align-items-center">
          <div @click="clickNewTab" class="ml-auto heading-btn-container d-flex justify-content-start align-items-center">
            <span class="txt-heading">open in new tab</span>
            <icon class="icon-heading" name="external-link"></icon>
            <!-- <base-btn @click="clickDelete()" class="btn-heading" icon="external-link"></base-btn> -->
          </div>
          <div @click="clickClose" class="heading-btn-container d-flex justify-content-start align-items-center">
            <span class="txt-heading">close</span>
            <icon class="icon-heading" name="times-circle-o"></icon>
            <!-- <base-btn @click="clickClose()" class="btn-heading" icon="times-circle-o"></base-btn> -->
          </div>
        </div>
      </div>
      <div class="main-container flex-column d-flex justify-content-start align-items-center">
        <slot>
        </slot>
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseCard from '@/components/BaseCard';

export default {
  name: 'DarkCard',
  props: ['title', 'showPulse', 'showNavigation'],
  components: {
    BaseCard,
  },
  data() {
    return {};
  },
  methods: {
    clickClose() {
      this.$emit('clickClose');
    },
    clickNewTab() {
      this.$emit('clickNewTab');
    },
  },
};
</script>

<style scoped>
.dark-card {
  /* background-color: #323443 !important; */
  /* background-color: #white !important; */
}

.dark-card>>>.content-container {
  padding: 0px;
}

.root-container {
  flex: 1;
  height: 100%;
}

.main-container {
  padding: 10px;
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.title-container {
  position: relative;
  width: 100%;
  background-color: #4a59ad;
}

.txt-title {
  font-size: 12px;
  font-weight: 600;
  color: white;
  padding: 6px;
  text-transform: uppercase;
}

.custom-input {
  background-color: #d8d8d8;
}

.heading-btn-container {
  cursor: pointer;
  padding: 3px 10px;
  transition: ease-out 0.2s;
  border: 1px solid transparent;
}

.heading-btn-container:hover {
  /* background-color: rgba(255, 255, 255, 0.2) !important; */
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  transition: ease-out 0.2s;
}

.heading-btn-container:active {
  /* background-color: rgba(255, 255, 255, 0.5) !important; */
  border: 1px solid rgba(255, 255, 255, 0.84) !important;
  transition: ease-out 0.2s;
}

.txt-heading {
  font-weight: 600;
  font-size: 10px;
  margin-right: 5px;
  user-select: none;
  color: rgba(255, 255, 255, 0.84);
}

.icon-heading {
  height: 17px !important;
  width: 17px !important;
  padding: 0px !important;
  color: white;
}

.navigation-container {
  position: absolute;
  right: 3px;
  top: 3px;
}
</style>
