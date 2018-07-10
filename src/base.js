import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCwoWECYwN-9s3Qx5-LGVF60WGwRR2zx3g",
  authDomain: "react-order-app-39cbe.firebaseapp.com",
  databaseURL: "https://react-order-app-39cbe.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//  This is a named export
export { firebaseApp };

//  This is a default export
export default base;
