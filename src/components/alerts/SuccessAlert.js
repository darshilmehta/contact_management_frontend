import React, {Component} from "react";
import "./alertStyles.css";
export default class SuccessAlert extends Component {
  onClick = (evt) => {
    evt.target.parentElement.parentElement.hidden = true;
  };
  render() {
    return (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
        hidden={false}
      >
        {this.props.message}
        <div className="closeBtn">
          <span aria-hidden="true" onClick={this.onClick}>
            &times;
          </span>
        </div>
      </div>
    );
  }
}
