import React, { Component } from "react";
import { Magic } from "magic-sdk";
import { connect } from "react-redux";
import { getUser, logout } from "../actions/index";
import http from "../apis/http";
import history from "../history";
import keys from "../config/keys";

const magic = new Magic(keys.MAGIC_PUBLISHABLE_KEY);

class MagicAuth extends Component {
  state = {
    email: "",
  };

  async onSubmit(e) {
    e.preventDefault();
    const didToken = await magic.auth.loginWithMagicLink({
      email: this.state.email,
    });
    const isLoggedIn = await magic.user.isLoggedIn();

    if (isLoggedIn) {
      await http.magicLink(didToken);
      await this.props.getUser();
      history.push("/dashboard");
    }
  }
  render() {
    return (
      <div>
        <blockquote>
          To login or create an acount we use magic link. Simply enter your
          email and you will find a message in your inbox with a link
        </blockquote>
        <div className="row">
          <form onSubmit={(e) => this.onSubmit(e)} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  autoComplete="off"
                  id="email"
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <label className="active" htmlFor="email">
                  Enter your email
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { getUser, logout })(MagicAuth);
