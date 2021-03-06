import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  myInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    console.log(this.myInput.current.value)
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <Fragment>
        <p>Hello</p>
        <form onSubmit={this.goToStore}
              className="store-selector">
          <h2>Please Enter a Store</h2>
          <input type="text"
                 ref={this.myInput}
                 placeholder={"Store Name"}
                 defaultValue={getFunName()}
                 required/>
          <button type="submit">
            Visit Store
            <span role='img'
                  aria-label='pointing right'> 👉</span>
          </button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
