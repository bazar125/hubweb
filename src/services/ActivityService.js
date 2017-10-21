import * as Firebase from 'firebase';
import UserService from '@/services/UserService';

let currentUser;
let conversations;

export default {
  // callback(count, unreadConversations)
  subscribeUnreadMessages(callback) {
    if (!callback) {
      return;
    }

    UserService.loadUser()
      .then(user => (this.currentUser = user))
      .then(() => this.loadConversations())
      .then(conversations => {
        this.conversations = conversations;
      })
      .then(() => this.notifySubscriber(callback));
  },
  loadConversations() {
    this.getConversationQuery()
      .on('value')
      .then(snap => {
        const conversations = [];
        snap.forEach(child => {
          const conversation = child.val();
          conversation.$id = child.key;
          conversations.push(conversation);
        });
        return conversations;
      });
  },
  notifySubscriber(callback) {
    let count = 0;
    const unreadConversations = [];

    for(let i = 0; i < this.conversations.length; i += 1) {
      const conversation = this.conversations[i];
      const seenBy = Object.keys(conversation.seenBy);
      console.log(`conversation ${conversation.$id} seen by ${seenBy}`);
      if (seenBy.indexOf(this.currentUser.$id) === -1) {
        console.log('is unread');
        count += 1;
        unreadConversations.push(conversation);
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
