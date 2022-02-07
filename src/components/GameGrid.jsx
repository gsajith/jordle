import * as React from "react";
import styled from "styled-components";
import { WORD_LENGTH, NUM_GUESSES } from "../static/globals";

const NO = 0;
const MAYBE = 1;
const YES = 2;

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
  border: 2px solid ${(props) => props.theme.gridBorderColor};
`;

const GameGrid = (
  guesses = [
    [
      { letter: "g", state: NO },
      { letter: "u", state: YES },
      { letter: "e", state: NO },
      { letter: "e", state: MAYBE },
      { letter: "e", state: NO },
    ],
  ]
) => {
  console.log(guesses);
  return (
    <GameGridContainer>
      {[...Array(NUM_GUESSES)].map((row, index) => {
        return (
          <GridRow>
            {[...Array(WORD_LENGTH)].map((item, rowIndex) => {
              return <GridItem>{guesses && guesses[index] && guesses[index][rowIndex]}</GridItem>
            })}
          </GridRow>
        );
      })}
    </GameGridContainer>
  );
};

export default GameGrid;
