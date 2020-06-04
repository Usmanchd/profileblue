import * as firebase from 'firebase/app';
import 'firebase/storage';

// Replace this with your own config details
var config = {
  apiKey: 'AIzaSyDHyn32LC-pqVAvUrekXDBMsNJ3s8C49oc',
  authDomain: 'profilesblue.firebaseapp.com',
  databaseURL: 'https://profilesblue.firebaseio.com',
  projectId: 'profilesblue',
  storageBucket: 'profilesblue.appspot.com',
  messagingSenderId: '749623962556',
  appId: '1:749623962556:web:6ac665e413c275f3ded9b9',
};
firebase.initializeApp(config);

export default firebase;
