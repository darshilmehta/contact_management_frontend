import React, { Component } from "react";
import {
  FaRegCopyright,
  FaLinkedin,
  FaBriefcase,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-container">
          <div className="row">
            <div className="col-md-3">
              <img
                src={require("./logo.webp")}
                alt="comed logo"
                className="footer-image"
              />
              <p className="foot-p">Add. Edit. Delete. Manage.</p>
            </div>
            <div className="col-md-3">
              <h1 className="foot-h1">Features</h1>
              <p className="foot-p">Add Contacts</p>
              <p className="foot-p">Edit Contacts</p>
              <p className="foot-p">Delete Contacts</p>
              <p className="foot-p">Simplify Management</p>
            </div>
            <div className="col-md-3">
              <h1 className="foot-h1">Contacts</h1>
              <p className="foot-p">
                <FaPhoneAlt className="icons" />
                +91 99695 29095
              </p>
              <p className="foot-p">
                <FaEnvelope className="icons" />
                darshilm223@gmail.com
              </p>
              <p className="foot-p">
                <FaEnvelope className="icons" />
                darshil05@somaiya.edu
              </p>
              <p className="foot-p">
                <FaGlobe className="icons" />
                Mumbai, Maharashtra, India.
              </p>
            </div>
            <div className="col-md-3">
              <h1 className="foot-h1">Links to Portfolio</h1>
              <a
                className="foot-p foot-a"
                target="_blank"
                rel="noreferrer"
                href="https://www.darshilmehta.me/"
              >
                <FaBriefcase className="icons" />
                Portfolio
              </a>
              <a
                className="foot-p foot-a"
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/darshil-mehta-05/"
              >
                <FaLinkedin className="icons" />
                Linkedin
              </a>
            </div>
          </div>
        </div>
        <hr />
        <p className="copyright">
          <FaRegCopyright className="co-icon" />
          Copyright Reserved
        </p>
      </div>
    );
  }
}

export default Footer;
