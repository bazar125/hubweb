<template>
  <div class="audit-section-root d-flex flex-column justify-content-start align-items-start">
    <span class="audit-title">History</span>

    <div v-if="!auditHistory || auditHistory.length === 0" class="no-audit-container d-flex justify-content-center align-items-center">
      <icon name="history" class="no-data-icon"></icon>
      <span class="no-data-text">No history available for this record</span>
    </div>
    <div v-else class="audit-row-container d-flex flex-column justify-content-start align-items-center">
      <modal-audit-row v-for="audit in auditHistory" :key="audit" :data="audit"></modal-audit-row>
    </div>
  </div>
</template>

<script>
import TablePageLoader from '@/services/TablePageLoader';
import ModalAuditRow from '@/components/ModalAuditRow';
import moment from 'moment';

const pageLoader = new TablePageLoader('auditHistory');

function processItems(items) {
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item.type === 'edit') {
      item.label = 'Edited attributes';
      // } else if(item.type === 'delete') {
      //   item.label = 'Edit attribute';
    } else if (item.type === 'addPoint') {
      item.label = 'Added citation points';
    } else if (item.type === 'deletePoint') {
      item.label = 'Deleted citation points';
    }
    item.timeAgo = moment(item.timestamp).fromNow();
  }
}

function loadAudit() {
  this.auditQuery = {
    bool: {
      must: [
        {
          term: { recordId: this.data.$id },
        },
        {
          term: { recordType: this.recordType },
        },
      ],
    },
  };
  pageLoader.load(1, this.auditQuery).then((page) => {
    processItems(page.items);
    this.auditHistory = page.items;
    this.totalAuditItems = page.totalRows;
  });
}

export default {
  name: 'ModalAuditSection',
  props: ['data', 'recordType'],
  components: {
    ModalAuditRow,
  },
  data() {
    return {
      auditHistory: [],
      auditQuery: {},
      totalAuditItems: 0,
    };
  },
  mounted() {
    if (this.data && this.recordType) {
      loadAudit.bind(this)();
    }
  },
  watch: {
    data(newValue) {
      if (!newValue || !this.recordType) {
        return;
      }
      this.data = newValue;
      loadAudit.bind(this)();
    },
  },
};
</script>

<style scoped>
.audit-section-root {
  width: 100%;
}

.no-audit-container {
  width: 100%;
  height: 180px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.no-data-text {
  font-weight: 300;
  font-size: 16px;
}

.no-data-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.audit-row-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}

.audit-title {
  font-size: 18px;
  font-weight: 600;
}
</style>
