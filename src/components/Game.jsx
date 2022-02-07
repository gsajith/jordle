import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Keyboard from "./Keyboard";
import GameGrid from "./GameGrid";
import { WORD_LENGTH, NUM_GUESSES } from "../static/globals";

export const EMPTY = 0;
export const GUESS = 1;
export const NO = 2;
export const MAYBE = 3;
export const YES = 4;

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
  const [numGuesses, setNumGuesses] = React.useState(0);

  const addGuessLetter = (letter) => {
    setGuesses((oldGuesses) => {
      const newGuesses = JSON.parse(JSON.stringify(oldGuesses))
      if (newGuesses[numGuesses].length < WORD_LENGTH) {
        newGuesses[numGuesses].push({ letter: letter, state: GUESS });
      }
      console.log(newGuesses);
      return newGuesses;
    });
  };
  
  const removeGuessLetter = () => {
    setGuesses((oldGuesses) => {
      const newGuesses = JSON.parse(JSON.stringify(oldGuesses))
      if (newGuesses[numGuesses].length > 0) {
        newGuesses[numGuesses].pop();
      }
      return newGuesses;
    });
  }
  
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     addGuessLetter('a');
  //     addGuessLetter('c');
  //     setTimeout(() => {
  //       removeGuessLetter();
  //     }, 1000);
  //   }, 1000);
  // }, []);

  return (
    <>
      <GameContainer>
        <GameGrid guesses={guesses}/>
      </GameContainer>
      <Keyboard  addGuessLetter={addGuessLetter} removeGuessLetter={removeGuessLetter}/>
    </>
  );
};

export default Game;
