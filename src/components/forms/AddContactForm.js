import React from 'react';
import Navbar from "../homePage/Navbar";
import Field from "../Field";
import isEmail from "validator/lib/isEmail";
import PhoneNumberField from "../PhoneNumberField";
import { create_contact_detail } from "../../api/api.js";
import "./EditContactForm.css";

class AddContactForm extends React.Component  {
    state = {
        fields: {
          firstName: "",
          lastName: "",
          phoneNo: "",
          email: "",
        },
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
          let response = await create_contact_detail(
            first_name,
            last_name,
            email,
            phone_number
          );
          console.log(response);
          if (response.status === 201) {
            window.location.href = "/";
          } else {
            const error = JSON.parse(await response.text());
            const error1 = JSON.stringify(error);
            const obj = JSON.parse(error1);
            var [keys] = Object.keys(obj);
            alert(obj[keys]);
          }
        } catch (e) {
          alert(e);
        }
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

      goBack() {
        console.log("asdasd")
        window.location.href = "/";
      }

    render() {
        return (
            <div>
                <Navbar />
                <form onSubmit={this.onFormSubmit} className="customForm" style={{marginTop: "20px"}}>
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
                        <input type="submit" className="btn--text" value="Add Contact" style={{marginRight: "10px"}}/>
                        <div className="btn--text" onClick={this.goBack}>Back</div>
                    </div>
                </form>
            </div>
          )
    }
}

export default AddContactForm