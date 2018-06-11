import React, { Fragment } from "react";

class StorePicker extends React.Component {
  render() {
    return (
      <Fragment>
        <p>Hello</p>
        <form action="" className="store-selector">
          {/* TODO: correct this*/}

          <h2>Please Enter a Store</h2>
          <input type="text"
                 required placeholder={"Store Name"}/>
          <button type="submit">
            Visit Store
            <span role='img'
                  aria-label='pointing right'>👉</span>
          </button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
