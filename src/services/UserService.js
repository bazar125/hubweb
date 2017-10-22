import * as Firebase from 'firebase';

export default {
  currentUser: null,
  loadUser() {
    if (this.currentUser) {
      return Promise.resolve(this.currentUser);
    }

    const uid = Firebase.auth().currentUser.uid;
    const ref = Firebase.database().ref();
    return ref
      .child(`users/${uid}`)
      .once('value')
      .then(snap => {
        this.currentUser = snap.val();
        this.currentUser.$id = snap.key;
        return this.currentUser;
      });
  },
};
