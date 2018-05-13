<template>
  <div class="report-carousel-slide">
    <div class="slide-background-container" :style="{'background-image': `url(${background})`}"></div>
    <div class="slide-content-container d-flex flex-column justify-content-start align-items-start">
      <span class="slide-text">{{text}}</span>
      <b-button size="sm" class="slide-btn">
        {{actionTitle ? actionTitle : "More Info"}}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportCarouselSlide',
  props: ['text', 'background', 'actionTitle'],
  components: {

  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>

.report-carousel-slide {
  position: relative;
  height: 100%;
  border: solid #ececec;
  border-width: 1px;
}

.slide-background-container {
  position: absolute;
  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-attachment: fixed;
  background-clip: border-box;
  background-origin: padding-box;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;

  filter: opacity(0.9) brightness(0.2);
}

.slide-content-container {
  height: 100%;
  position: absolute;
  padding-left: 55px;
  padding-top: 25px;
}

.slide-text {
  text-align: left;
  font-size: 36px;
  font-weight: 600;
  max-width: 70%;
  line-height: 1;
  margin-bottom: 43px;
  color: #508fca;
}

.slide-btn {
  background-color: #508fca;
  color: white;
  border-radius: 0px;
  border-color: #508fca;
  font-weight: 400;
  font-size: 15px;
  width: 140px;
  padding: 8px 0px;
  line-height: 1;
  cursor: pointer;
  text-transform: uppercase;
}

.slide-btn:hover {
  transition: 0.2s;
  background-color: #2f689c;
  border-color: #2f689c;
}

.slide-btn:active {
  transition: 0.2s;
  background-color: #26547e;
  border-color: #26547e;
}

</style>
