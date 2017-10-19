<template>
  <dark-card title="Messages" class="chat-card">
    <div class="container clearfix d-flex">
      <div class="people-list" id="people-list">
        <div class="search">
          <input type="text" placeholder="search" />
          <i class="fa fa-search"></i>
        </div>
        <ul class="list">
          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Vincent Porter</div>
              <div class="status">
                <icon name="circle" class="online"></icon> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Aiden Chavez</div>
              <div class="status">
                <icon name="circle" class="offline"></icon> left 7 mins ago
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Mike Thomas</div>
              <div class="status">
                <icon name="circle" class="online"></icon> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Erica Hughes</div>
              <div class="status">
                <icon name="circle" class="online"></icon> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Ginger Johnston</div>
              <div class="status">
                <icon name="circle" class="online"></icon> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Tracy Carpenter</div>
              <div class="status">
                <icon name="circle" class="offline"></icon> left 30 mins ago
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Christian Kelly</div>
              <div class="status">
                <icon name="circle" class="offline"></icon> left 10 hours ago
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Monica Ward</div>
              <div class="status">
                <icon name="circle" class="online"></icon> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Dean Henry</div>
              <div class="status">
                <icon name="circle" class="offline"></icon> offline since Oct 28
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Peyton Mckinney</div>
              <div class="status">
                <icon name="circle" class="online"></icon> online
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="chat">
        <div class="chat-header clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

          <div class="chat-about">
            <div class="chat-with">Chat with Vincent Porter</div>
            <div class="chat-num-messages">already 1 902 messages</div>
          </div>
          <i class="fa fa-star"></i>
        </div>
        <!-- end chat-header -->

        <div class="chat-history">
          <ul>
            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                <span class="message-data-name">Olia</span>
                <icon name="circle" class="me"></icon>

              </div>
              <div class="message other-message float-right">
                Hi Vincent, how are you? How is the project coming along?
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name">
                  <icon name="circle" class="online"></icon> Vincent</span>
                <span class="message-data-time">10:12 AM, Today</span>
              </div>
              <div class="message my-message">
                Are we meeting today? Project has been already finished and I have results to show you.
              </div>
            </li>

            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time">10:14 AM, Today</span> &nbsp; &nbsp;
                <span class="message-data-name">Olia</span>
                <icon name="circle" class="me"></icon>

              </div>
              <div class="message other-message float-right">
                Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name">
                  <icon name="circle" class="online"></icon> Vincent</span>
                <span class="message-data-time">10:20 AM, Today</span>
              </div>
              <div class="message my-message">
                Actually everything was fine. I'm very excited to show this to our team.
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name">
                  <icon name="circle" class="online"></icon> Vincent</span>
                <span class="message-data-time">10:31 AM, Today</span>
              </div>
              <icon name="circle" class="online"></icon>
              <i class="fa fa-circle online" style="color: #AED2A6"></i>
              <i class="fa fa-circle online" style="color:#DAE9DA"></i>
            </li>

          </ul>

        </div>
        <!-- end chat-history -->

        <div class="chat-message clearfix">
          <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

          <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
          <i class="fa fa-file-image-o"></i>

          <button>Send</button>

        </div>
        <!-- end chat-message -->

      </div>
      <!-- end chat -->

      <div class="user-info d-flex flex-column justify-content-center align-items-center">
        <div ref="map" class="live-map"></div>
        <span class="user-talking">User Information</span>
        <img class="user-image" src="../assets/user_placeholder.jpg"></img>
        <span class="user-name">John Doe</span>
        <span class="user-current-label">CURRENT DEPLOYMENT</span>
        <span class="user-zone">B23</span>
      </div>

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
import BaseBtn from '@/components/BaseBtn';
import DarkCard from '@/components/DarkCard';

import MapStyle from '../assets/mapstyle.json';

export default {
  name: 'ChatCard',
  components: {
    BaseBtn,
    DarkCard,
  },
  data() {
    return {
      center: [10.5059, 7.4319],
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(this.$refs.map, {
      center: { lat: this.center[0], lng: this.center[1] },
      zoom: 13,
      styles: MapStyle,
    });
  },
  methods: {
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
  background: #444753;
  /* border-radius: 5px; */
  overflow: hidden;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  padding-left: 0px;
  padding-right: 0px;
}

.people-list {
  width: 260px;
  float: left;
  overflow-y: auto;
}

.people-list .search {
  /* padding: 20px; */
  padding-top: 10px;
}

.people-list input {
  border-radius: 3px;
  border: none;
  /* padding: 14px; */
  padding: 8px;
  color: white;
  background: #6A6C75;
  width: 90%;
  font-size: 14px;
}

.people-list .fa-search {
  position: relative;
  left: -25px;
}

.people-list ul {
  padding: 20px;
  /* padding-bottom: 0px; */
  height: 770px;
  list-style: none;
}





/* .people-list ul li:not(:last-child) { */

.people-list ul li {
  padding-bottom: 20px;
}

.people-list img {
  float: left;
}

.people-list .about {
  float: left;
  margin-top: 8px;
}

.people-list .about {
  padding-left: 8px;
}

.people-list .status {
  color: #92959E;
  text-align: start;
}

.people-list .name {
  color: white;
  font-weight: 600;
  text-align: start;
}

.chat {
  width: 490px;
  float: left;
  background: #F2F5F8;
  /* border-top-right-radius: 5px; */
  /* border-bottom-right-radius: 5px; */
  color: #434651;
}

.chat .chat-header {
  padding: 20px;
  border-bottom: 2px solid white;
}

.chat .chat-header img {
  float: left;
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
  margin-top: 6px;
}

.chat .chat-header .chat-with {
  font-weight: bold;
  font-size: 16px;
  text-align: start;
}

.chat .chat-header .chat-num-messages {
  color: #92959E;
  text-align: start;
}

.chat .chat-header .fa-star {
  float: right;
  color: #D8DADF;
  font-size: 20px;
  margin-top: 12px;
}

.chat .chat-history {
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  /* height: 575px; */
  height: 250px;
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
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 30px;
  width: 90%;
  position: relative;
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #86BB71;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .my-message {
  background: #86BB71;
}

.chat .chat-history .other-message {
  background: #94C2ED;
}

.chat .chat-history .other-message:after {
  border-bottom-color: #94C2ED;
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
  font: 14px/22px "Lato", Arial, sans-serif;
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
  color: #94C2ED;
  font-size: 16px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: #F2F5F8;
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
  color: #86BB71;
}

.offline {
  color: #E38968;
}

.me {
  color: #94C2ED;
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
  content: " ";
  clear: both;
  height: 0;
}

.user-info {
  /* 100% - width of chat + people list  */
  width: calc(100% - 750px);
  color: white;
  background-color: rgb(36, 144, 204);
}

.user-image {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
}

.user-talking {
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 20px;
}

.user-name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 20px;
}

.user-current-label {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
}

.user-zone {
  font-size: 18px;
  margin-bottom: 10px;
}

.live-map {
  width: 100%;
  height: 350px;
  margin-bottom: 10px;
}
</style>
