import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    if (!this.props.user) {
      return (
        <div>
          <h3>Please Log In!</h3>
        </div>
      );
    }
    const { name, nickname, languages, location } = this.props.user;
    return (
      <div className="ui card">
        <div className="content">
          <h3 className="header">{name}</h3>
          <div className="meta">
            <span className="date">{nickname}</span>
          </div>
          <div className="description">{location}</div>
        </div>
        <div className="extra content">
          <a>
            <i className="code icon"></i>
            {languages}
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
