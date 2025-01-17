import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp();
}

export { firebase };
