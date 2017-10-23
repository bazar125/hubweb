<template>
  <dark-card title="Messages" class="chat-card">
    <div class="container clearfix d-flex" style="flex: 1;">
      <div class="people-list d-flex flex-column" id="people-list">
        <div class="search" style="position: relative">
          <input v-model="searchInput" type="text" placeholder="search" />
          <icon name="search" class="icon-search"></icon>
        </div>
        <b-tabs class="chat-user-tabs d-flex flex-column justify-content-start align-items-start">
          <b-tab title="OFFICERS" active>
             <ul class="list">
              <li @click="clickUser(user, index)" :class="{'active': selectedIndex === index, 'unread': user.unread }" class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(user, index) in filteredOfficers" :key="user.$id">
                <img class="image" :src="user.image" alt="avatar" />
                <div class="about">
                  <div class="name">{{`${user.firstName} ${user.lastName}`}}</div>
                  <div class="status">
                    <icon name="circle" :class="{online: userIsOnline(user), offline: !userIsOnline(user)}"></icon> {{userStatus(user)}}
                  </div>
                </div>
              </li>
            </ul>
          </b-tab>
          <b-tab title="STAFF" >
             <ul class="list">
              <li @click="clickUser(user, index)" :class="{'active': selectedIndex === index, 'unread': user.unread }" class="clearfix chat-user-item d-flex justify-content-start align-items-center" v-for="(user, index) in filteredStaff" :key="user.$id">
                <img class="image" :src="user.image" alt="avatar" />
                <div class="about">
                  <div class="name">{{`${user.firstName} ${user.lastName}`}}</div>
                  <div class="status">
                    <icon name="circle" :class="{online: userIsOnline(user), offline: !userIsOnline(user)}"></icon> {{userStatus(user)}}
                  </div>
                </div>
              </li>
            </ul>
          </b-tab>
        </b-tabs>
        <div v-if="this.selectedUser" class="user-info d-flex flex-column justify-content-center align-items-center">
          <div class="selected-user-overlay d-flex flex-column justify-content-start align-items-start">
            <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
                  <span class="txt-user-information">User Information</span>
                  <span class="txt-user-information ml-auto"><icon name="circle" :class="{online: userIsOnline(this.selectedUser), offline: !userIsOnline(this.selectedUser)}"></icon> {{userStatus(this.selectedUser)}}</span>
                </div>
            <!-- <span class="txt-user-information">User Information</span> -->
            
            <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
              <img class="user-image" :src="selectedUser.image"></img>
              <div class="d-flex flex-column overlay-content-container">
                <span class="user-name">{{this.selectedUser.firstName}} {{this.selectedUser.lastName}}</span>
                <span class="user-zone mr-auto">Deployed to <span style="font-weight: 700;">Zone B23</span></span>
                <!-- <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
                  <span class="user-zone mr-auto">Deployed to Zone B23</span>
                  <icon name="circle" class="ml-auto online"></icon> online
                </div> -->
              </div>
            </div>
          </div>
          <div class="d-flex" style="flex: 1; width: 100%; padding: 10px;">
            <div ref="map" id="map" class="live-map"></div>
          </div>
        </div>
      </div>
      <div v-if="!this.selectedConversation" class="chat d-flex flex-column">
      </div>
      <div v-else class="chat d-flex flex-column">
        <div class="chat-header d-flex justify-content-start align-items-center clearfix">
          <img class="chat-user-image" :src="this.selectedUser.image" alt="avatar" />
          <div class="chat-about d-flex flex-column justify-content-start align-items-start">
            <div class="d-flex justify-content-start align-items-center" style="width: 100%;">
              <div class="chat-with">Officer {{this.selectedUser.firstName}} {{this.selectedUser.lastName}}</div>
              <icon name="circle" class="ml-auto online" style="width: 12px; height: 12px;" :class="{online: userIsOnline(this.selectedUser), offline: !userIsOnline(this.selectedUser)}"></icon> {{userStatus(this.selectedUser)}}
            </div>
            <div class="chat-num-messages">last seen {{getLastSeen(this.selectedUser)}}</div>
          </div>
          <i class="fa fa-star"></i>
        </div>
        <!-- end chat-header -->

        <div v-if="this.messages.length < 1" class="chat-history d-flex flex-column justify-content-center align-items-center">
            <span class="txt-placeholder">Write a message to start a conversation with {{this.selectedUser.firstName}}</span>
            <icon class="icon-placeholder" name="commenting-o"></icon>
        </div>
        <div v-else class="chat-history" v-chat-scroll>
          <ul>
            <template v-for="message in messages">
            <li v-if="message.senderId !== currentUser.$id" :key="message.message" class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time">{{getTimeAgo(message.timestamp)}}</span> &nbsp; &nbsp;
                <span class="message-data-name">{{message.senderName}}</span>
                <icon name="circle" class="me"></icon>
              </div>
              <div class="message other-message float-right">
                {{message.message}}
              </div>
            </li>
            <li v-else :key="message.message">
              <div class="d-flex justify-content-start align-items-center message-data">
                <span class="message-data-name">
                  <icon name="circle" class="online"></icon> {{message.senderName}}
                </span>
                <span class="message-data-time">{{getTimeAgo(message.timestamp)}}</span>
              </div>
              <div class="message my-message">
                {{message.message}}
              </div>
            </li>
            </template>
          </ul>

        </div>
        <!-- end chat-history -->

        <div class="chat-message clearfix">
          <textarea @keyup.shift.enter="doNothing()" @keyup.enter="sendMessage" v-model="messageText" name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

          <div class="d-flex justify-content-start align-items-center">
            <!-- <icon class="fa-file-o" name="file-o"></icon> &nbsp;&nbsp;&nbsp;
            <icon class="fa-file-image-o mr-auto" style="margin-left: 10px;" name="file-image-o"></icon> -->

            <button class="ml-auto" :class="{'send-disabled': !this.messageText}" @click="sendMessage">Send</button>
          </div>

        </div>
        <!-- end chat-message -->

      </div>
      <!-- end chat -->

    </div>
    <!-- end container -->

    <!-- <script id="message-template" type="text/x-handlebars-template">
                  <li class="clearfix">
                    <div class="message-data align-right">
                      <span class="message-data-time">{{time}}, Today</span> &nbsp; &nbsp;
                      <span class="message-data-name">Olia</span>
                      <icon name="circle" class="me"></icon>
                    </div>
                    <div class="message other-message float-right">
                      {{messageOutput}}
                    </div>
                  </li>
                </script>

                <script id="message-response-template" type="text/x-handlebars-template">
                  <li>
                    <div class="message-data">
                      <span class="message-data-name">
                        <icon name="circle" class="online"></icon> Vincent</span>
                      <span class="message-data-time">{{time}}, Today</span>
                    </div>
                    <div class="message my-message">
                      {{response}}
                    </div>
                  </li>
                </script> -->

    <!-- <dark-card title="Users" class="invite-users-card">
                    <div class="d-flex flex-column justify-content-start align-items-center">
                    </div>
                  </dark-card> -->
  </dark-card>
