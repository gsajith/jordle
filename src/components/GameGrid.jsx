import * as React from "react";
import styled from "styled-components";
import { WORD_LENGTH, NUM_GUESSES } from "../static/globals";

const EMPTY = 0;
const NO = 1;
const MAYBE = 2;
const YES = 3;

const GameGridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(${NUM_GUESSES}, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  width: 350px;
  height: 420px;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${WORD_LENGTH}, 1fr);
  grid-gap: 5px;
`;

const GridItem = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  text-transform: uppercase;
  user-select: none;
  border: 2px solid ${(props) => {
    switch(props.state) {
      case EMPTY:
        return props.theme.gridBorderColor;
      case NO:
        return props.theme.gridBorderColorNo;
      case YES:
        return props.theme.gridBorderColorYes;
      case MAYBE:
        return props.theme.gridBorderColorMaybe;
      default:
        return props.theme.gridBorderColor;
    }
    return props.theme.gridBorderColor;
  }};
  background-color: ${(props) => {
    switch(props.state) {
      case EMPTY:
        return props.theme.gridColor;
      case NO:
        return props.theme.gridColorNo;
      case YES:
        return props.theme.gridColorYes;
      case MAYBE:
        return props.theme.gridColorMaybe;
      default:
        return props.theme.gridColor;
    }
    return props.theme.gridColor;
  }};
  
`;

const guesses = [
  [
    { letter: "g", state: NO },
    { letter: "u", state: YES },
    { letter: "e", state: NO },
    { letter: "s", state: MAYBE },
    { letter: "s", state: NO },
  ],
];

const GameGrid = () => {
  console.log(guesses);
  return (
    <GameGridContainer>
      {[...Array(NUM_GUESSES)].map((row, index) => {
        return (
          <GridRow>
            {[...Array(WORD_LENGTH)].map((item, rowIndex) => {
              const letter =
                guesses && guesses[index] && guesses[index][rowIndex].letter;
              const state =
                guesses && guesses[index] && guesses[index][rowIndex].state;

              return (
                <GridItem state={state}>
                  {letter !== undefined && letter}
                </GridItem>
              );
            })}
          </GridRow>
        );
      })}
    </GameGridContainer>
  );
};

export default GameGrid;
