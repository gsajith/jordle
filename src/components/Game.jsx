import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Keyboard from "./Keyboard";
import GameGrid from "./GameGrid";
import Toast from "./Toast";
import { WORD_LENGTH, NUM_GUESSES } from "../static/globals";
import wordlist from "../static/wordlist";
import { getSeededRand, shuffle } from "../utils";

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
  const [answerFound, setAnswerFound] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const answer = React.useRef(null);
  const errorNumber = React.useRef(0);

  const addGuessLetter = React.useCallback(
    (letter) => {
      setGuesses((oldGuesses) => {
        if (numGuesses === NUM_GUESSES || answerFound) {
          return oldGuesses;
        }
        const newGuesses = JSON.parse(JSON.stringify(oldGuesses));
        if (
          !newGuesses[numGuesses] ||
          typeof newGuesses[numGuesses] === "undefined"
        ) {
          newGuesses[numGuesses] = [];
        }
        if (newGuesses[numGuesses].length < WORD_LENGTH) {
          newGuesses[numGuesses].push({ letter: letter, state: GUESS });
        }
        return newGuesses;
      });
    },
    [numGuesses, answerFound]
  );

  const removeGuessLetter = React.useCallback(() => {
    setGuesses((oldGuesses) => {
      if (numGuesses === NUM_GUESSES || answerFound) {
        return oldGuesses;
      }
      const newGuesses = JSON.parse(JSON.stringify(oldGuesses));
      if (newGuesses[numGuesses] && newGuesses[numGuesses].length > 0) {
        newGuesses[numGuesses].pop();
      }
      return newGuesses;
    });
  }, [numGuesses, answerFound]);
  
  const triggerError = React.useCallback((text) => {
    const errorObject = {text: text, code: errorNumber.current};
    errorNumber.current = errorNumber.current + 1;
    
    setErrors((oldErrors) => {
      const newErrors = [...oldErrors];
      newErrors.push(errorObject);
      return newErrors;
    })
    setTimeout(() => {
      setErrors((oldErrors) => {
        const newErrors = [...oldErrors];
        newErrors.shift();
        return newErrors;
      })
    }, 2500);
  }, []);

  const submitGuess = React.useCallback(() => {
    if (numGuesses < NUM_GUESSES) {
      if (guesses[numGuesses]) {
        if (guesses[numGuesses].length === WORD_LENGTH) {
          const guess = guesses[numGuesses].map((obj) => obj.letter).join("");
          if (
            wordlist.toUpperCase().split("\n").includes(guess.toUpperCase())
          ) {
            // If they guessed a valid word, check each letter
            setGuesses((oldGuesses) => {
              const newGuesses = JSON.parse(JSON.stringify(oldGuesses));
              const guessRow = newGuesses[numGuesses].map((obj) => {
                return { letter: obj.letter.toUpperCase(), state: obj.state };
              });
              const answerRow = answer.current
                .split("")
                .map((letter) => letter.toUpperCase());

              // Give priority to highlighting fully correct characters
              for (var i = 0; i < guessRow.length; i++) {
                if (guessRow[i].letter === answerRow[i]) {
                  guessRow[i].state = YES;
                  answerRow[i] = "";
                }
              }

              // Do a secondary loop to highlight slightly correct characters
              for (var i = 0; i < guessRow.length; i++) {
                if (answerRow.includes(guessRow[i].letter)) {
                  guessRow[i].state = MAYBE;
                  answerRow[answerRow.indexOf(guessRow[i].letter)] = "";
                } else {
                  if (guessRow[i].state === GUESS) {
                    guessRow[i].state = NO;
                  }
                }
              }

              newGuesses[numGuesses] = guessRow;

              // Stop the game if answer found
              if (
                guessRow.map((obj) => obj.letter).join("") ===
                answer.current.toUpperCase()
              ) {
                setAnswerFound(true);
              }

              return newGuesses;
            });
            setNumGuesses((oldNumGuesses) => oldNumGuesses + 1);
          } else {
            // Error: Guess not in word list
            triggerError("Not in word list");
          }
        } else {
          // Error: Not enough letters in guess
          triggerError("Not enough letters");
        }
      }
    }
  }, [numGuesses, guesses]);

  React.useEffect(() => {
    const currentDate = new Date();
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    const dateIndex = Math.floor(date.getTime() / 86400000);

    const allWords = wordlist
      .split("\n")
      .filter((word) => word.length === WORD_LENGTH);

    const seededRand = getSeededRand("@guamhat");
    const shuffledWordList = shuffle(allWords, seededRand);
    const selectedWord = shuffledWordList[dateIndex % shuffledWordList.length];

    answer.current = selectedWord;
    console.log(selectedWord);
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
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          left: "50%",
          top: "10%",
          transform: "translate(-50%, 0)",
        }}
      >
        {errors.map((error) => (
          <Toast text={error.text} />
        ))}
      </div>
    </>
  );
};

export default Game;
