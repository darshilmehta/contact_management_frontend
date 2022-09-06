import React from "react";
import LoginForm from "./LoginForm";
import "./Login.css";
import SuccessAlert from "../alerts/SuccessAlert";

class LoginFormContainer extends React.Component {
  render() {
    const justRegistered = localStorage.getItem("justRegistered");
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-6 responsive-form">
            <div className="form-container">
              <h2 className="text-center">Login</h2>
              {justRegistered === "true" ? (
                <SuccessAlert
                  message={
                    "You have successfully registered! Login to continue"
                  }
                />
              ) : (
                <div></div>
              )}
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginFormContainer;
