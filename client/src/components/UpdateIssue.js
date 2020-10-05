import React, { Component } from "react";
import PropTypes from "prop-types";

export default class UpdateIssue extends Component {
  state = {
    name: "",
    id: "",
    status: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateIssue({
      id: this.state.id,
      name: this.state.name,
      status: this.state.status,
    });
    this.setState({ name: "", id: "", status: "" });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="number"
          style={{ padding: "1px" }}
          name="id"
          placeholder="Enter Id..."
          value={this.state.id}
          onChange={this.onChange}
          required
        />
        <input
          type="text"
          style={{ flex: "10", padding: "5px" }}
          name="name"
          placeholder="Enter new Name...."
          value={this.state.name}
          onChange={this.onChange}
          required
        />
        <select
          name="status"
          onChange={this.onChange}
          value={this.state.isOpen}
        >
          <option value={null}>Status</option>
          <option value={0}>Close</option>
          <option value={1}>Open</option>
        </select>
        <input
          type="submit"
          value="update"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

UpdateIssue.propTypes = {
  updateIssue: PropTypes.func.isRequired,
};
