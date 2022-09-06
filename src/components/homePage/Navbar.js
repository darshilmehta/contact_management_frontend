import React, { Component } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      is_logged: localStorage.getItem("access") !== null,
    };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  handleRegister = () => {
    window.location.href = "/register";
  };

  handleLogin = () => {
    window.location.href = "/login";
  };

  closeMobileNav = () => {
    if (this.state.clicked) {
      this.setState({ clicked: !this.state.clicked });
    }
  };

  render() {
    return (
      <nav className="NavbarItems">
        <Link to="/">
          <h1 className="navbar-logo">
            Contacts
          </h1>
        </Link>

        <div className="menu-icon" onClick={this.handleClick}>
          <i className="mobile-toggle">
            {this.state.clicked ? <FaTimes /> : <FaBars />}
          </i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {this.state.is_logged ? (
            <div className="btnn nav-btn" onClick={this.handleLogout}>
              Logout
            </div>
          ) : (
            <div className="nav-btn-div">
              <div className="btnn nav-btn" onClick={this.handleLogin}>
                Log In
              </div>
              <div className="btnn nav-btn" onClick={this.handleRegister}>
                Register
              </div>
            </div>
          )}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
