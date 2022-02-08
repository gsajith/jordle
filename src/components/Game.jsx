import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Keyboard from "./Keyboard";
import GameGrid from "./GameGrid";
import { WORD_LENGTH, NUM_GUESSES } from "../static/globals";
import wordlist from "../static/wordlist";
import {getSeededRand, shuffle} from "../utils";

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
  const answer = React.useRef(null);

  const addGuessLetter = (letter) => {
    setGuesses((oldGuesses) => {
      const newGuesses = JSON.parse(JSON.stringify(oldGuesses));
      if (guesses[numGuesses] && newGuesses[numGuesses].length < WORD_LENGTH) {
        newGuesses[numGuesses].push({ letter: letter, state: GUESS });
      }
      return newGuesses;
    });
  };

  const removeGuessLetter = () => {
    setGuesses((oldGuesses) => {
      const newGuesses = JSON.parse(JSON.stringify(oldGuesses));
      if (guesses[numGuesses] && newGuesses[numGuesses].length > 0) {
        newGuesses[numGuesses].pop();
      }
      return newGuesses;
    });
  };
  
  const submitGuess = () => {
    if (numGuesses < NUM_GUESSES) {
      // TODO: Check if valid guess
      if (guesses[numGuesses] && guesses[numGuesses].length === WORD_LENGTH) {
        setNumGuesses(oldNumGuesses => oldNumGuesses+1);
      }
      console.log("guess length: " + guesses[numGuesses].length);
    }
  }

  React.useEffect(() => {
    const currentDate = new Date();
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    const dateIndex = Math.floor(date.getTime()/86400000);
    
    const allWords = wordlist.split("\n").filter(word => word.length === WORD_LENGTH);
    
    const seededRand = getSeededRand("@guamhat");
    const shuffledWordList = shuffle(allWords, seededRand);
    const selectedWord = shuffledWordList[dateIndex % shuffledWordList.length];
    
    answer.current = selectedWord;
    console.log(answer.current);
  }, []);

  return (
    <>
      <GameContainer>
        <GameGrid guesses={guesses} />
      </GameContainer>
      <Keyboard
        addGuessLetter={addGuessLetter}
        removeGuessLetter={removeGuessLetter}
        submitGuess={submitGuess}
      />
    </>
  );
};

export default Game;
