<template>
  <div class="chat d-flex flex-column justify-content-start align-items-center">
    <chat-card :conversationId="conversationId"></chat-card>
    <!-- <span class="txt-heading mr-auto">Manage Users</span> -->
  </div>
</template>

<script>
import ChatCard from '@/components/ChatCard';

export default {
  name: 'Chat',
  components: {
    ChatCard,
  },
  computed: {
    conversationId() {
      return this.$route.params && this.$route.params.conversationId
        ? this.$route.params.conversationId
        : '';
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.chat {
  width: calc(100% - 350px);
  /* background-color: #2c2e4a; */
  background-color: #ececec;
  padding: 8px;
  overflow: hidden;
}

.chat>>>.chat-card {
  width: 100%;
}
</style>