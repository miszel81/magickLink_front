import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/index";
import { Link } from "react-router-dom";

class Navbar extends Component {
  logoutHandler = () => {
    this.props.logout();
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/login">Login with Magic</a>;
      default:
        return <a onClick={this.logoutHandler}>Logout</a>;
    }
  }

  render() {
    return (
      <nav className="cyan darken-3">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="brand-logo left"
          >
            Home
          </Link>
          <ul className="right">
            <li>{this.renderContent()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { logout })(Navbar);
