import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCnXHRaHG6WyAtwqXtwL6aExJmBZPJjLYU',
  authDomain: 'maps-chat-270311.firebaseapp.com',
  databaseURL: 'https://maps-chat-270311.firebaseio.com',
  projectId: 'maps-chat-270311',
  storageBucket: 'maps-chat-270311.appspot.com',
  messagingSenderId: '998942814222',
  appId: '1:998942814222:web:468db668afba0308120c5f',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
