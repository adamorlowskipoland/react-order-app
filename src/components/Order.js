import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrderItems = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const fishIsAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: {
        enter: 250,
        exit: 250,
      }
    };

    //  Make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!fishIsAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            &nbsp;lbs {fish.name} {formatPrice(count * fish.price)}
            <button onClick={() => this.props.addToOrder(key)}>+</button>
            <button onClick={() => this.props.decreaseOrder(key)}>-</button>
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrderItems)}
        </TransitionGroup>
        <div className="total">Total:
          <strong> {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
