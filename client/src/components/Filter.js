import React, { Component } from "react";

export default class Filter extends Component {
  state = {
    filter: "2",
  };
  onChange = (e) => {
    this.setState({ filter: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.filter({
      filter: this.state.filter,
    });
    this.setState({ filter: "2" });
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="filter">Filter</label>
          <select id="filter" onChange={this.onChange}>
            <option value={2}>All</option>
            <option value={0}>close</option>
            <option value={1}>Open</option>
          </select>
          <input type="submit" value="submit" className="btn"></input>
        </form>
      </React.Fragment>
    );
  }
}
