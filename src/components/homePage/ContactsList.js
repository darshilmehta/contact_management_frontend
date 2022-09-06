import React, { Component } from "react";
import "./ContactsList.css";
import { get_all_contact_numbers, refresh } from "../../api/api.js";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    await this.helper();
  };
  
  helper = async () => {
    try {
      let access = localStorage.getItem("access");
      let refresh_token = localStorage.getItem("refresh");
      let response = await get_all_contact_numbers(access);
      if (response.status === 200) {
        let text = JSON.parse(await response.text());
        this.setState({
          data: text,
        });
      } else if (response.status === 401) {
        let access_response = await refresh(refresh_token);
        if (access_response.status === 200) {
          let result = JSON.parse(await access_response.text());
          let new_access_token = result["access"];
          localStorage.setItem("access", new_access_token);
          this.get_all_contacts();
        } else if (access_response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  createContactCards() {
    return this.state.data.map((contact) => {
      return (
        <ContactCard key={contact.id} contact_details={contact}/>
      )
    });
  }

  handleAddContact = () => {
    window.location.href = "/add"
  }

  render() {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.handleAddContact} style={{display: "flex", justifyContent: "center", width: "250px", margin: "20px"}}>
            Add Contact
          </button>
          <div className="contactsList">
            {this.createContactCards()}
          </div>
        </div>
      );
  }
}

export default ContactsList;
  