</template>

<script>
import * as moment from 'moment';
import * as Firebase from 'firebase';
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';
import MapOverlayFactory from '@/services/MapOverlayFactory';
import ActivityService from '@/services/ActivityService';

import MapStyle from '../assets/mapstyle.json';

export default {
  name: 'ChatCard',
  props: ['conversationId'],
  components: {
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      center: [10.5059, 7.4319],
      users: [],
      userLocations: [],
      selectedIndex: 0,
      selectedUser: null,
      selectedUserMarker: null,
      selectedConversation: null,
      ownUserId: '',
      conversations: [],
      messages: [],
      messageSub: null,
      messageText: '',
      searchInput: '',
      unreadConversationCount: 0,
      unreadConversations: [],
    };
  },
  computed: {
    officers() {
      return this.users.filter(user => user.accountType === 'officer');
    },
    staff() {
      return this.users.filter(
        user =>
          user.accountType === 'staff' || user.accountType === 'stateAdmin'
      );
    },
    filteredOfficers() {
      if (!this.searchInput) {
        return this.officers;
      }

      return this.officers.filter(user => this.filterUser(user));
    },
    filteredStaff() {
      if (!this.searchInput) {
        return this.staff;
      }

      return this.staff.filter(user => this.filterUser(user));
    },
  },
  mounted() {
    const uid = Firebase.auth().currentUser.uid;
    const ref = Firebase.database().ref();
    ref
      .child(`users/${uid}`)
      .once('value')
      .then(snap => {
        this.currentUser = snap.val();
        this.currentUser.$id = snap.key;
        return this.loadConversations();
      })
      .then(() => {
        if (this.conversationId) {
          this.selectConversationWithId(this.conversationId);
        }
      })
      .then(() => {
        ActivityService.subscribeUnreadMessages(
          (count, unreadConversations) => {
            this.unreadConversationCount = count;
            this.unreadConversations = unreadConversations;
          }
        );
      });
  },
  watch: {
    selectedConversation() {
      this.loadMessages();
    },
    selectedUser() {
      // Defer to next DOM update cycle so that the map's v-ref is ready
      this.$nextTick(() => this.initMap());
    },
    conversationId(newValue) {
      console.log('conversationId watcher triggered');
      console.log(newValue);
      if (!newValue) {
        return;
      }

      this.selectConversationWithId(newValue);
    },
    unreadConversations() {
      let updateRequired = false;
      for (let i = 0; i < this.unreadConversations.length; i += 1) {
        const conversation = this.unreadConversations[i];
        const unreadUsers = Object.keys(conversation.users).filter(
          x => x !== this.currentUser.$id
        );
        for (let j = 0; j < this.users.length; j += 1) {
          const user = this.users[j];
          if (user.$id === unreadUsers[0]) {
            user.unread = true;
            console.log('marked user as unread');
            console.log(user.$id);
            this.users[j] = user;
            updateRequired = true;
          }
        }
      }

      if (updateRequired) {
        this.$forceUpdate();
      }
    },
  },
  methods: {
    userIsOnline(user) {
      if (!user || !this.userLocations || this.userLocations.length === 0) {
        return false;
      }

      const userStatus = this.getUserStatus(user);
      if (!userStatus) {
        return false;
      }

      const now = moment();
      const then = moment(userStatus.timestamp);
      const diff = now.diff(then, 'minutes');
      return diff < 10;
    },
    userStatus(user) {
      if (this.userIsOnline(user)) {
        return 'online';
      }

      return 'offline';
    },
    getUserStatus(user) {
      for (let i = 0; i < this.userLocations.length; i += 1) {
        const userLocation = this.userLocations[i];
        if (userLocation.$id === user.$id) {
          return userLocation;
        }
      }

      return null;
    },
    selectConversationWithId(id) {
      console.log(`selectConversationWithId: ${id}`);
      for (let i = 0; i < this.conversations.length; i += 1) {
        const conversation = this.conversations[i];
        if (conversation.$id === id) {
          this.selectedConversation = conversation;
          const conversationUsers = Object.keys(conversation.users).filter(
            x => x !== this.currentUser.$id
          );
          const userId = conversationUsers[0];
          for (let j = 0; j < this.users.length; j += 1) {
            const user = this.users[j];
            console.log(`checking ${user.$id}`);
            if (user.$id === userId) {
              console.log('mapped to user');
              console.log(user.$id);
              console.log(j);
              this.selectedUser = user;
              // selectedindex is different because of filtering
              // map j to actualindex
              let actualIndex = 0;
              if (this.selectedUser.accountType === 'officer') {
                for (let l = 0; l < this.officers.length; l += 1) {
                  const officer = this.officers[l];
                  if (officer.$id === this.selectedUser.$id) {
                    actualIndex = l;
                  }
                }
              } else if (
                this.selectedUser.accountType === 'scannerType' ||
                this.selectedUser.accountType === 'staff'
              ) {
                for (let l = 0; l < this.staff.length; l += 1) {
                  const staff = this.staff[l];
                  if (staff.$id === this.selectedUser.$id) {
                    actualIndex = l;
                  }
                }
              }
              this.selectedIndex = actualIndex;
              console.log(
                `Resolved parameters: ${this.selectedUser} ${this
                  .selectedIndex}`
              );
              this.clickUser(this.selectedUser, this.selectedIndex);
            }
          }
          // clickuser here
          return;
        }
      }
    },
    clickUser(user, index) {
      this.selectedUser = user;
      this.selectedIndex = index;
      this.selectedUser.unread = false;

      let foundConversation = false;
      for (let i = 0; i < this.conversations.length; i += 1) {
        const conversation = this.conversations[i];
        if (
          conversation.users &&
          conversation.users[this.currentUser.$id] &&
          conversation.users[this.selectedUser.$id]
        ) {
          conversation.unread = false;
          this.selectedConversation = conversation;
          foundConversation = true;
        }

        if (foundConversation) {
          break;
        }
      }

      if (!foundConversation) {
        this.createConversation();
      }

      this.markConversationSeen();
      this.updateMapMarker(user);
    },
    updateMapMarker(user) {
      const userStatus = this.getUserStatus(user);
      if (!this.map || !userStatus) {
        return;
      }

      if (this.selectedUserMarker) {
        this.selectedUserMarker.setMap(null);
      }
      const lat = userStatus.coords.lat;
      const lng = userStatus.coords.lng;
      this.selectedUserMarker = MapOverlayFactory.pulseMarker(
        this.map,
        lat,
        lng,
        'blue'
      );
      // eslint-disable-next-line no-undef
      this.map.setCenter(new google.maps.LatLng(lat, lng));
    },
    initMap() {
      if (this.map) {
        return;
      }
      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: this.center[0], lng: this.center[1] },
        zoom: 13,
        styles: MapStyle,
      });
    },
    loadConversations() {
      const ref = Firebase.database().ref();
      return ref
        .child('conversations')
        .orderByChild(`users/${this.currentUser.$id}`)
        .equalTo(true)
        .once('value')
        .then(snap => {
          const conversations = [];
          snap.forEach(child => {
            const conversation = child.val();
            conversation.$id = child.key;
            conversations.push(conversation);
          });
          this.conversations = conversations;
          return this.loadUsers();
        })
        .then(() => {
          this.$nextTick(() => this.initMap);
        });
      // .then(() => this.initMap());
    },
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

      ref.child('scannerUserLocation').on('value', snap => {
        if (!snap) {
          this.userLocations = [];
          return;
        }

        const userLocations = [];
        snap.forEach(child => {
          const userLocation = child.val();
          userLocation.$id = child.key;
          userLocations.push(userLocation);
        });
        this.userLocations = userLocations;
      });
    },
    subscribeNewMessages() {
      const ref = Firebase.database().ref();
      this.messageUnsub = ref
        .child('messages')
        .orderByChild('conversation')
        .equalTo(this.selectedConversation.$id)
        .on('child_added', snap => {
          if (!snap) {
            return;
          }

          const message = snap.val();
          message.$id = snap.key;
          const lastMessage = this.messages[this.messages.length - 1];

          if (!lastMessage || message.timestamp > lastMessage.timestamp) {
            this.messages.push(message);
          }
        });
    },
    createConversation() {
      const users = {};
      users[this.currentUser.$id] = true;
      users[this.selectedUser.$id] = true;

      const seenBy = {};
      seenBy[this.currentUser.$id] = true;

      const conversation = {
        lastMessage: '',
        senderId: this.currentUser.$id,
        senderImage: this.currentUser.image,
        senderName: `${this.currentUser.firstName} ${this.currentUser
          .lastName}`,
        seenBy,
        users,
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
      };
      const ref = Firebase.database().ref();
      const conversationKey = ref.child('conversations').push(conversation).key;
      conversation.$id = conversationKey;
      this.selectedConversation = conversation;
      this.conversations.push(conversation);
    },
    markConversationSeen() {
      if (!this.selectedConversation || !this.currentUser) {
        return;
      }

      const conversationKey = this.selectedConversation.$id;
      console.log(`Marking conversation ${conversationKey} as seen`);
      let seenBy = this.selectedConversation.seenBy;
      if (!seenBy) {
        seenBy = {};
      }
      seenBy[this.currentUser.$id] = true;

      const ref = Firebase.database().ref();
      const updates = {};
      updates[`/conversations/${conversationKey}/seenBy`] = seenBy;
      ref.update(updates);
    },
    loadMessages() {
      if (this.messageUnsub) {
        this.messageUnsub();
      }

      const ref = Firebase.database().ref();
      ref
        .child('messages')
        .orderByChild('conversation')
        .equalTo(this.selectedConversation.$id)
        .limitToLast(20)
        .once('value')
        .then(snap => {
          if (!snap) {
            this.messages = [];
            return;
          }
          const messages = [];
          snap.forEach(child => {
            const message = child.val();
            messages.$id = child.key;
            messages.push(message);
          });

          this.messages = messages;
          this.subscribeNewMessages();
        });
    },
    filterUser(user) {
      const firstNameMatches = user.firstName
        .toLowerCase()
        .includes(this.searchInput.toLowerCase());

      const lastNameMatches = user.lastName
        .toLowerCase()
        .includes(this.searchInput.toLowerCase());

      return firstNameMatches || lastNameMatches;
    },
    getTimeAgo(timestamp) {
      return moment(timestamp).fromNow();
    },
    getLastSeen(user) {
      const userStatus = this.getUserStatus(user);
      if (!userStatus) {
        return 'unknown';
      }

      return moment(userStatus.timestamp).fromNow();
    },
    sendMessage() {
      if (
        !this.messageText ||
        !this.selectedConversation ||
        !this.currentUser
      ) {
        return;
      }

      const message = {
        conversation: this.selectedConversation.$id,
        senderImage: this.currentUser.image,
        senderId: this.currentUser.$id,
        senderName: `${this.currentUser.firstName} ${this.currentUser
          .lastName}`,
        message: this.messageText,
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
      };

      const ref = Firebase.database().ref();

      const conversationKey = this.selectedConversation.$id;
      const messageKey = ref.child('messages').push().key;
      const updates = {};
      updates[`/messages/${messageKey}`] = message;

      updates[
        `/conversations/${conversationKey}/lastMessage`
      ] = this.messageText;

      updates[
        `/conversations/${conversationKey}/senderId`
      ] = this.currentUser.$id;

      updates[`/conversations/${conversationKey}/senderName`] = `${this
        .currentUser.firstName} ${this.currentUser.lastName}`;

      updates[
        `/conversations/${conversationKey}/senderImage`
      ] = this.currentUser.image;

      updates[`/conversations/${conversationKey}/timestamp`] =
        Firebase.database.ServerValue.TIMESTAMP;

      ref.update(updates).then(() => {
        this.messageText = '';
      });
    },
  },
};
</script>

