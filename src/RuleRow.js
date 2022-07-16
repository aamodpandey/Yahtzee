import React, { Component } from "react";
import "./RuleRow.css";
class RuleRow extends Component {
  state = {
    clicked: 0,
  };
  handleClick = () => {
    let clicked = this.state.clicked;
    if (!clicked) this.props.doScore();
    this.setState({ clicked: 1 });
  };
  render() {
    let clicked = this.state.clicked;
    return (
      <tr
        className={
          "RuleRow " + (clicked ? "RuleRow-disabled" : "RuleRow-active")
        }
        onClick={this.handleClick}
      >
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">
          {clicked ? this.props.score : this.props.d}
        </td>
      </tr>
    );
  }
}

export default RuleRow;
