<template>
  <dark-card title="Daily Stats" class="daily-stats-card">
    <div class="d-flex justify-content-start align-items-center" style="flex: 1; width: 100%;">
      <stats-widget @click="clickCitations('daily')" type="Citations" icon="book" :value="statCitations"></stats-widget>
      <stats-widget @click="clickCollisions" type="Collisions" icon="fire" :value="statCollisions"></stats-widget>
      <stats-widget @click="clickCitations('warning')" type="Warnings" icon="exclamation" :value="statWarnings"></stats-widget>
      <stats-widget @click="clickCitations('overdue')" type="Overdue Fines" icon="exclamation" :value="statFines"></stats-widget>

      <b-modal id="citationModal" :no-close-on-backdrop="true" :hide-header="true" :hide-footer="true">
        <!-- <datatable title="Citations" modalId="citationModal" modalTitle="Citation" @resetModal="resetModal()" @page-changed="pageChanged" :items="items" :total-rows="totalRows" :per-page="perPage" :fields="fields"> -->
        <datatable @clickClose="closeCitationModal" @clickNewTab="newCitationTab" :title="citationModalTitle" modalTitle="Citation" @resetModal="resetModal()" @page-changed="loadCitationItems" :items="citations" :total-rows="totalCitations" :per-page="perPage" :fields="citationFields" :showNavigation="true">
          <!-- <template slot="modal" scope="props">
            <citation-modal :data="props.data" modal-id="citationModal"></citation-modal>
          </template> -->
        </datatable>
      </b-modal>

      <b-modal id="collisionModal" :no-close-on-backdrop="true" :hide-header="true" :hide-footer="true">
        <datatable @clickClose="closeCollisionModal" @clickNewTab="newCollisionTab" title="Collisions Today" modalTitle="Collision" @page-changed="loadCollisionItems" :items="collisions" :total-rows="totalCollisions" :per-page="perPage" :fields="collisionFields" :showNavigation="true">
          <!-- <template slot="modal" scope="props">
            <collision-modal :data="props.data" modal-id="collisionModal"></collision-modal>
          </template> -->
        </datatable>
      </b-modal>
    </div>
  </dark-card>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import * as moment from 'moment';
import StatsWidget from '@/components/StatsWidget';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import Datatable from '@/components/Datatable';
import CitationModal from '@/components/CitationModal';
import TablePageLoader from '@/services/TablePageLoader';
import ModelFactory from '@/services/ModelFactory';

const citationLoader = new TablePageLoader('citation');
const collisionLoader = new TablePageLoader('collision');

