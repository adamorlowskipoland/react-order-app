import React, { Component } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "./base.js";

class Inventory extends Component {
  static propTypes = {
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.object,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    })
  };

  authHandler = async (authData) => {
    //  1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    //  2. claim it if there's no owner
    if (!store.owner) {
      //  save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    //  3. set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authtenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('logging out!');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logoutBtn = <button onClick={this.logout}>Log Out!</button>;

    //  1. check if user is logged in
    if (!this.state.uid) {
      return <Login authtenticate={this.authtenticate}/>
    }
    //  2. check if user is not the owner of the store
    if (this.state.owner !== this.state.uid) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store</p>
          {logoutBtn}
        </div>
      )
    }
    //  3. user must be the owner of the store, then render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logoutBtn}
        {Object.keys(this.props.fishes)
          .map(key => (
            <EditFishForm
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
            />
          ))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
