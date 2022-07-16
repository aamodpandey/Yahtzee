import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
const spin = keyframes`  0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}`;
const Die = styled.button`
  color: white;
  text-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0);
  &.Die-locked {
    opacity: 0.5;
    text-shadow: none;
  }
  &.Die-rolling {
    animation: ${spin} 1s ease-out;
  }
  &.Die-rolling:hover,
  .Die[disabled] {
    cursor: not-allowed;
  }
  &.Die:not(.Die-locked):hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

class Diee extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.idx);
  };
  render() {
    let m = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
    };
    return (
      <Die
        className={
          (this.props.reroll && "Die-rolling") +
          " Die p-0 border-0 " +
          (this.props.locked && "Die-locked")
        }
        onClick={this.handleClick}
      >
        <i className={`fas fa-dice-${m[this.props.val]} fa-3x`}> </i>
      </Die>
    );
  }
}

export default Diee;
