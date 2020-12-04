import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";
import Dashboard from "./Dashboard";
import MagicAuth from "./MagicAuth";
import Navbar from "./Navbar";
import Home from "./Home";
import { getUser } from "../actions/index";

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="container">
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={MagicAuth} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(null, { getUser })(App);
