<template>
  <dark-card title="Active Personnel" class="active-personnel-card">
    <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1; width: 100%;">
      <b-input-group>
        <b-form-input class="input-search" v-model="search" size="sm" type="text" placeholder="Search"></b-form-input>
      </b-input-group>

      <b-list-group class="users-list">
        <!-- <b-list-group-item active> -->
        <b-list-group-item class="user-list-item" v-for="(user, index) in users" :key="user">
          <img class="img-avatar" src="../assets/user_avatar.jpg"></img>
          <div class="d-flex flex-column">
            <span class="txt-name">{{user}}</span>
            <span class="txt-zone">Zone B23</span>
          </div>
          <base-btn @click="clickEditUser(index)" class="ml-auto btn-view" icon="comment-o"></base-btn>
          <base-btn @click="clickEditUser(index)" class="btn-view" icon="search"></base-btn>
          <!-- <div class="d-flex flex-column">
                  <b-badge pill variant="success">ACCEPTED</b-badge>
                  <span class="txt-timeago">2 hours ago</span>
                </div> -->
          <edit-user-modal :user="user" :index="index"></edit-user-modal>
        </b-list-group-item>
      </b-list-group>
    </div>
  </dark-card>
</template>

<script>
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

export default {
  name: 'ActivePersonnelCard',
  components: {
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      users: ['John Doe', 'Jane Doe', 'Bob Doe'],
      search: '',
    };
  },
};
</script>

<style scoped>
.active-personnel-card {}

.input-search {
  /* border-color: #8f90a8; */
  /* width: 300px; */
  width: 100%;
  border-radius: 14px;
  background-color: transparent;
  /* color: white; */
}

.input-search:focus {
  border-color: #5cb3fd;
}

.btn-invite {
  margin-left: 10px;
  height: 27.5px !important;
  padding: 3px !important;
  padding: 0px 8px !important;
}

.users-list {
  margin-top: 10px;
  width: 100%;
  flex: 1;
}

.user-list-item {
  position: relative;
  /* background: transparent; */
  /* background-color: #2c2e4a; */
  /* background-color: #1C2C81; */
  border: 0px solid;
  /* border-color: rgba(255, 255, 255, 0.2); */
  /* color: white; */
  color: rgba(0, 0, 0, 0.87);
  border: 0px solid;
  border-radius: 4px;
  /* padding: 0.75rem 1rem; */
  padding: 0.5rem 0.5rem;
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
}

..user-list-item.active {
  background-color: #1C2C81;
}

.user-list-item:not(:last-child) {
  margin-bottom: 10px;
}

.img-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
}

.txt-name {
  text-align: start;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
}

.txt-zone {
  text-align: start;
  font-size: 10px;
}

.txt-timeago {
  /* position: absolute;
  top: 2px;
  right: 4px; */
  font-size: 8px;
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.7);
  /* color: rgba(0, 0, 0, 0.7); */
}

.btn-view {
  height: 25px !important;
  width: 25px !important;
  padding: 0px !important;
  /* color: #26B630 !important; */
  color: white !important;
  border: 0px solid white;
}
</style>
