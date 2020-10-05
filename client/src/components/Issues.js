import React from "react";
import Issue from "./Issue";
import PropTypes from "prop-types";

class Issues extends React.Component {
  render() {
    return this.props.issues.map((issue) => (
      <Issue
        key={issue.id}
        issue={issue}
        getDetails={this.props.getDetails}
        delIssue={this.props.delIssue}
      />
    ));
  }
}

// PropTypes
Issues.propTypes = {
  issues: PropTypes.array.isRequired,
  getDetails: PropTypes.func.isRequired,
  delIssue: PropTypes.func.isRequired,
};

export default Issues;
