<template>
  <b-modal title="Edit User" :id="modalId" @hide="$emit('hide', modalId)" ok-only>
    {{user}}
  </b-modal>
</template>

<script>
export default {
  name: 'EditUserModal',
  props: ['index', 'user'],
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    modalId() {
      return `editUserModal${this.index ? this.index : ''}`;
    },
  },
};
</script>

<style scoped>

</style>

<style>
.modal-header {
  padding: 5px 10px;
  /* border-color: #797a97; */
  border-color: #8f90a8;
  color: #8f90a8;
}

.modal-header .close {
  color: #8f90a8;
  text-shadow: none;
}

.modal-header>h5 {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
}

.modal-content {
  /* background-color: #2c2e4a; */
  background-color: white;
}

.modal-footer {
  padding: 5px 10px;
  border-color: #8f90a8;
}

.modal-footer .btn {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>