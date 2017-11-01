<template>
  <dark-card title="User Management" class="invite-users-card">
    <div class="d-flex flex-column justify-content-start align-items-center" style="flex: 1; width: 100%;">
      <b-tabs class="chat-user-tabs d-flex flex-column justify-content-start align-items-start">
          <b-tab title="USERS" active>
             <ul class="list">
              <li class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(user, index) in users" :key="user.$id">
                <!-- <img class="image" : src="user.image" alt="avatar" />
                <div class="about">
                  <div class="name">{{`${user.firstName} ${user.lastName}`}}</div>
                  <div class="status">
                    <icon name="circle" :class="{online: userIsOnline(user), offline: !userIsOnline(user)}"></icon> {{userStatus(user)}}
                  </div>
                </div> -->
                <b-list-group-item class="user-item">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="img-avatar" :src="user.image ? user.image : userAvatar"></img>
                    
                    <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1;">
                      <span class="txt-username">{{`${user.firstName} ${user.lastName}`}}</span>
                      <span class="txt-userrole">{{getAccountType(user)}}</span>
                    </div>

                    <base-btn @click="clickResetPassword(user, index)" class="btn-view" icon="lock" text="Reset Password"></base-btn>
                    <base-btn @click="clickViewDetails(user, index)" class="btn-view" icon="expand" text="View Details"></base-btn>
                  </div>
                    <!-- <edit-user-modal :user="user" :index="index"></edit-user-modal> -->
                </b-list-group-item>
              </li>
            </ul>
          </b-tab>
          <b-tab title="INVITE" >
            <div class="d-flex flex-column justify-content-start align-items-center" style="padding-top: 10px;">
              <b-input-group style="margin-bottom: 10px;">
                <b-form-input class="input-email" v-model="firstName" size="sm" type="text" placeholder="First Name"></b-form-input>
                <b-form-input class="input-email" v-model="middleName" size="sm" type="text" placeholder="Middle Name(s)"></b-form-input>
                <b-form-input class="input-email" v-model="lastName" size="sm" type="text" placeholder="Last Name"></b-form-input>
              </b-input-group>
              <div class="d-flex justify-content-start align-items-center">
                <b-form-input class="input-email" v-model="email" size="sm" type="email" placeholder="Email"></b-form-input>
                <base-btn @click="clickInvite()" :class="{'btn-disabled': inviteDisabled}" class="btn-invite" text="Invite" icon="plus"></base-btn>
              </div>

              <span class="txt-invite-error" v-if="inviteErrorText">{{inviteErrorText}}</span>
            </div>
            
             <ul class="list">
              <li class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(user, index) in userInvites" :key="user.$id">
                <!-- <img class="image" :src="user.image" alt="avatar" />
                <div class="about">
                  <div class="name">{{`${user.firstName} ${user.lastName}`}}</div>
                  <div class="status">
                    <icon name="circle" :class="{online: userIsOnline(user), offline: !userIsOnline(user)}"></icon> {{userStatus(user)}}
                  </div>
                </div> -->
                <b-list-group-item class="user-item">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="img-avatar" :src="user.image ? user.image : userAvatar"></img>
                    <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1;">
                      <span class="txt-username">{{`${user.firstName} ${user.lastName}`}}</span>
                      <span class="txt-userrole">{{user.email}}</span>
                    </div>
                    <!-- <base-btn @click="clickEditUser(index)" class="ml-auto btn-view" icon="pencil"></base-btn> -->
                    <div class="d-flex flex-column" style="width: initial;">
                      <b-badge pill variant="primary">PENDING</b-badge>
                      <span class="txt-timeago">{{getTimeAgo(user.timestamp)}}</span>
                    </div>
                  </div>
                    <!-- <edit-user-modal :user="user" :index="index"></edit-user-modal> -->
                </b-list-group-item>
              </li>
            </ul>
          </b-tab>
        </b-tabs>
    </div>
    <b-modal title="User Details" id="modalUserDetails" :no-close-on-esc="true" :hide-header="true" :hide-footer="true">
      <modal-user-details :user="selectedUser"></modal-user-details>
    </b-modal>
  </dark-card>
</template>

<script>
import * as Firebase from 'firebase'
import * as moment from 'moment';
import EditUserModal from '@/components/EditUserModal';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import ModalUserDetails from '@/components/ModalUserDetails';

import UserAvatar from '../assets/user_placeholder.jpg';

