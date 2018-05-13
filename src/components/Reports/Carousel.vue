<template>
  <div class="root-container preset-report-carousel d-flex flex-column">
    <carousel class="custom-carousel" :per-page="1" :pagination-active-color="'#508fca'">
      <slide v-for="(slide, index) in reports" :key="slide.text">
        <carousel-slide class="slide-background" :background="slide.background" :text="slide.text"></carousel-slide>
      </slide>
    </carousel>
  </div>
</template>

<script>
import CarouselSlide from '@/components/Reports/CarouselSlide';

export default {
  name: 'CarouselSlide',
  props: ['reports'],
  components: {
    CarouselSlide,
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 3,
      },
    };
  },
};
</script>


<style scoped>
.preset-report-carousel {
  /* 20px top margin */
  height: calc(100% - 20px);
  position: relative;
  overflow: hidden;
}

.custom-carousel {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.overlay-container {
  position: absolute;
  top: 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background: rgba(35, 128, 206, 0.9);
  z-index: 1;
}
</style>

<style>
.preset-report-carousel .VueCarousel-wrapper,
.preset-report-carousel .VueCarousel-inner {
  height: 100%;
}

.preset-report-carousel .VueCarousel-pagination {
  position: absolute;
  bottom: 0;
}
</style>
