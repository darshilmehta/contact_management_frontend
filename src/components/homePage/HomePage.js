import React, { Component } from "react";
import "./HomePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactsList from "./ContactsList";
import Login from "../login/Login";

class HomePage extends Component {
  render() {
    const isLoggedIn = localStorage.getItem("access");
    return (
        <div>
        {isLoggedIn ? (
          <div className="HomePage" style={{minHeight: "100vh", display: "flex", justifyContent: "space-between", flexDirection:"column"}}>
            <div>
              <Navbar />
              <ContactsList />
            </div>
          <Footer />
        </div>
        ) : (
          window.location.href = "/login"
        )}
      </div>
    );
  }
}

export default HomePage;