<style scoped>
.chat-card>>>.main-container {
  padding: 0px;
}

.container {
  margin: 0 auto;
  /* width: 750px; */
  width: 100%;
  /* background: #444753; */
  background: #3a3e5c;
  /* border-radius: 5px; */
  overflow: hidden;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  padding-left: 0px;
  padding-right: 0px;
}

.people-list {
  width: 260px;
  float: left;
  /* overflow-y: auto; */
}

.people-list .search {
  /* padding: 20px; */
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.icon-search {
  position: absolute;
  right: 20px;
  top: 20px;
  color: rgba(255, 255, 255, 0.54);
}

.people-list .list {
  /* flex: 1; */
  /* max-height: 150px; */
  overflow-y: auto;
  margin-bottom: 0px;
  padding: 0px;
  padding-top: 10px;
}

.people-list input {
  border-radius: 3px;
  border: none;
  /* padding: 14px; */
  padding: 8px;
  padding-right: 30px;
  color: white;
  /* background: #6a6c75; */
  background: #797a97;
  width: 100%;
  font-size: 14px;
}

.people-list .fa-search {
  position: relative;
  left: -25px;
}

.people-list ul {
  padding: 10px;
  /* padding-bottom: 0px; */
  /* height: 770px; */
  list-style: none;
}

/* .people-list ul li:not(:last-child) { */

.people-list ul li {
  /* padding-bottom: 20px; */
  margin-bottom: 10px;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.people-list ul li:hover {
  background-color: rgba(255, 255, 255, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.people-list img {
  float: left;
}

.people-list .about {
  float: left;
  /* margin-top: 8px; */
  /* margin-top: 2px;
  margin-bottom: 2px; */
}

.people-list .about {
  padding-left: 8px;
}

.people-list .status {
  /* color: #92959E; */
  color: rgba(255, 255, 255, 0.7);
  text-align: start;
}

.chat-user-item.active {
  background-color: rgba(255, 255, 255, 0.23);
}

.chat-user-item.unread {
  animation: chat-user-item-pulse 0.7s alternate infinite;
  transition: all 600ms cubic-bezier(0.39, 0.575, 0.565, 1);
}

@keyframes chat-user-item-pulse {
  0% {
    background-color: #0275d8;
  }
  100% {
    background-color: transparent;
  }
}

.people-list .image {
  width: 35px;
  height: 35px;
  border-radius: 20px;
  object-fit: cover;
  object-position: center;
  /* border: 2px solid #585e8c; */
  /* border: 2px solid #9a9bb1; */
}

.people-list .name {
  color: white;
  font-weight: 600;
  text-align: start;
}

.chat {
  flex: 1;
  /* width: 490px; */
  float: left;
  background: #f2f5f8;
  /* border-top-right-radius: 5px; */
  /* border-bottom-right-radius: 5px; */

  color: #434651;
}

.chat .chat-header {
  padding: 10px 20px;
  border-bottom: 2px solid white;
}

.chat .chat-header img {
  float: left;
}

.chat .chat-header .chat-about {
  padding-left: 10px;
  flex: 1;
}

.chat .chat-header .chat-with {
  font-weight: bold;
  font-size: 16px;
  text-align: start;
}

.chat .chat-header .chat-num-messages {
  color: #92959e;
  text-align: start;
}

.chat .chat-header .fa-star {
  float: right;
  color: #d8dadf;
  font-size: 20px;
  margin-top: 12px;
}

.chat .chat-history {
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  flex: 1;
}

.chat .chat-history .message-data {
  margin-bottom: 15px;
}

.chat .chat-history .message-data-time {
  color: #a8aab1;
  padding-left: 6px;
}

.chat .chat-history .message {
  color: white;
  /* padding: 18px 20px; */
  padding: 8px 20px;
  line-height: 26px;
  font-size: 12px;
  border-radius: 7px;
  margin-bottom: 30px;
  width: 90%;
  position: relative;
  text-align: start;
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  /* border-bottom-color: #86bb71; */
  border-bottom-color: #9a9bb1;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .my-message {
  /* background: #86bb71; */
  background: #9a9bb1;
}

.chat .chat-history .other-message {
  /* background: #a5a6b9; */
  background: #4a59ad;
}

.chat .chat-history .other-message:after {
  /* border-bottom-color: #a5a6b9; */
  border-bottom-color: #4a59ad;
  left: 93%;
}

.chat .chat-history ul {
  list-style: none;
}

.chat .chat-message {
  padding: 10px 30px;
}

.chat .chat-message textarea {
  width: 100%;
  border: none;
  padding: 10px 20px;
  font: 14px/22px 'Lato', Arial, sans-serif;
  margin-bottom: 10px;
  border-radius: 5px;
  resize: none;
}

.chat .chat-message .fa-file-o,
.chat .chat-message .fa-file-image-o {
  font-size: 16px;
  color: gray;
  cursor: pointer;
}

.chat .chat-message button {
  float: right;
  color: #94c2ed;
  font-size: 16px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: #f2f5f8;
}

.chat .chat-message button:hover {
  color: #75b1e8;
}

.online,
.offline,
.me {
  margin-right: 3px;
  font-size: 10px;
  width: 8px;
  height: 8px;
}

.online {
  color: #86bb71;
}

.offline {
  color: #e38968;
}

.me {
  color: #94c2ed;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.float-right {
  float: right;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}

.user-info {
  position: relative;
  /* 100% - width of chat + people list  */
  /* width: calc(100% - 750px);*/
  color: white;
  border-top: 0.5px solid rgba(255, 255, 255, 0.5);
}

.chat-user-image {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid #585e8c;
  object-fit: cover;
  object-position: center;
}

.user-image {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
  border: 2px solid #585e8c;
  object-fit: cover;
  object-position: center;
}

.user-name {
  text-align: start;
  font-weight: 700;
  font-size: 12px;
  margin-right: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.user-zone {
  text-align: start;
  font-size: 11px;
  margin-right: 10px;
}

.live-map {
  flex: 1;
  height: 180px;
  border-radius: 4px;
  overflow: hidden;
}

.selected-user-overlay {
  width: calc(100% - 20px);
  z-index: 9999;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(36, 144, 204, 0.8);
  padding: 6px;
}

.txt-user-information {
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 4px;
}

.overlay-content-container {
  flex: 1;
  margin-top: 2px;
  margin-bottom: 2px;
  overflow: hidden;
}

.send-disabled {
  color: #eceeef;
}

.txt-placeholder {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
}

.icon-placeholder {
  width: 60px;
  height: 60px;
}
.chat-user-tabs {
  flex: 1;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
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
  color: rgba(255, 255, 255, 0.7);
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

.chat-card>>>.ring-container {
  position: relative;
  width: 25px;
  height: 25px;
  z-index: 999;
  left: 40px;
  top: 10px;
}

.chat-card>>>.ringring {
  position: absolute;
  top: -5px;
  left: -5px;
  border: 3px solid #62bd19;
  border-radius: 30px;
  height: 36px;
  width: 36px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
}

.chat-card>>>.ringring.blue {
  border-color: #1565c0;
}

.chat-card>>>.ringring.red {
  border-color: #c62828;
}
@keyframes pulsate {
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
}
</style>
