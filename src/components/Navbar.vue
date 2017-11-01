<template>
  <div class="custom-navbar d-flex justify-content-start align-items-center">
    <img @click="clickLogo" class="logo" src="../assets/kastelea_logo.png"></img>
    <!-- <span class="title-text">Kaduna State Traffic and Environmental Enforcement Agency</span> -->
    <span class="title-text">Kaduna State Traffic and Environmental Law Enforcement Agency</span>
    <!-- <img class="ml-auto img-avatar" src="../assets/user_placeholder.jpg"></img> -->
    <!-- <b-button @click="notifications()" size="sm" class="ml-auto btn-notification">
      <icon name="bell-o"></icon>
      <b-badge class="custom-badge" pill variant="danger">1</b-badge>
    </b-button> -->

  <table-search class="ml-auto custom-table-search" v-model="searchFilter"></table-search>

    <b-dropdown id="ddown2" variant="link" class="message-dropdown">
      <template slot="button-content">
        <b-button size="sm" class="btn-notification">
          <icon name="bell-o"></icon>
          <b-badge v-if="unreadNotificationCount >= 1" class="custom-badge" pill variant="danger">{{unreadNotificationCount}}</b-badge>
        </b-button>
      </template>
      <b-dropdown-header>You have {{unreadNotifications.length}} new notifications</b-dropdown-header>
      <b-dropdown-item @click="$router.push(`/notifications/${notification.$id}`)" v-for="notification in unreadNotifications" :key="notification.$id">
        <!-- <b>John Doe</b>: Hello World -->
        <div class="d-flex justify-content-start align-items-center">
          <img class="img-chat" :src="notification.senderImage"></img>
          <div class="d-flex flex-column" style="overflow: hidden;">
            <span class="txt-name">{{notification.description}}</span>
            <span class="txt-message">{{getTimeAgo(notification.timestamp)}}</span>
          </div>
        </div>
      </b-dropdown-item>
      <b-dropdown-item @click="$router.push('/notifications')">
        <div class="d-flex justify-content-center align-items-center">
          <span class="txt-view-messages">See All Notifications</span>
        </div>
      </b-dropdown-item>
    </b-dropdown>

    <b-dropdown id="ddown1" variant="link" class="message-dropdown">
      <template slot="button-content">
        <b-button size="sm" class="btn-notification">
          <icon name="comment-o"></icon>
          <b-badge v-if="unreadConversationCount >= 1" class="custom-badge" pill variant="danger">{{unreadConversationCount}}</b-badge>
        </b-button>
      </template>
      <b-dropdown-header>You have {{unreadConversations.length}} new messages</b-dropdown-header>
      <b-dropdown-item @click="$router.push(`/chat/${conversation.$id}`)" v-for="conversation in unreadConversations" :key="conversation.$id">
        <!-- <b>John Doe</b>: Hello World -->
        <div class="d-flex justify-content-start align-items-center">
          <img class="img-chat" :src="conversation.senderImage"></img>
          <div class="d-flex flex-column" style="overflow: hidden;">
            <span class="txt-name">{{conversation.senderName}}</span>
            <span class="txt-message">{{conversation.lastMessage ? conversation.lastMessage : 'No message yet...'}}</span>
          </div>
        </div>
      </b-dropdown-item>
      <!-- <b-dropdown-divider style="margin-bottom: 0px;"></b-dropdown-divider> -->
      <b-dropdown-item @click="$router.push('/chat')">
        <div class="d-flex justify-content-center align-items-center">
          <span class="txt-view-messages">See All Messages</span>
        </div>
      </b-dropdown-item>
    </b-dropdown>

    <img class="img-avatar" src="../assets/user_avatar.jpg"></img>
    <b-button @click="logout()" size="sm" class="btn-login">
      LOG OUT
    </b-button>
  </div>
</template>

<script>
import * as Firebase from 'firebase';
import * as moment from 'moment';
import ActivityService from '@/services/ActivityService';
import TableSearch from '@/components/TableSearch';

export default {
  name: 'Navbar',
  components: {
    TableSearch,
  },
  data() {
    return {
      unreadConversationCount: 0,
      unreadConversations: [],
      unreadNotificationCount: 0,
      unreadNotifications: [],
    };
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.push('/login');
        });
    },
    clickLogo() {
      this.$router.push('/');
    },
    getTimeAgo(timestamp) {
      if (!timestamp) {
        return '';
      }
      return moment(timestamp).fromNow();
    },
  },
  mounted() {
    ActivityService.subscribeUnreadMessages((count, unreadConversations) => {
      this.unreadConversationCount = count;
      this.unreadConversations = unreadConversations;
      // console.log(this.unreadConversationCount);
      // console.log(this.unreadConversations);
    });

    ActivityService.subscribeNotifications((count, notifications) => {
      this.unreadNotificationCount = count;
      this.unreadNotifications = notifications;
      // console.log('subscribe notifications in navbar');
      // console.log(this.unreadNotificationCount);
      // console.log(this.unreadNotifications);
    });
  },
};
</script>

