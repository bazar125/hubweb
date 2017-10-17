<template>
  <div class="view-vehicle d-flex flex-column justify-content-start align-items-center">
    <b-modal title="Vehicle" id="vehicleModal" :no-close-on-backdrop="true" :hide-header="true" :hide-footer="true">
      <vehicle-modal :hide-navigation="true" modalId="vehicleModal" :data="vehicle"></vehicle-modal>
    </b-modal>
  </div>
</template>

<script>
import VehicleModal from '@/components/VehicleModal';
import TablePageLoader from '@/services/TablePageLoader';

const vehicleLoader = new TablePageLoader('vehicle');

export default {
  name: 'ViewVehicle',
  components: {
    VehicleModal,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      vehicle: {},
    };
  },
  mounted() {
    this.$root.$emit('::hideNavigation');

    const vehicleQuery = {
      bool: {
        must: [
          {
            match: { currentPlate: this.id },
          },
        ],
      },
    };

    vehicleLoader.load(1, vehicleQuery).then((page) => {
      this.vehicle = page.items[0];
      this.$root.$emit('show::modal', 'vehicleModal');
    });
  },
  destroyed() {
    this.$root.$emit('::showNavigation');
  },
};
</script>

<style scoped>
.view-vehicle {
  /* width: calc(100% - 150px); */
  width: 100%;
  /* min-width: calc(100% - 150px); */
  background-color: #2c2e4a;
  padding: 20px;
}
</style>