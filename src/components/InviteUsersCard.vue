<template>
  <dark-card title="Users" class="invite-users-card">
    <div class="d-flex flex-column justify-content-start align-items-center">
      <div class="d-flex justify-content-start align-items-center">
        <b-input-group>
          <b-form-input class="input-email" v-model="email" size="sm" type="email" placeholder="Email"></b-form-input>
        </b-input-group>
        <base-btn @click="clickInvite()" class="btn-invite" text="Invite" icon="plus"></base-btn>
      </div>

      <b-list-group class="users-list">
        <!-- <b-list-group-item active> -->
        <b-list-group-item class="user-list-item" v-for="(user, index) in users" :key="user">
          <img class="img-avatar" src="../assets/user_avatar.jpg"></img>
          {{user}}
          <base-btn @click="clickEditUser(index)" class="ml-auto btn-view" icon="pencil"></base-btn>
          <div class="d-flex flex-column">
            <b-badge pill variant="success">ACCEPTED</b-badge>
            <span class="txt-timeago">2 hours ago</span>
          </div>
          <edit-user-modal :user="user" :index="index"></edit-user-modal>
        </b-list-group-item>
      </b-list-group>
    </div>
  </dark-card>
</template>

<script>
import EditUserModal from '@/components/EditUserModal';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

export default {
  name: 'InviteUsers',
  components: {
    BaseBtn,
    DarkCard,
    EditUserModal,
  },
  data() {
    return {
      users: ['John Doe', 'Jane Doe', 'Bob Doe'],
    };
  },
  methods: {
    clickEditUser(index) {
      const modalId = `clickEditUserModal${index}`;
      console.log(modalId);
      this.$emit('show::modal', modalId, this);
    },
    clickInvite() {
    },
  },
};
</script>

<style scoped>
.invite-users-card {
  /* width: 61.8%; */
  /* margin: 20px; */
}

.input-email {
  /* border-color: #8f90a8; */
  width: 300px;
  border-radius: 14px;
  background-color: transparent;
  /* color: white; */
  /* color: rgba(0,0,0,0.87); */
}

.input-email:focus {
  border-color: #5cb3fd;
}

.btn-invite {
  margin-left: 10px;
  height: 27.5px !important;
  padding: 3px !important;
  padding: 0px 8px !important;
  color: rgba(0,0,0,0.54) !important;
}

.btn-invite:hover {
  background-color: rgba(255,255,255,0.5);
  color: rgba(0,0,0,0.84) !important;
}

.btn-invite >>> .btn-icon {
  color: rgba(0,0,0,0.54) !important;
}

.btn-invite:hover >>> .btn-icon {
  color: rgba(0,0,0,0.84) !important;
  transition: ease-out 0.2s;
}

.users-list {
  margin-top: 10px;
  width: 100%;
  flex: 1;
}

.user-list-item {
  position: relative;
  background: transparent;
  /* border-color: #8f90a8;
  color: white; */
  padding: 0.75rem 1rem;
}

.img-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
}

.txt-timeago {
  /* position: absolute;
  top: 2px;
  right: 4px; */
  font-size: 8px;
  margin-top: 2px;
  /* color: rgba(255, 255, 255, 0.7); */
  color: rgba(0,0,0, 0.7);
}

.btn-view {
  height: 30px !important;
  width: 30px !important;
  margin-right: 10px;
  padding: 0px !important;
  color: rgba(0,0,0, 0.84) !important;
}
</style>
