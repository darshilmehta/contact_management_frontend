import React from "react";
import PhoneInput from "react-phone-number-input";
class PhoneNumberField extends React.Component {
  state = {
    value: this.props.value,
    error: false,
  };
  static getDerivedStateFromProps(newProps) {
    return { value: newProps.value };
  }
  onChange = (val) => {
    const name = this.props.name;
    const value = val;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });
    this.props.onChange({ name, value, error });
  };
  render() {
    return (
      <div className={this.props.marginClass ? "mb-4" : "mb-3"}>
        <label className="form-label">
          {this.props.label}{" "}
          <span className={this.props.req ? "text-danger ml-1" : "d-none"}>
            *
          </span>
        </label>
        <PhoneInput
          defaultCountry="IN"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.onChange}
        />
        <span style={{ color: "red" }}>{this.state.error}</span>
      </div>
    );
  }
}
export default PhoneNumberField;
