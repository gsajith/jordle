import * as React from "react";
import styled from "styled-components";
import { WORD_LENGTH, NUM_GUESSES } from "../static/globals";
import { EMPTY, GUESS, NO, YES, MAYBE } from "./Game";
import { useSpring, animated, Transition, config } from 'react-spring'

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
  border: 2px solid
    ${(props) => {
      switch (props.state) {
        case EMPTY:
          return props.theme.gridBorderColor;
        case GUESS:
          return props.theme.gridBorderColorGuess;
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
    switch (props.state) {
      case EMPTY:
        return props.theme.gridColor;
      case GUESS:
        return props.theme.gridColorGuess;
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

const GameGrid = ({ guesses }) => {
  
  return (
    <GameGridContainer>
      {[...Array(NUM_GUESSES)].map((row, index) => {
        return (
          <GridRow key={"row" + index}>
            <Transition
              items={[...Array(WORD_LENGTH)].map((item, rowIndex) => {
                const letter =
                  guesses &&
                  guesses.length > index &&
                  guesses[index] &&
                  guesses[index].length > rowIndex &&
                  guesses[index][rowIndex].letter;
                const state =
                  guesses &&
                  guesses.length > index &&
                  guesses[index] &&
                  guesses[index].length > rowIndex &&
                  guesses[index][rowIndex].state;
                return {letter, state};
              })}
              from={{opacity: 0}}
              enter={{opacity: 1}}
              leave={{opacity: 0}}
              delay={200}
              config={config.molasses}>
              {({opacity}, item, index) => (
                <GridItem state={item.state} key={"item" + row + " " + index}>
                  {item.letter !== undefined && item.letter}
                </GridItem>
              )}
            </Transition>
          </GridRow>
        );
      })}
    </GameGridContainer>
  );
};

export default GameGrid;
