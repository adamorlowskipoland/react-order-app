import React from "react";
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
  };

  // Way to add methods to component before react": "^16.3.0-alpha.1
  // constructor() {
  //     super();
  //     this.createFish = this.createFish.bind(this);
  // }
  //
  // createFish(event) {
  //     event.preventDefault();
  //     console.log('making a fish');
  // };

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    event.preventDefault();
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };
    this.props.addFish(fish);
    //    Refresh the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.createFish} className="fish-edit">
        <input
          name="name"
          ref={this.nameRef}
          type="text"
          placeholder="name"
        />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="price"
        />
        <select name="status"
                ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          ref={this.descRef}
          placeholder="desc"
        />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm;
