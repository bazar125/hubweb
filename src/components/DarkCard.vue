<template>
  <base-card hidePlaceholder="true" class="dark-card">
    <div class="root-container d-flex flex-column justify-content-start align-items-start">
      <div class="title-container d-flex justify-content-center align-items-center">
        <span class="txt-title">{{title}}</span>
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
  props: ['title', 'showPulse'],
  components: {
    BaseCard,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.dark-card {
  background-color: #323443 !important;
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
  /* position: relative; */
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
</style>
