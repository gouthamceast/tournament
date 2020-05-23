import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"


var firebaseConfig = {
    apiKey: "AIzaSyCHPxmul9qXCMZMo6Wol3jkXWzCCObPIx4",
    authDomain: "pubgtournament-e1d20.firebaseapp.com",
    databaseURL: "https://pubgtournament-e1d20.firebaseio.com",
    projectId: "pubgtournament-e1d20",
    storageBucket: "pubgtournament-e1d20.appspot.com",
    messagingSenderId: "151854212844",
    appId: "1:151854212844:web:34aac8263f2f5dd36f27c9",
    measurementId: "G-8TFYCZNH2Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase