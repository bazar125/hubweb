<template>
  <div class="view-driver d-flex flex-column justify-content-start align-items-center">
    <b-modal title="Driver" id="driverModal" :no-close-on-backdrop="true" :hide-header="true" :hide-footer="true">
      <driver-modal :hide-navigation="true" modalId="driverModal" :data="driver"></driver-modal>
    </b-modal>
  </div>
</template>

<script>
import DriverModal from '@/components/DriverModal';
import TablePageLoader from '@/services/TablePageLoader';

const driverLoader = new TablePageLoader('driver');

export default {
  name: 'ViewDriver',
  components: {
    DriverModal,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      driver: {},
    };
  },
  mounted() {
    this.$root.$emit('::hideNavigation');

    const driverQuery = {
      bool: {
        must: [
          {
            term: { _id: this.id },
          },
        ],
      },
    };

    driverLoader.load(1, driverQuery).then((page) => {
      this.driver = page.items[0];
      this.$root.$emit('show::modal', 'driverModal');
    });
  },
  destroyed() {
    this.$root.$emit('::showNavigation');
  },
};
</script>

<style scoped>
.view-driver {
  /* width: calc(100% - 150px); */
  width: 100%;
  /* min-width: calc(100% - 150px); */
  background-color: #2c2e4a;
  padding: 20px;
}
</style>