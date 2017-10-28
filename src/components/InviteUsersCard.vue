<template>
  <dark-card title="Invite Users" class="invite-users-card">
    <div class="d-flex flex-column justify-content-start align-items-center">
      <b-tabs class="chat-user-tabs d-flex flex-column justify-content-start align-items-start">
          <b-tab title="USERS" active>
             <ul class="list">
              <li @click="clickUser(user, index)" :class="{'active': selectedIndex === index, 'unread': user.unread }" class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(user, index) in users" :key="user.$id">
                <!-- <img class="image" :src="user.image" alt="avatar" />
                <div class="about">
                  <div class="name">{{`${user.firstName} ${user.lastName}`}}</div>
                  <div class="status">
                    <icon name="circle" :class="{online: userIsOnline(user), offline: !userIsOnline(user)}"></icon> {{userStatus(user)}}
                  </div>
                </div> -->
                <b-list-group-item>
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="img-avatar" :src="user.image ? user.image : userAvatar"></img>
                    <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1;">
                      <span class="txt-username">{{`${user.firstName} ${user.lastName}`}}</span>
                      <span class="txt-userrole">{{getAccountType(user)}}</span>
                    </div>
                    <base-btn @click="clickEditUser(index)" class="ml-auto btn-view" icon="pencil"></base-btn>
                    <div class="d-flex flex-column" style="width: initial;">
                      <b-badge pill variant="success">ACCEPTED</b-badge>
                      <span class="txt-timeago">2 hours ago</span>
                    </div>
                  </div>
                    <!-- <edit-user-modal :user="user" :index="index"></edit-user-modal> -->
                </b-list-group-item>
              </li>
            </ul>
          </b-tab>
          <b-tab title="INVITE" >
            <div class="d-flex justify-content-start align-items-center" style="padding-top: 10px;">
              <b-input-group>
                <b-form-input class="input-email" v-model="email" size="sm" type="email" placeholder="Email"></b-form-input>
              </b-input-group>
              <base-btn @click="clickInvite()" class="btn-invite" text="Invite" icon="plus"></base-btn>
            </div>
            
             <ul class="list">
              <li @click="clickUser(user, index)" :class="{'active': selectedIndex === index, 'unread': user.unread }" class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(user, index) in users" :key="user.$id">
                <!-- <img class="image" :src="user.image" alt="avatar" />
                <div class="about">
                  <div class="name">{{`${user.firstName} ${user.lastName}`}}</div>
                  <div class="status">
                    <icon name="circle" :class="{online: userIsOnline(user), offline: !userIsOnline(user)}"></icon> {{userStatus(user)}}
                  </div>
                </div> -->
                <b-list-group-item>
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="img-avatar" :src="user.image ? user.image : userAvatar"></img>
                    <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1;">
                      <span class="txt-username">{{`${user.firstName} ${user.lastName}`}}</span>
                      <span class="txt-userrole">{{getAccountType(user)}}</span>
                    </div>
                    <base-btn @click="clickEditUser(index)" class="ml-auto btn-view" icon="pencil"></base-btn>
                    <div class="d-flex flex-column" style="width: initial;">
                      <b-badge pill variant="success">ACCEPTED</b-badge>
                      <span class="txt-timeago">2 hours ago</span>
                    </div>
                  </div>
                    <!-- <edit-user-modal :user="user" :index="index"></edit-user-modal> -->
                </b-list-group-item>
              </li>
            </ul>
          </b-tab>
        </b-tabs>
    </div>
  </dark-card>
</template>

<script>
import * as Firebase from 'firebase';
import EditUserModal from '@/components/EditUserModal';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

import UserAvatar from '../assets/user_avatar.jpg';

export default {
  name: 'InviteUsers',
  components: {
    BaseBtn,
    DarkCard,
    EditUserModal,
  },
  data() {
    return {
      users: [],
      email: '',
      userAvatar: UserAvatar,
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      const ref = Firebase.database().ref();
      ref.child('users').on('value', snap => {
        if (!snap) {
          this.users = [];
          return;
        }

        const users = [];
        snap.forEach(child => {
          const user = child.val();
          user.$id = child.key;
          users.push(user);
        });
        this.users = users;

        if (!this.selectedUser) {
          const user = this.users[0];
          this.selectedUser = user;
          this.clickUser(user, 0);
        }
      });
    },
    clickEditUser(index) {
      const modalId = `clickEditUserModal${index}`;
      console.log(modalId);
      this.$emit('show::modal', modalId, this);
    },
    clickInvite() {},
    getAccountType(user) {
      if (!user) {
        return '';
      }

      if (user.accountType === 'stateAdmin') {
        return 'Administrator';
      }

      if (user.accountType === 'personnel') {
        return 'Personnel';
      }

      if (user.accountType === 'officer') {
        return 'Officer';
      }

      return '';
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
  /* width: 300px; */
  border-radius: 14px;
  background-color: transparent;
  /* color: white; */
  /* color: rgba(0,0,0,0.87); */
}

.input-email:focus {
  border-color: #5cb3fd;
}

/* .btn-invite {
  margin-left: 10px;
  height: 27.5px !important;
  padding: 3px !important;
  padding: 0px 8px !important;
  color: rgba(0,0,0,0.54) !important;
  color: white !important;
  background-color: 
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
} */

.btn-invite {
  height: 30px !important;
  width: 80px !important;
  padding: 0px !important;
  margin-left: 10px;
  color: white !important;
  background-color: #63a54b !important;
  border-color: #63a54b !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.btn-invite:hover {
  background-color: #83bd6e !important;
  border-color: #83bd6e !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  border-radius: 4px;
}

.user-list-item:not(:last-child) {
  margin-bottom: 10px;
}

.img-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
  object-fit: cover;
  object-position: center;
}

.txt-username {
  text-align: start;
  font-weight: 600;
  font-size: 12px;
}

.txt-userrole {
  text-align: start;
  font-size: 11px;
}

.txt-timeago {
  /* position: absolute;
  top: 2px;
  right: 4px; */
  font-size: 8px;
  margin-top: 2px;
  /* color: rgba(255, 255, 255, 0.7); */
  color: rgba(0, 0, 0, 0.7);
}

.btn-view {
  height: 30px !important;
  width: 30px !important;
  margin-right: 10px;
  padding: 0px !important;
  color: rgba(0, 0, 0, 0.84) !important;
}

.chat-user-tabs {
  flex: 1;
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
}

.chat-user-tabs>>>div {
  width: 100%;
}

.chat-user-tabs>>>.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.chat-user-tabs>>>.tab-content {
  overflow-y: auto;
}

.chat-user-tabs>>>.nav .nav-link {
  font-size: 10px;
  border-bottom-color: #8f90a8;
  border-radius: 0px;
  color: rgba(0, 0, 0, 0.7);
}

.chat-user-tabs>>>.nav .nav-item:first-child .nav-link {
  border-top-left-radius: 4px;
}

.chat-user-tabs>>>.nav .nav-item:last-child .nav-link {
  border-top-right-radius: 4px;
}

.chat-user-tabs>>>.nav .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.34);
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}

.chat-user-tabs>>>.nav .nav-link.active {
  color: white;
  background-color: #0275d8;
  border-top-color: #0275d8;
  border-left-color: #0275d8;
  border-right-color: #0275d8;
}

.chat-user-tabs>>>.nav > * {
  flex: 1;
}

.chat-user-tabs>>>.list {
  /* flex: 1; */
  /* max-height: 150px; */
  overflow-y: auto;
  margin-bottom: 0px;
  padding: 0px;
  padding-top: 10px;
}
</style>
