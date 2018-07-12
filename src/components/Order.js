import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrderItems = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const fishIsAvailable = fish && fish.status === 'available';

    //  Make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!fishIsAvailable) {
      return <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>;
    }
    return (
      <li key={key}>
        {count} lbs {fish.name} {formatPrice(count * fish.price)}
        <button onClick={() => this.props.addToOrder(key)}>+</button>
        <button onClick={() => this.props.decreaseOrder(key)}>-</button>
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
      </li>
    )
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const fishIsAvailable = fish && fish.status === 'available';
      if (fishIsAvailable) {
        return prevTotal + (count * fish.price);
      } else {
        return prevTotal;
      }
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrderItems)}
        </ul>
        <div className="total">Total:
          <strong> {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
