import React from "react";

class Field extends React.Component {
  state = {
    value: this.props.value,
    error: false,
  };
  //React TIP:
  //Whenever the state of the component is being changed by the props from parent it is recomended that you derive this method
  //Because this methods forces react to check the values of the component and if they are changed then it will re render it
  //If this method is not derived and if the parent makes some changes in the components value then it won't be changed in components state.
  static getDerivedStateFromProps(newProps) {
    return { value: newProps.value };
  }

  onChange = (evt) => {
    //1. Store the current value in the field's state
    //2. Validate the value according to validate prop function
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });
    //3. Call parent's onchange by passing the value, so parent can persist that in its own state. This is important as parent will always be form and when we submit, form should have all the values.

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
        {this.props.isTextArea ? (
          <textarea
            placeholder={this.props.placeholder}
            value={this.props.value}
            maxLength={this.props.maxLength ? this.props.maxLength : ""}
            rows={this.props.rows ? this.props.rows : ""}
            onChange={this.onChange}
            className="form-control"
          />
        ) : (
          <input
            placeholder={this.props.placeholder}
            value={this.props.value}
            maxLength={this.props.maxLength ? this.props.maxLength : ""}
            onChange={this.onChange}
            className="form-control"
            type={this.props.type ? this.props.type : ""}
            max={this.props.max ? this.props.max : ""}
          />
        )}
        <div style={{ color: "red" }}>{this.state.error}</div>
      </div>
    );
  }
}
export default Field;
