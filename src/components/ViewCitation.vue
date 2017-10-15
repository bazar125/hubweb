<template>
  <div class="view-citation d-flex flex-column justify-content-start align-items-center">
    <b-modal title="Citation" id="citationModal" :no-close-on-backdrop="true" :hide-header="true" :hide-footer="true">
      <citation-modal :hide-navigation="true" modalId="citationModal" :data="citation"></citation-modal>
    </b-modal>
  </div>
</template>

<script>
import CitationModal from '@/components/CitationModal';
import TablePageLoader from '@/services/TablePageLoader';
import ModelFactory from '@/services/ModelFactory';

const citationLoader = new TablePageLoader('citation');

export default {
  name: 'ViewCitation',
  components: {
    CitationModal,
  },
  computed: {
    reference() {
      return this.$route.params.reference;
    },
  },
  data() {
    return {
      citation: {},
    };
  },
  mounted() {
    this.$root.$emit('::hideNavigation');

    const citationQuery = {
      bool: {
        must: [
          {
            term: { paymentReference: this.reference },
          },
        ],
      },
    };

    citationLoader.load(1, citationQuery).then((page) => {
      if (!page.items || page.items.count === 0) {
        return;
      }

      this.citation = ModelFactory.citation(page.items[0]);
      this.$root.$emit('show::modal', 'citationModal');
    });
  },
  destroyed() {
    this.$root.$emit('::showNavigation');
  },
};
</script>

<style scoped>
.view-citation {
  /* width: calc(100% - 150px); */
  width: 100%;
  /* min-width: calc(100% - 150px); */
  background-color: #2c2e4a;
  padding: 20px;
}
</style>