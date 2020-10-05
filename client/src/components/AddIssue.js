import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AddIssue extends Component {
  state = {
    name: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addIssue(this.state.name);
    this.setState({ name: "" });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          style={{ flex: "10", padding: "5px" }}
          name="name"
          placeholder="Add Issue..."
          value={this.state.name}
          onChange={this.onChange}
          required
        />
        <input
          type="submit"
          value="submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

AddIssue.propTypes = {
  addIssue: PropTypes.func.isRequired,
};
