import React, { Component } from "react";
import Die from "./Die";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
const Dice = styled.div`
  margin: 1em;
  display: flex;
  justify-content: space-between;
`;
let dice = [];
class Dicee extends Component {
  render() {
    return (
      <Dice>
        {this.props.dice.map((d, idx) => (
          <Die
            handleClick={this.props.handleClick}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            key={uuid()}
            reroll={this.props.reroll}
          />
        ))}
      </Dice>
    );
  }
}

export default Dicee;
