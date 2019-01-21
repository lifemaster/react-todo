import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
  state = {
    label: ''
  }

  onLableChange = (e) => {
    this.setState({
      label: e.target.value
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (!this.state.label) {
      return;
    }

    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    })
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onFormSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLableChange}
          placeholder="What needs to be done"
          value={this.state.label}
        />
        <button
          className="btn btn-outline-secondary"
          disabled={!this.state.label}>
          Add Item
        </button>
      </form>
    );
  }
}