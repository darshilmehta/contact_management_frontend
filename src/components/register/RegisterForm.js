import React from "react";
import Field from "../Field";
import isEmail from "validator/lib/isEmail";
import "react-phone-number-input/style.css";
import PhoneNumberField from "../PhoneNumberField";
import { Link } from "react-router-dom";
import { register } from "../../api/api.js";
import "./RegisterForm.css";

class RegisterForm extends React.Component {
  state = {
    fields: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    fieldErrors: {},
  };

  onFormSubmit = async (evt) => {
    evt.preventDefault();
    const person = this.state.fields;
    const password = person.password;
    const confirmPassword = person.confirmPassword;

    if (this.validate()) return;
    if (!(password === confirmPassword)) {
      alert("Password is not matching");
      return;
    }

    const first_name = person.firstName;
    const last_name = person.lastName;
    const username = person.username;
    const email = person.email;
    const phone_number = person.phoneNo;

    try {
      let response = await register(
        first_name,
        last_name,
        username,
        email,
        phone_number,
        password
      );
      if (response.status === 201) {
        localStorage.setItem("justRegistered", true);
        window.location.href = "/login";
      } else {
        const error = JSON.parse(await response.text());
        const error1 = JSON.stringify(error);
        const obj = JSON.parse(error1);
        var [keys] = Object.keys(obj);
        alert(obj[keys]);
      }
    } catch (e) {
      alert(e);
    }
  };

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    const errorMessages = Object.keys(fieldErrors).filter(
      (key) => fieldErrors[key]
    );

    if (!person.firstName) return true;
    if (!person.lastName) return true;
    if (!person.username) return true;
    if (!person.phoneNo) return true;
    if (!person.email) return true;
    if (!person.password) return true;
    if (!person.confirmPassword) return true;
    if (errorMessages.length) return true;

    return false;
  };

  onInputChange = ({ name, value, error }) => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  };

  onPhoneNoInputChange = ({ name, value }) => {
    const fields = Object.assign({}, this.state.fields);
    fields[name] = value;
    this.setState({ fields });
  };
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Field
            name="firstName"
            label="First Name"
            placeholder="Enter First Name"
            value={this.state.fields.firstName}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : "First Name Required")}
          />
          <Field
            name="lastName"
            label="Last Name"
            placeholder="Enter Last Name"
            value={this.state.fields.lastName}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : "Last Name Required")}
          />
        </div>
        <Field
          name="username"
          label="Username"
          placeholder="Enter Username"
          value={this.state.fields.username}
          onChange={this.onInputChange}
          validate={(val) => (val ? false : "Username Required")}
        />

        <Field
          name="email"
          label="Email"
          placeholder="Enter Email"
          value={this.state.fields.email}
          onChange={this.onInputChange}
          validate={(val) => (isEmail(val) ? false : "Invalid Email")}
        />
        <PhoneNumberField
          name="phoneNo"
          label="Phone Number"
          placeholder="Enter Phone Number"
          value={this.state.fields.phoneNo}
          onChange={this.onInputChange}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Enter Password"
          value={this.state.fields.password}
          onChange={this.onInputChange}
          type="password"
        />
        <Field
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter Password"
          value={this.state.fields.confirmPassword}
          onChange={this.onInputChange}
          type="password"
        />
        <div className="helloworld">
          <input type="submit" className="btn--text" value="Register" />
          <Link to="/login">
            <button className="btn--text--new" style={{"marginLeft": "20px"}}>Already a user? Login instead</button>
          </Link>
        </div>
      </form>
    );
  }
}
export default RegisterForm;
