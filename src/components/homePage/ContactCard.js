import React from 'react';
import { delete_contact_number_by_id, refresh } from "../../api/api.js";
import "./ContactCard.css"

class ContactCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cd: props.contact_details
    };
    this.deleteContact = this.deleteContact.bind(this);
    this.handleProceed = this.handleProceed.bind(this);
  }

  helper(date) {
    const d = new Date(date);
    return d.toUTCString();
  }

  deleteContact = async () => {
    const id = this.state.cd.id;
    try {
      let access = localStorage.getItem("access");
      let refresh_token = localStorage.getItem("refresh");
      let response = await delete_contact_number_by_id(access, id);
      if (response.status === 204) {
        window.location.reload();
      } else if (response.status === 401) {
        let access_response = await refresh(refresh_token);
        if (access_response.status === 200) {
          let result = JSON.parse(await access_response.text());
          let new_access_token = result["access"];
          localStorage.setItem("access", new_access_token);
          this.deleteContact();
        } else if (access_response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  handleProceed = () => {
    window.location.href ="/edit/" + this.state.cd.id;
  }

  render() {
    return (
      <div className="card" style={{margin: "10px"}}>
        <div className="card-header cardHeaders">
          <div>
            {this.props.contact_details.fname} {this.props.contact_details.lname}
          </div>
          <small>
            {this.helper(this.props.contact_details.created_on)}
          </small>
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.props.contact_details.phone_number}</h5>
          <p className="card-text" style={{margin: "1px 1px 7px 1px"}}>{this.props.contact_details.email}</p>
          <div className="btn btn-warning me-3" onClick={this.handleProceed}>Edit</div>
          <a className="btn btn-danger" onClick={this.deleteContact}>Delete</a>
        </div>
      </div>
    )
  }
}

export default ContactCard;