import React, { Component } from "react";
import Navbar from "../Navbar";
import LoginFormContainer from "./LoginFormContainer";

export default class Login extends Component {
  render() {
    const isLoggedIn = localStorage.getItem("access");
    if (isLoggedIn) {
      window.location.href = "/";
    }
    return (
      <div>
        <Navbar />
        <LoginFormContainer />
      </div>
    );
  }
}
