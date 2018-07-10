import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "addYourOwnApiKey",
  authDomain: "firebaseproject.firebaseapp.com",
  databaseURL: "https://firebaseproject.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//  This is a named export
export { firebaseApp };

//  This is a default export
export default base;
