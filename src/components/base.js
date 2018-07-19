import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "yourApiKeyHere",
  authDomain: "react-order-app-39cbe.firebaseapp.com",
  databaseURL: "https://react-order-app-39cbe.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//  This is a named export
export { firebaseApp };

//  This is a default export
export default base;
