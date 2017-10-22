import * as Firebase from 'firebase';
import UserService from '@/services/UserService';

export default {
  currentUser: 0,
  conversations: [],
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
  getConversationQuery() {
    return Firebase.database()
      .ref('conversations')
      .orderByChild(`users/${this.currentUser.$id}`)
      .equalTo(true);
  },
};
