import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// Если Firebase еще не был инициализирован, инициализируем его
const firebaseConfig = {
  apiKey: 'AIzaSyDQHdl_1pzwuZCRSM8u3_AjcR19owl6PdQ',
  authDomain: 'basfi-be5a3.firebaseapp.com',
  projectId: 'basfi-be5a3',
  storageBucket: 'basfi-be5a3.appspot.com',
  messagingSenderId: '673011334872',
  appId: '1:673011334872:ios:e97b938246284c9a4021ad',
  measurementId: 'G-XXXXXXXXXX', // Опционально, если вы используете аналитику
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // если уже инициализирован
}

export { firebase };
