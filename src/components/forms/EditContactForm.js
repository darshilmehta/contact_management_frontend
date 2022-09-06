import React from 'react';
import Navbar from "../homePage/Navbar";
import Field from "../Field";
import isEmail from "validator/lib/isEmail";
import PhoneNumberField from "../PhoneNumberField";
import { update_contact_detail, get_contact_number, refresh } from "../../api/api.js";
import "./EditContactForm.css";
import { Link } from "react-router-dom";

class EditContactForm extends React.Component  {
    state = {
        fields : {
            firstName: "",
            lastName: "",
            phoneNo: "",
            email: "",
        },
        id: this.props.match.params.id,
        fieldErrors: {},
    };

    onFormSubmit = async (evt) => {
        evt.preventDefault();
        const person = this.state.fields;
    
        if (this.validate()) return;
    
        const first_name = person.firstName;
        const last_name = person.lastName;
        const email = person.email;
        const phone_number = person.phoneNo;

        try {
            let access = localStorage.getItem("access");
            let refresh_token = localStorage.getItem("refresh");
            let response = await update_contact_detail(
                this.state.id,
                first_name,
                last_name,
                email,
                phone_number,
                access
              );
            if (response.status === 200) {
              let text = JSON.parse(await response.text());
              console.log(text);
              window.location.href = "/";
            } else if (response.status === 401) {
              let access_response = await refresh(refresh_token);
              if (access_response.status === 200) {
                let result = JSON.parse(await access_response.text());
                let new_access_token = result["access"];
                localStorage.setItem("access", new_access_token);
                this.update_co_single_details();
              } else if (access_response.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
              }
            }
          } catch (e) {
            alert(e);
          }
    };

    onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors });
    };

    onPhoneNoInputChange = ({ name, value }) => {
        const fields = Object.assign({}, this.state.fields);
        fields[name] = value;
        this.setState({ fields });
    };

    validate = () => {
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        const errorMessages = Object.keys(fieldErrors).filter(
            (key) => fieldErrors[key]
        );

        if (!person.firstName) return true;
        if (!person.lastName) return true;
        if (!person.phoneNo) return true;
        if (!person.email) return true;
        if (errorMessages.length) return true;

        return false;
    };

    componentDidMount = async () => {
        await this.helper();
    }

    helper = async () => {
        try {
            let access = localStorage.getItem("access");
            let refresh_token = localStorage.getItem("refresh");
            let response = await get_contact_number(access, this.state.id);
            if (response.status === 200) {
              let text = JSON.parse(await response.text());
              this.setState({
                fields: {
                    firstName: text.fname,
                    lastName: text.lname,
                    phoneNo: text.phone_number,
                    email: text.email,
                }
              });
              console.log(this.state)
            } else if (response.status === 401) {
              let access_response = await refresh(refresh_token);
              if (access_response.status === 200) {
                let result = JSON.parse(await access_response.text());
                let new_access_token = result["access"];
                localStorage.setItem("access", new_access_token);
                this.helper();
              } else if (access_response.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
              }
            }
          } catch (e) {
            alert(e);
          }
    }

    goBack() {
      console.log("asdasd")
      window.location.href = "/";
    }

    render() {
        return (
            <div>
                <Navbar />
                <form onSubmit={this.onFormSubmit} className="customForm" style={{marginTop: "20px"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Field
                        name="firstName"
                        label="First Name"
                        placeholder="Enter First Name"
                        value={this.state.fields.firstName}
                        onChange={this.onInputChange}
                        validate={(val) => (val ? false : "First Name Required")}
                        style={{marginRight: "5px"}}
                    />
                    <Field
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter Last Name"
                        value={this.state.fields.lastName}
                        onChange={this.onInputChange}
                        validate={(val) => (val ? false : "Last Name Required")}
                        style={{marginLeft: "5px"}}
                    />
                    </div>
                    <Field
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    value={this.state.fields.email}
                    onChange={this.onInputChange}
                    validate={(val) => (isEmail(val) ? false : "Invalid Email")}
                    />
                    <PhoneNumberField
                    name="phoneNo"
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    value={this.state.fields.phoneNo}
                    onChange={this.onInputChange}
                    />
                    <div className="helloworld">
                        <input type="submit" className="btn--text" value="Edit Contact" style={{marginRight: "10px"}}/>
                        <div className="btn--text" onClick={this.goBack}>Back</div>
                    </div>
                </form>
            </div>
          )
    }
}

export default EditContactForm