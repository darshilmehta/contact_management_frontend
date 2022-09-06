import React from "react";
import Field from "../Field";
import isEmail from "validator/lib/isEmail";
import { login } from "../../api/api.js";
import { Link } from "react-router-dom";
import "./LoginForm.css";

class LoginForm extends React.Component {
  state = {
    fields: {
      email: "",
      password: "",
    },
    fieldErrors: {},
  };

  onFormSubmit = async (evt) => {
    evt.preventDefault();
    localStorage.setItem("justRegistered", false);
    if (this.validate()) return;

    const email = this.state.fields.email;
    const password = this.state.fields.password;

    try {
      let response = await login(email, password);
      if (response.status === 200) {
        let success = JSON.parse(await response.text());
        localStorage.setItem("access", success["access"]);
        localStorage.setItem("refresh", success["refresh"]);
        localStorage.setItem("username", success["name"]);
        window.location.href = "/";
      } else {
        let failure = JSON.parse(await response.text());
        alert(failure["detail"]);
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

    if (!person.email) return true;
    if (!person.password) return true;
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

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <Field
          name="email"
          label="Email"
          placeholder="Enter Email"
          value={this.state.fields.email}
          onChange={this.onInputChange}
          validate={(val) => (isEmail(val) ? false : "Invalid Email")}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Enter Password"
          value={this.state.fields.password}
          onChange={this.onInputChange}
          type="password"
        />
        <div className="helloworld">
          <input type="submit" className="btn--text" value="Login" />
          <Link to="/register">
            <button className="btn--text--new" style={{"marginLeft": "20px"}}>Sign Up</button>
          </Link>
        </div>

      </form>
    );
  }
}

export default LoginForm;
