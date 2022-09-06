import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light fixed-top">
        <div className="container-fluid justify-content-center">
          <Link to="/" style={{ textDecoration: "None" }}>
            <span className="navbar-brand text-white">Contacts Management App</span>
          </Link>
        </div>
      </nav>
    );
  }
}
export default Navbar;
