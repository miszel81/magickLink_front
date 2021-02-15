import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class ProfileForm extends Component {
  renderInput = ({ meta, label, input }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off"></input>
        {/* {this.renderError(meta)} */}
      </div>
    );
  };

  renderList = ({ label }) => {
    return (
      <div>
        <label>{label}</label>
        <select className="ui dropdown">
          <option value="">Select</option>
          <option value="1">JS</option>
          <option value="0">Python</option>
        </select>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="name"
          component={this.renderInput}
          label="Enter your name"
        ></Field>
        <Field
          name="nickname"
          component={this.renderInput}
          label="Enter your nickname"
        ></Field>
        <Field
          name="location"
          component={this.renderInput}
          label="Enter your location"
        ></Field>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const formWrapped = reduxForm({
  form: "profileForm",
  // set to true in order to fill form fields with initialValues
  enableReinitialize: true,
})(ProfileForm);

const mapStateToProps = ({ user }) => ({
  initialValues: user,
});

export default connect(mapStateToProps)(formWrapped);
