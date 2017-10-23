import * as Firebase from 'firebase';
import UserService from '@/services/UserService';

export default {
  currentUser: 0,
  conversations: [],
  notifications: [],
  notificationsSeen: [],
  // callback(count, unreadConversations)
  subscribeUnreadMessages(callback) {
    if (!callback) {
      return;
    }

    UserService.loadUser()
      .then(user => {
        this.currentUser = user;
      })
      .then(() => this.subscribeConversations(callback));
  },
  subscribeNotifications(callback) {
    if (!callback) {
      return;
    }

    UserService.loadUser()
      .then(user => {
        this.currentUser = user;
      })
      .then(() => {
        // TODO: Cancel existing subscriptions
        this.getNotificationQuery().on('value', snap => {
          const notifications = [];
          snap.forEach(child => {
            const notification = child.val();
            notification.$id = child.key;
            notifications.push(notification);
          });
          this.notifications = notifications;
          this.notifyNotificationSubscriber(callback);
        });

        this.getNotificationSeenQuery().on('value', snap => {
          let notificationsSeen = [];
          if (snap) {
            const val = snap.val();
            if (val) {
              notificationsSeen = Object.keys(val);
            }
          }
          this.notificationsSeen = notificationsSeen;
          this.notifyNotificationSubscriber(callback);
        });
      });
  },
  subscribeConversations(callback) {
    this.getConversationQuery().on('value', snap => {
      const conversations = [];
      snap.forEach(child => {
        const conversation = child.val();
        conversation.$id = child.key;
        conversations.push(conversation);
      });
      this.conversations = conversations;
      this.notifySubscriber(callback);
    });
  },
  notifySubscriber(callback) {
    let count = 0;
    const unreadConversations = [];

    for (let i = 0; i < this.conversations.length; i += 1) {
      const conversation = this.conversations[i];
      if (!conversation.seenBy) {
        count += 1;
        unreadConversations.push(conversation);
      } else {
        const seenBy = Object.keys(conversation.seenBy);
        if (seenBy.indexOf(this.currentUser.$id) === -1) {
          count += 1;
          unreadConversations.push(conversation);
        }
      }
    }

    callback(count, unreadConversations);
  },
  notifyNotificationSubscriber(callback) {
    let count = 0;
    const unreadNotifications = [];

    for (let i = 0; i < this.notifications.length; i += 1) {
      const notification = this.notifications[i];
      if (this.notificationsSeen.indexOf(notification.$id) === -1) {
        count += 1;
        unreadNotifications.push(notification);
      }
    }

    callback(count, unreadNotifications, this.notifications);
  },
  getConversationQuery() {
    return Firebase.database()
      .ref('conversations')
      .orderByChild(`users/${this.currentUser.$id}`)
      .equalTo(true);
  },
  getNotificationQuery() {
    return Firebase.database()
      .ref('globalNotifications')
      .orderByChild('timestamp');
  },
  getNotificationSeenQuery() {
    return Firebase.database().ref(
      `globalNotificationSeen/${this.currentUser.$id}`
    );
  },
};
