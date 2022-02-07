import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Keyboard from "./Keyboard";
import GameGrid from "./GameGrid";

export const EMPTY = 0;
export const NO = 1;
export const MAYBE = 2;
export const YES = 3;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 36px;
  letter-spacing: 3.2px;
  pointer-events: none;
`;

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

export const Game = () => {
  const [guesses, setGuesses] = React.useState([[]]);
  return (
    <>
      <GameContainer>
        <GameGrid
          guesses={guesses}
        />
      </GameContainer>
      <Keyboard />
    </>
  );
};

export default Game;