export default {
  name: 'DailyStatsCard',
  components: {
    StatsWidget,
    BaseBtn,
    DarkCard,
    Datatable,
    CitationModal,
  },
  data() {
    return {
      statCitations: 24,
      statCollisions: 3,
      statWarnings: 4,
      statFines: 37,
      currentMode: '',
      citationModalTitle: '',
      citations: [],
      collision: [],
      totalCitations: 0,
      totalCollisions: 0,
      citationQuery: {},
      collisionQuery: {},
      citationFields: {
        completionStatus: {
          label: 'Status',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        date: {
          label: 'Date',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        time: {
          label: 'Time',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        paymentReference: {
          label: 'Reference',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        fineAmount: {
          label: 'Fine',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        driverName: {
          label: 'Name',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        vehicleRegistration: {
          label: 'Plate',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        actions: {
          label: 'Actions',
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
      },
      collisionFields: {
        reference: {
          label: 'Reference',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        date: {
          label: 'Date',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        time: {
          label: 'Time',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        address: {
          label: 'Address',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell custom-datatable-address-cell',
        },
        description: {
          label: 'Description',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
        attendingOfficer: {
          label: 'Attending Officer',
          sortable: true,
          class: 'text-center vertical-middle',
          thClass: 'shorten-header',
          tdClass: 'custom-datatable-cell custom-datatable-address-cell',
        },
        allDrivers: {
          label: 'Drivers',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell custom-datatable-address-cell',
        },
        allVehicles: {
          label: 'Vehicles',
          sortable: true,
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell custom-datatable-address-cell',
        },
        actions: {
          label: 'Actions',
          class: 'text-center vertical-middle',
          tdClass: 'custom-datatable-cell',
        },
      },
      perPage: 8,
      searchFilter: '',
      currentPage: 1,
    };
  },
  methods: {
    clickCitations(mode) {
      console.log(`click mode ${mode}`);
      this.currentMode = mode;
      if (mode === 'daily') {
        this.citationModalTitle = 'Citations Today';
        this.citationQuery = this.getDailyQuery();
      } else if (mode === 'warning') {
        this.citationModalTitle = 'Warnings Today';
        this.citationQuery = this.getWarningQuery();
      } else if (mode === 'overdue') {
        this.citationModalTitle = 'Overdue Fines';
        this.citationQuery = this.getOverdueQuery();
      }
      // this.$router.push('/citations');
      // const win = window.open('/#/citations', '_blank');
      // win.focus();
      this.loadCitationItems();
      this.$root.$emit('show::modal', 'citationModal');
    },
    clickCollisions() {
      // this.$router.push('/collisions');
      this.collisionQuery = this.getCollisionQuery();
      this.loadCollisionItems();
      this.$root.$emit('show::modal', 'collisionModal');
      // const win = window.open('/#/collisions', '_blank');
      // win.focus();
    },
    loadCitationItems(newPage) {
      this.currentPage = newPage;
      citationLoader.load(newPage, this.citationQuery).then(page => {
        if (!page.items || page.items.count === 0) {
          return;
        }
        this.citations = this.processCitations(page.items);
        this.totalCitations = page.totalRows;
      });
    },
    loadCollisionItems(newPage) {
      this.currentPage = newPage;
      collisionLoader.load(newPage, this.collisionQuery).then(page => {
        if (!page.items || page.items.count === 0) {
          return;
        }
        const collisions = [];
        page.items.forEach(collision => {
          collisions.push(ModelFactory.collision(collision));
        });
        this.collisions = collisions;
        this.totalCollisions = page.totalRows;
      });
    },
    getDailyQuery() {
      const now = moment().valueOf();
      const yesterday = moment()
        .add(-30, 'days')
        .valueOf();
      return {
        bool: {
          filter: {
            range: {
              timestamp: {
                gte: yesterday,
                lte: now,
              },
            },
          },
        },
      };
    },
    getWarningQuery() {
      const now = moment().valueOf();
      const yesterday = moment()
        .add(-30, 'days')
        .valueOf();
      return {
        bool: {
          must: {
            match: { completionStatus: 'Warning' },
          },
          filter: {
            range: {
              timestamp: {
                gte: yesterday,
                lte: now,
              },
            },
          },
        },
      };
    },
    getOverdueQuery() {
      const now = moment().valueOf();
      const yesterday = moment()
        .add(-30, 'days')
        .valueOf();
      return {
        bool: {
          must: {
            match: { completionStatus: 'Overdue' },
          },
          filter: {
            range: {
              timestamp: {
                gte: yesterday,
                lte: now,
              },
            },
          },
        },
      };
    },
    getCollisionQuery() {
      return {
        bool: {
          must: [
            {
              term: { paymentReference: this.reference },
            },
          ],
        },
      };
    },
    processCitations(items) {
      for (let i = 0; i < items.length; i += 1) {
        const row = items[i];
        ModelFactory.citation(row);

        if (row.completionStatus === 'Overdue') {
          row._dirtyClass = 'danger';
          row._cellVariants = {
            completionStatus: 'danger',
          };
        } else if (row.completionStatus === 'Awaiting Payment') {
          row._dirtyClass = 'alert';
          row._cellVariants = {
            completionStatus: 'alert',
          };
        } else if (row.completionStatus === 'Warning') {
          row._dirtyClass = 'wwarning';
          row._cellVariants = {
            completionStatus: 'wwarning',
          };
        } else if (row.completionStatus === 'Paid') {
          row._dirtyClass = 'success';
          row._cellVariants = {
            completionStatus: 'success',
          };
        }
      }

      return items;
    },
    closeCitationModal() {
      this.$root.$emit('hide::modal', 'citationModal');
    },
    newCitationTab() {},
    closeCollisionModal() {
      this.$root.$emit('hide::modal', 'collisionModal');
    },
    newCollisionTab() {},
  },
};
</script>

<style scoped>
.daily-stats-card {
}

.stats-widget {
  flex: 1;
}

.daily-stats-card>>>.modal-body {
  padding: 0px !important;
}
</style>
