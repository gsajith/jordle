import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Keyboard from "./Keyboard";

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

const GameGridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  width: 350px;
  height: 420px;
  background-color: red;
`;

export const Game = () => {
  return (
    <>
    <GameContainer>
      <GameGridContainer>
      </GameGridContainer>
    </GameContainer>
      <Keyboard/>
    </>
  );
};

export default Game;
