import React from "react";
import RegisterForm from "./RegisterForm";
import "./Register.css";

class RegisterFormContainer extends React.Component {
  render() {
    return (
      <div className="container register-container">
        <div className="row">
          <div className="col-6 responsive-form">
            <div className="form-container">
              <h2 className="text-center">Register</h2>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterFormContainer;
