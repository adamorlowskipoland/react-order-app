import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from '../base'

const title = 'Fresh Seafood Market';

class App extends React.Component {
  // Way to create state before react": "^16.3.0-alpha.1
  // constructor() {
  //     super();
  //     this.state = {}
  // }

  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { storeId } = this.props.match.params;
    //  First reinstate localStorage
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { storeId } = this.props.match.params;
    localStorage.setItem(storeId, JSON.stringify(this.state.order));
  };

  componentWillUnmount() {
    console.log('unmounted');
    base.removeBinding(this.ref);
  };

  addFish = (fish) => {
    console.log('adding a fish 🐟')
    //    1. Take a copy of the exsisting state
    const fishes = { ...this.state.fishes };
    //    2. Add a new fish 🐟 to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //    3. Sate the new fishes object to state
    this.setState({
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    //  1 take a copy of the current state
    const fishes = { ...this.state.fishes };
    //  2 update state
    fishes[key] = updatedFish;
    //  3 set that state
    this.setState({
      fishes,
    });
  };

  deleteFish = (key) => {
    //  1. take a copy of state
    const fishes = { ...this.state.fishes };
    //  2. update the state - remove the fish
    fishes[key] = null;
    //   3. update state
    this.setState({
      fishes,
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = (key) => {
    //    1. Take a copy of state
    const order = { ...this.state.order };
    //    2. Either add to the order, or update the number in the order
    order[key] = order[key] + 1 || 1;
    //      3. Call set state to update out state
    this.setState({
      order,
    })
  };

  decreaseOrder = (key) => {
    //    1. Take a copy of state
    const order = { ...this.state.order };
    //    2. Remove that item from order if it is > 1 else delete it
    if (order[key] && order[key] > 1) {
      order[key] = order[key] - 1;
      //      3. Call set state to update out state
      this.setState({
        order,
      })
    } else {
      this.removeFromOrder(key);
    }
  };

  removeFromOrder = (key) => {
    //    1. Take a copy of state
    const order = { ...this.state.order };
    //    2. Remove that item from order
    delete order[key];
    //      3. Call set state to update out state
    this.setState({
      order,
    })
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={title}/>
          <ul className="fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => (
                    <Fish
                      key={key}
                      index={key}
                      details={this.state.fishes[key]}
                      addToOrder={this.addToOrder}
                    >
                      {key}
                    </Fish>
                  )
                )
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          addToOrder={this.addToOrder}
          decreaseOrder={this.decreaseOrder}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}/>
      </div>
    );
  }
}

export default App;
