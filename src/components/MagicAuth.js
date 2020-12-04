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
    // First step, user sends email to create or authenticate an account.
    const didToken = await magic.auth.loginWithMagicLink({
      email: this.state.email,
    });
    //magic responds with link to user email account, if clicked and sucessfully processed =>  isLoggedIn return true
    const isLoggedIn = await magic.user.isLoggedIn();

    if (isLoggedIn) {
      // post a callback req to the server, if status 200 server responds with a session cookie
      await http.magicLink(didToken);
      // req with a session cookie to get a user Objcet in response
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

export default connect(null, { getUser, logout })(MagicAuth);
