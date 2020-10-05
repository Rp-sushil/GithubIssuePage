import React, { Component } from "react";
import PropTypes from "prop-types";

export class Issue extends Component {
  onClick = () => {
    this.props.getDetails(this.props.issue.id);
  };
  getStyle = () => {
    return {
      fontFamily: "Times New Roman Times serif",
      marginTop: "10px",
      backgroundColor: "#f4f4f4",
      padding: "1px",
      borderBottom: "1px #ccc dotted",
      color: this.props.issue.isOpen ? "green" : "red",
    };
  };

  render() {
    const { id, name } = this.props.issue;

    return (
      <div style={this.getStyle()}>
        <p>
          Id:{id} {" ::: "} {name}
          <button onClick={this.onClick} style={btnStyle}>
            Details
          </button>
          <button onClick={this.props.delIssue.bind(this, id)} style={btnStyle}>
            del
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  getDetails: PropTypes.func.isRequired,
  delIssue: PropTypes.func.isRequired,
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};
export default Issue;
