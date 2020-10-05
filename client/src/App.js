import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Issues from "./components/Issues";
import AddIssue from "./components/AddIssue";
import Header from "./components/layout/Header";
// import { v4 as uuid } from "uuid";
import About from "./components/pages/About";
import axios from "axios";
import UpdateIssue from "./components/UpdateIssue";
import Filter from "./components/Filter";
// import { Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    issues: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/list-issues?page=1")
      .then((res) => this.setState({ issues: res.data["data"] }));
  }
  // get details by id // Don't know to redirect
  getDetails = (id) => {
    axios.get(`http://localhost:5000/list-issues?id=${id}`).then((res) => {
      console.log(res.data["data"]);
      // return <Redirect to="/about" />;
    });
  };
  // Delete Issue
  delIssue = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((res) =>
      this.setState({
        issues: [...this.state.issues.filter((issue) => issue.id !== id)],
      })
    );
  };

  // update Issue
  updateIssue = (data) => {
    axios.patch(`http://localhost:5000/update/${data.id}`, data).then((res) =>
      this.setState({
        issues: [
          ...this.state.issues.map((issue) => {
            if (issue.id === res.data["data"].id) {
              issue.name = res.data["data"].name;
              issue.isOpen = res.data["data"].status;
              issue.data_added = res.data["data"].dateAdded;
            }
            return issue;
          }),
        ],
      })
    );
  };

  //Add List
  addIssue = (name) => {
    axios
      .post("http://localhost:5000/add-issue", {
        name,
        isOpen: 1,
      })
      .then((res) =>
        this.setState({ issues: [...this.state.issues, res.data["data"]] })
      );
  };

  // Filter
  filter = (data) => {
    axios.get("http://localhost:5000/list-issues?page=1").then((res) =>
      this.setState({
        issues: [
          ...res.data["data"].filter((issue) => {
            return parseInt(data.filter, 10) === 2
              ? true
              : parseInt(issue.isOpen, 10) === parseInt(data.filter, 10);
          }),
        ],
      })
    );
  };
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddIssue addIssue={this.addIssue} />
                  <UpdateIssue updateIssue={this.updateIssue} />
                  <Filter filter={this.filter} />
                  <Issues
                    issues={this.state.issues}
                    getDetails={this.getDetails}
                    delIssue={this.delIssue}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