export default {
  name: 'InviteUsers',
  components: {
    BaseBtn,
    DarkCard,
    EditUserModal,
    ModalUserDetails,
  },
  data() {
    return {
      users: [],
      userInvites: [],
      selectedUser: {},
      email: '',
      userAvatar: UserAvatar,
      inviteErrorText: '',
      createdUser: null,
      firstName: '',
      middleName: '',
      lastName: '',
    };
  },
  computed: {
    inviteDisabled() {
      if (!this.firstName || !this.lastName || !this.email) {
        return true;
      }

      return false;
    },
    // userInvites() {
    //   if(!this.users || this.users.length === 0) {
    //     return [];
    //   }

    //   return this.users.slice().filter(x => x.lastLogin && x.lastLogin === 0);
    // },
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    getTimeAgo(timestamp) {
      if (!timestamp) {
        return '';
      }
      return moment(timestamp).fromNow();
    },
    clickResetPassword(user) {
      if(!user || !user.email) {
        return;
      }

      Firebase.auth().sendPasswordResetEmail(user.email);
    },
    clickViewDetails(user) {
      this.selectedUser = user;
      this.$root.$emit('show::modal', 'modalUserDetails');
    },
    loadUsers() {
      const ref = Firebase.database().ref();
      ref.child('users').on('value', snap => {
        if (!snap) {
          this.users = [];
          return;
        }

        const users = [];
        const userInvites = [];
        snap.forEach(child => {
          const user = child.val();
          user.$id = child.key;
          if(user.lastLogin === 0) {
            userInvites.push(user);
          } else {
            users.push(user);
          }
        });
        this.users = users;
        this.userInvites = userInvites;

        if (!this.selectedUser) {
          const user = this.users[0];
          this.selectedUser = user;
          // this.clickUser(user, 0);
        }
      });
    },
    clickEditUser(index) {
      const modalId = `clickEditUserModal${index}`;
      console.log(modalId);
      this.$emit('show::modal', modalId, this);
    },
    clickInvite() {
      if (!this.email || !this.firstName || !this.lastName) {
        return;
      }

      const randomPassword =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);

      Firebase.auth()
        .createUserWithEmailAndPassword(this.email, randomPassword)
        .then(user => {
          this.createdUser = user;
          return Firebase.auth().sendPasswordResetEmail(this.email);
        })
        .then(() => {
          const user = {};
          user.accountType = 'stateAdmin';
          user.email = this.email;
          user.firstName = this.firstName;
          user.middleName = this.middleName;
          user.lastName = this.lastName;
          user.image = '';
          user.lastLogin = 0;
          user.active = true;

          const ref = Firebase.database().ref();
          const userKey = this.createdUser.uid;
          const updates = {};
          updates[`/users/${userKey}`] = user;
          ref.update(updates);
          this.email = '';
          this.firstName = '';
          this.middleName = '';
          this.lastName = '';
          this.inviteErrorText = '';
        })
        .catch(err => {
          this.inviteErrorText = err.message;
        });
    },
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
.invite-users-card>>>.modal-body {
  padding: 0px !important;
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

.btn-invite.btn-disabled {
  background-color: #888888 !important;
  border-color: #888888 !important;
  cursor: default !important;
}

.btn-invite.btn-disabled:hover {
  background-color: #888888 !important;
  border-color: #888888 !important;
  cursor: default !important;
}

.btn-invite {
  height: 30px !important;
  width: 80px !important;
  padding: 0px !important;
  margin-left: 10px;
  color: white !important;
  /* background-color: #63a54b !important;
  border-color: #63a54b !important; */
  background-color: #094977 !important;
  border-color: #094977 !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.btn-invite:hover {
  /* background-color: #83bd6e !important;
  border-color: #83bd6e !important; */
  background-color: #4869a4 !important;
  border-color: #4869a4 !important;
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
  /* padding: 0.75rem 1rem; */
  border-radius: 4px;
}

.user-item {
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
}

.chat-user-item:not(:last-child) {
  margin-bottom: 10px;
}

.img-avatar {
  width: 35px;
  height: 35px;
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
  height: 25px !important;
  /* width: 30px !important; */
  margin-right: 10px;
  padding: 0px 10px !important;
  color: rgba(0, 0, 0, 0.84) !important;
  font-size: 9px !important;
}

.btn-view:hover {
  background-color: rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
}

.chat-user-tabs {
  flex: 1;
  width: 100%;
  /* margin-top: 10px; */
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
.txt-invite-error {
  color: #ef3135;
}
</style>
