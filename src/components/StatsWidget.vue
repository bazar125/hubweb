<template>
  <div class="stats-widget d-flex justify-content-center align-items-center">
    <div class="stats-card d-flex justify-content-center align-items-center">
      <div @click="$emit('click')" class="container-type d-flex flex-column justify-content-center align-items-center">
        <span class="txt-type"><b>{{type}}</b></span>
        <span class="txt-label">{{value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsWidget',
  props: ['icon', 'type', 'value'],
  components: {
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.stats-widget {
  /* padding-left: 10px; */
  /* padding-bottom: 10px;
  padding-top: 10px; */
  flex: 1;
  /* color: #797a97; */
  /* color: white; */
  color: rgba(0,0,0,0.87);
}

.stats-widget:last-child {
  padding-right: 10px;
}

.stats-card {
  width: 100%;
  /* padding: 10px; */
  /* background-color: white; */
  /* background-color: #3A3E5C; */
  /* background-color: #212338; */
  /* border-radius: 4px; */
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
}

.txt-stat {
  font-weight: 600;
  min-width: 60px;
  font-size: 24px;
  line-height: 1;
  padding: 5px;
}

.main-icon {
  width: 40px;
  height: 40px;
  padding: 10px;
  /* color: white; */
  color: rgba(0,0,0,0.87);
  /* border-right: 1px solid #ececec; */
  border-right: 1px solid #797a97;
}

.bg-blue {
  background-color: #1565c0;
}

.bg-red {
  background-color: #c62828;
}

.bg-yellow {
  background-color: #6a1b9a;
}

.txt-type {
  font-size: 10px;
  /* color: white; */
  color: rgba(0,0,0,0.87);
  text-transform: uppercase;
}

.txt-label {
  font-size: 24px;
  font-weight: 600;
  /* color: #c5ea8e; */
  color: #26B630;
}

.container-stat {
  border-radius: 4px;
  /* border: 1px solid #ececec; */
  border: 1px solid #797a97;
  overflow: hidden;
}

.container-type {
  /* margin-left: 15px; */
  cursor: pointer;
}
</style>
