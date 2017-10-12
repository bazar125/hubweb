<template>
  <dark-card title="System Information" class="system-information-card">
    <div class="d-flex flex-column justify-content-start align-items-center">
    </div>
  </dark-card>
</template>

<script>
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

export default {
  name: 'SystemInformationCard',
  components: {
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.system-information-card {}
</style>
