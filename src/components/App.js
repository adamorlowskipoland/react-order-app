import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

const title = 'Fresh Seafood Market';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={title}/>
        </div>
        <Inventory/>
        <Order/>
      </div>
    );
  }
}

export default App;
