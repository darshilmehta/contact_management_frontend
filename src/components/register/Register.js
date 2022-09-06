import React, { Component } from "react";
import Navbar from "../Navbar";
import RegisterFormContainer from "./RegisterFormContainer";

export default class Register extends Component {
  render() {
    const isLoggedIn = localStorage.getItem("access");
    if (isLoggedIn) {
      window.location.href = "/";
    }
    return (
      <div className="registerPage">
        <Navbar />
        <RegisterFormContainer />
      </div>
    );
  }
}
