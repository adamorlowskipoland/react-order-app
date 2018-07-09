import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";

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
    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes,
        });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline={title}/>
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes)
                                .map(key => <Fish key={key} details={this.state.fishes[key]}>{key}</Fish>)
                        }
                    </ul>
                </div>
                <Order/>
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}/>
            </div>
        );
    }
}

export default App;
