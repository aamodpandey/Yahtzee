import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import styled, { keyframes } from "styled-components";
const NUM_DICE = 5;
const NUM_ROLLS = 3;
const Gradient = keyframes` 
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }

`;
const Game = styled.div`
  background: white;
  max-width: 100vw;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
  margin: 0 30%;
  display: flex;
  border: 1px solid var(--bs-gray-600);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-weight: 200;
    font-size: 2em;
    border-bottom: 2px solid purple;
    display: inline-block;
  }
  .Game-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Game-dice-section {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
  }
  .Game-reroll {
    font-size: 2em;
    color: white;
    font-weight: 100;
    transition: 0.5s;
    background-size: 200% auto;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
    background-image: linear-gradient(
      to right,
      #91eae4 0%,
      #7f7fd5 51%,
      #91eae4 100%
    );
    border-radius: 0.5rem;
    border: none;
    margin-bottom: 2rem;
  }
  .Game-reroll:hover {
    cursor: pointer;
    background-position: right center;
  }
  .Game-reroll:active,
  .Game-reroll:focus {
    outline: none;
  }
  .Game-description {
    font-style: italic;
    color: white;
  }
  .Game-reroll:disabled {
    background-color: #ddd;
    cursor: not-allowed;
    opacity: 0.5;
  }
  .Game-header {
    width: 100%;
    background: linear-gradient(-45deg, #673ab7, #9c27b0);
    background-size: 400% 400%;
    -webkit-animation: ${Gradient} 15s ease infinite;
    -moz-animation: ${Gradient} 15s ease infinite;
    animation: ${Gradient} 15s ease infinite;
  }
  min-width: 400px;
  @media screen and (max-width: 399px) {
    min-width: 90%;
  }
  @media screen and (min-width: 571px) and (max-width: 767px) {
    min-width: 500px;
  }
  @media screen and (min-width: 768px) {
    min-width: 600px;
  }
`;
class Gamee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from(
        { length: NUM_DICE },
        () => Math.floor(Math.random() * 6) + 1
      ),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      reroll: true,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
      total: 0,
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState((st) => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      reroll: true,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft <= 0) return;
    this.setState((st) => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1),
      ],
      reroll: false,
    }));
  }

  doScore(rulename, ruleFn) {
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
      total: st.total + ruleFn(this.state.dice),
    }));
    this.roll();
  }

  render() {
    return (
      <Game>
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>

          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              reroll={this.state.reroll}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll mx-3"
                disabled={
                  this.state.locked.every((x) => x) || this.state.rollsLeft <= 0
                }
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
        <h1
          style={{
            fontWeight: 300,
            color: "#852fb3",

            width: "85%",
            borderBottom: "2px solid #852fb3",
          }}
        >
          Total Score: {this.state.total}
        </h1>
      </Game>
    );
  }
}
export default Gamee;
