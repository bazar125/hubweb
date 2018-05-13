<template>
  <div class="root-container report-carousel d-flex flex-column">
    <carousel class="custom-carousel" :per-page="1" :pagination-active-color="'#508fca'">
      <slide v-for="(slide, index) in reports" :key="slide.text">
        <report-carousel-slide class="slide-background" :background="slide.background" :text="slide.text"></report-carousel-slide>
      </slide>
    </carousel>
  </div>
</template>

<script>
import ReportCarouselSlide from '@/components/Reports/ReportCarouselSlide';

export default {
  name: 'ReportCarousel',
  props: ['reports'],
  components: {
    ReportCarouselSlide,
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
.report-carousel {
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
.report-carousel .VueCarousel-wrapper,
.report-carousel .VueCarousel-inner {
  height: 100%;
}

.report-carousel .VueCarousel-pagination {
  position: absolute;
  bottom: 0;
}
</style>
