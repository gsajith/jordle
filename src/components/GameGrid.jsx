import * as React from "react";
import styled from "styled-components";
import {WORD_LENGTH, NUM_GUESSES} from "../static/globals";

const GameGridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(${NUM_GUESSES}, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  width: 350px;
  height: 420px;
  background-color: red;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${WORD_LENGTH}, 1fr);
  grid-gap: 5px;
`;

const GameGrid = () => {
  return (<GameGridContainer>
    {[...Array(NUM_GUESSES)].map(row => {
        return (<GridRow>{[...Array(WORD_LENGTH)]}</GridRow>)
      })}
    </GameGridContainer>);
};

export default GameGrid;