<style scoped>
.custom-navbar {
  /* background-color: #212338; */
  background-color: #31429e;
  /* color: white; */
  color: white;
  height: 50px;
  padding: 10px 15px;
  padding-left: 0px;
}

/* .custom-navbar > * {
  z-index: 9999;
} */

.logo {
  height: 100%;
  margin-left: 20px;
  margin-right: 10px;
  /* width: 65px; */
  /* width: 150px; */
  /* padding-top: 2px;
  padding-bottom: 2px; */
  user-select: none;
  object-fit: contain;
  object-position: center center;
  cursor: pointer;
}

.title-text {
  font-size: 14px;
  font-weight: 600;
}

.btn-notification {
  position: relative;
  background-color: transparent;
  /* border-color: #DF90B8; */
  border-color: #8f90a8;
  color: rgba(255, 255, 255, 0.84);
  /* border-radius: 4px; */
  border-radius: 20px;
  font-weight: 600;
  font-size: 11px;
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  cursor: pointer;
  transition: ease-out 0.2s;
  margin-right: 10px;
}

.btn-notification:hover {
  background-color: #8f90a8;
  border-color: #8f90a8;
  transition: ease-out 0.2s;
}

.btn-notification:active {
  background-color: #585e8c;
  border-color: #585e8c;
  transition: ease-out 0.2s;
}

.custom-badge {
  position: absolute;
  top: 0px;
  right: 0px;
}

.btn-login {
  background-color: #63a54b;
  border-color: #63a54b;
  color: rgba(255, 255, 255, 0.84);
  /* border-radius: 4px; */
  border-radius: 45px;
  font-weight: 600;
  font-size: 11px;
  width: 90px;
  padding: 4px 0px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.btn-login:hover {
  /* background-color: #d4689f; */
  background-color: #83bd6e;
  border-color: #83bd6e;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.img-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #8f90a8;
  object-fit: cover;
  object-position: center;
}

.img-chat {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
  object-fit: cover;
  object-position: center;
}

.message-dropdown {
  border: 0px solid;
}

.custom-navbar>>>.message-dropdown .btn {
  cursor: pointer !important;
  padding: 0px;
}

.custom-navbar>>>.message-dropdown .btn:hover .btn-notification {
  background-color: #8f90a8;
  border-color: #8f90a8;
  transition: ease-out 0.2s;
}

.custom-navbar>>>.message-dropdown .btn:active .btn-notification {
  background-color: #585e8c;
  border-color: #585e8c;
  transition: ease-out 0.2s;
}

.custom-navbar>>>.message-dropdown .dropdown-toggle {
  width: 40px;
  height: 30px;
}

.custom-navbar>>>.message-dropdown .dropdown-item {
  outline: none;
  padding: 6px 10px;
  overflow: hidden;
}

.custom-navbar>>>.message-dropdown .dropdown-item:not(:last-child) {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.12); */
  border-bottom: 1px solid #eceeef;
}

.custom-navbar>>>.message-dropdown .dropdown-menu {
  left: -100px;
  padding: 0px;
  width: 220px;
}

.custom-navbar>>>.message-dropdown .dropdown-header {
  font-size: 10px;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eceeef;
}

.custom-navbar>>>.dropdown-toggle::after {
  display: none;
}

.txt-name {
  text-align: start;
  /* text-transform: uppercase; */
  font-size: 10px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.txt-message {
  text-align: start;
  font-size: 9px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.txt-view-messages {
  font-size: 10px;
  text-align: center;
}

.txt-timeago {
  position: absolute;
  bottom: 4px;
  right: 6px;
  font-size: 7px;
  margin-top: 2px;
  /* color: rgba(255, 255, 255, 0.7); */
  color: rgba(0, 0, 0, 0.87);
  outline: none;
}

.custom-navbar>>>.search-icon {
  color: rgba(255,255,255,0.84);
}

.custom-table-search {
  margin-right: 10px;
}
.custom-table-search>>>.search-input{
  background-color: white;
}
</style>
