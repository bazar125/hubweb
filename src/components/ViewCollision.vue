<template>
  <div class="view-collision d-flex flex-column justify-content-start align-items-center">
    <b-modal title="Collision" id="collisionModal" :no-close-on-backdrop="true" :hide-header="true" :hide-footer="true">
      <collision-modal :hide-navigation="true" modalId="collisionModal" :data="collision"></collision-modal>
    </b-modal>
  </div>
</template>

<script>
import CollisionModal from '@/components/CollisionModal';
import TablePageLoader from '@/services/TablePageLoader';
import ModelFactory from '@/services/ModelFactory';

const collisionLoader = new TablePageLoader('collision');

export default {
  name: 'ViewCollision',
  components: {
    CollisionModal,
  },
  computed: {
    reference() {
      return this.$route.params.reference;
    },
  },
  data() {
    return {
      collision: {},
    };
  },
  mounted() {
    this.$root.$emit('::hideNavigation');

    const collisionQuery = {
      bool: {
        must: [
          {
            term: { reference: this.reference },
          },
        ],
      },
    };

    collisionLoader.load(1, collisionQuery).then((page) => {
      if (!page.items || page.items.count === 0) {
        return;
      }

      this.collision = ModelFactory.collision(page.items[0]);
      this.$root.$emit('show::modal', 'collisionModal');
    });
  },
  destroyed() {
    this.$root.$emit('::showNavigation');
  },
};
</script>

<style scoped>
.view-collision {
  /* width: calc(100% - 150px); */
  width: 100%;
  /* min-width: calc(100% - 150px); */
  background-color: #2c2e4a;
  padding: 20px;
}
</style>