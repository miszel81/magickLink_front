import React, { Component } from "react";
import { connect } from "react-redux";
import { modifyUser } from "../actions/index";
import ProfileForm from "./ProfileForm";

class EditProfile extends Component {
  onSubmit = (formValues) => {
    this.props.modifyUser(formValues);
  };

  render() {
    return (
      <div>
        <h3>Edit Profile</h3>
        <ProfileForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { modifyUser })(EditProfile);
