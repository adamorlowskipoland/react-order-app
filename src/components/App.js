import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

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
    addFish = (fish) => {
        console.log('adding a fish 🐟')
        //    1. Take a copy of the exsisting state
        const fishes = {...this.state.fishes};
        //    2. Add a new fish 🐟 to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //    3. Sate the new fishes object to state
        this.setState({
            fishes,
        });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline={title}/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish}/>
            </div>
        );
    }
}

export default App;
