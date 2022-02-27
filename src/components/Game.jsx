import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Keyboard from "./Keyboard";
import GameGrid from "./GameGrid";
import Toast from "./Toast";
import GameEndPopup from "./GameEndPopup";
import { WORD_LENGTH, NUM_GUESSES } from "../static/globals";
import wordlist from "../static/wordlist";
import { getSeededRand, shuffle, useStickyState } from "../utils";

export const EMPTY = 0;
export const GUESS = 1;
export const NO = 2;
export const MAYBE = 3;
export const YES = 4;

const GameWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
`;

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

export const ToastContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0);
`;

export const Game = ({ gameEndPopupShown, setGameEndPopupShown }) => {
  // TODO: Share output with link

  // ********************* PERSISTENT GAME STATE ******************** //
  const [guesses, setGuesses] = useStickyState([], "guesses");
  const [numGuesses, setNumGuesses] = useStickyState(0, "numGuesses");
  const [answerFound, setAnswerFound] = useStickyState(false, "answerFound");
  const WORD_LIST_LENGTH = wordlist
    .split("\n")
    .filter((word) => word.length === WORD_LENGTH).length;
  const [wordListLength, setWordListLength] = useStickyState(
    WORD_LIST_LENGTH,
    "wordListLength"
  );
  const [lastPlayedDate, setLastPlayedDate] = useStickyState(
    "",
    "lastPlayedDate"
  );
  const [lastWinDate, setLastWinDate] = useStickyState("", "lastWinDate");
  const [lastLossDate, setLastLossDate] = useStickyState("", "lastLossDate");
  const [gamesPlayed, setGamesPlayed] = useStickyState(0, "gamesPlayed");
  const [gamesWon, setGamesWon] = useStickyState(0, "gamesWon");
  const [currentStreak, setCurrentStreak] = useStickyState(0, "currentStreak");
  const [maxStreak, setMaxStreak] = useStickyState(0, "maxStreak");
  const [mostRecentStreak, setMostRecentStreak] = useStickyState(
    0,
    "mostRecentStreak"
  );
  const [currentStreakIsMax, setCurrentStreakIsMax] = useStickyState(
    false,
    "currentStreakIsMax"
  );
  const [guessDistribution, setGuessDistribution] = useStickyState(
    new Array(NUM_GUESSES).fill(0),
    "guessDistribution"
  );
  // ******************** END PERSISTENT GAME STATE ***************** //

  const [errors, setErrors] = React.useState([]);
  const answer = React.useRef(null);
  const errorNumber = React.useRef(0);
  const todaysDateString = React.useRef(0);

  const gameWon = React.useCallback(() => {
    setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
    setGamesWon((gamesWon) => gamesWon + 1);
    setCurrentStreak((currentStreak) => currentStreak + 1);
    setMostRecentStreak((mostRecentStreak) => mostRecentStreak + 1);
    setMaxStreak((maxStreak) => {
      if (currentStreak + 1 > maxStreak) {
        setCurrentStreakIsMax(true);
        return currentStreak + 1;
      }
      setCurrentStreakIsMax(false);
      return maxStreak;
    });
    setGuessDistribution((oldGuessDistribution) => {
      const newGuessDistribution = [...oldGuessDistribution];
      newGuessDistribution[numGuesses]++;
      return newGuessDistribution;
    });
    setLastWinDate(todaysDateString.current);
  }, [numGuesses]);

  const gameLost = React.useCallback(() => {
    setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
    setMostRecentStreak(currentStreak);
    setCurrentStreak(0);
    setLastLossDate(todaysDateString.current);
  }, []);

  const resetTodaysGame = React.useCallback(() => {
    setGuesses([]);
    if (answerFound) {
      setGamesPlayed((gamesPlayed) => gamesPlayed - 1);
      setGamesWon((gamesWon) => gamesWon - 1);
      setCurrentStreak((currentStreak) => currentStreak - 1);
      setMostRecentStreak((mostRecentStreak) => mostRecentStreak - 1);
      if (currentStreakIsMax) {
        setMaxStreak((maxStreak) => maxStreak - 1);
      }
      setGuessDistribution((oldGuessDistribution) => {
        const newGuessDistribution = [...oldGuessDistribution];
        newGuessDistribution[numGuesses - 1]--;
        return newGuessDistribution;
      });
      setLastWinDate("");
    } else if (numGuesses >= NUM_GUESSES) {
      setGamesPlayed((gamesPlayed) => gamesPlayed - 1);
      setCurrentStreak(mostRecentStreak);
      if (mostRecentStreak >= maxStreak) {
        setMaxStreak(mostRecentStreak);
        setCurrentStreakIsMax(true);
      }
      setLastLossDate("");
    }
    setNumGuesses(0);
    setAnswerFound(false);
  }, [numGuesses, answerFound]);

  const addGuessLetter = React.useCallback(
    (letter) => {
      setGuesses((oldGuesses) => {
        if (numGuesses >= NUM_GUESSES || answerFound) {
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
      if (numGuesses >= NUM_GUESSES || answerFound) {
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
    const errorObject = { text: text, code: errorNumber.current };
    errorNumber.current = errorNumber.current + 1;

    setErrors((oldErrors) => {
      const newErrors = [...oldErrors];
      newErrors.push(errorObject);
      return newErrors;
    });
    setTimeout(() => {
      setErrors((oldErrors) => {
        const newErrors = [...oldErrors];
        newErrors.shift();
        return newErrors;
      });
    }, 2500);
  }, []);

  const submitGuess = React.useCallback(() => {
    if (numGuesses < NUM_GUESSES && guesses[numGuesses]) {
      if (guesses[numGuesses].length < WORD_LENGTH) {
        // Error: Not enough letters in guess
        triggerError("Not enough letters");
        return;
      }

      const guess = guesses[numGuesses].map((obj) => obj.letter).join("");
      if (!wordlist.toUpperCase().split("\n").includes(guess.toUpperCase())) {
        // Error: Guess not in word list
        triggerError("Not in word list");
        return;
      }

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
            if (guessRow[i].state === GUESS) {
              guessRow[i].state = MAYBE;
              answerRow[answerRow.indexOf(guessRow[i].letter)] = "";
            }
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
    }
  }, [numGuesses, guesses]);

  React.useEffect(() => {
    var lastGuessLine = 0;

    for (var i = 0; i < guesses.length; i++) {
      if (
        guesses &&
        guesses[i] &&
        guesses[i][0] &&
        guesses[i][0].state !== GUESS
      ) {
        if (
          !guesses[i + 1] ||
          !guesses[i + 1][0] ||
          guesses[i + 1][0].state === EMPTY ||
          guesses[i + 1][0].state === GUESS
        ) {
          lastGuessLine = i + 1;
        }
      }
    }
    setNumGuesses(lastGuessLine);
  }, [guesses]);

  React.useEffect(() => {
    const currentDate = new Date();
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    todaysDateString.current =
      date.getFullYear() +
      date.getMonth().toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0");

    // Reset if last played before today
    if (lastPlayedDate !== todaysDateString.current) {
      setLastPlayedDate(todaysDateString.current);
      resetTodaysGame();
    }

    // Reset if word list has changed since last play
    if (wordListLength !== WORD_LIST_LENGTH) {
      setWordListLength(WORD_LIST_LENGTH);
      resetTodaysGame();
    }

    // Pick today's word based on a pseudo-RNG function
    const dateIndex = Math.floor(date.getTime() / 86400000);

    const allWords = wordlist
      .split("\n")
      .filter((word) => word.length === WORD_LENGTH);

    const seededRand = getSeededRand("@guamhat");
    const shuffledWordList = shuffle(allWords, seededRand);
    const selectedWord = "JAMIE";

    answer.current = selectedWord;
    // console.log(selectedWord);
  }, []);

  React.useEffect(() => {
    // Check win and loss states
    if (answerFound && lastWinDate !== todaysDateString.current) {
      gameWon();
    } else if (
      !answerFound &&
      numGuesses >= NUM_GUESSES &&
      lastLossDate !== todaysDateString.current
    ) {
      gameLost();
    }
    if (answerFound || numGuesses >= NUM_GUESSES) {
      setGameEndPopupShown(true);
    }
  }, [answerFound, numGuesses]);

  return (
    <>
      {gameEndPopupShown && (
        <GameEndPopup
          gamesPlayed={gamesPlayed}
          gamesWon={gamesWon}
          currentStreak={currentStreak}
          maxStreak={maxStreak}
          hideContainer={() => setGameEndPopupShown(false)}
          guessDistribution={guessDistribution}
          currentWinNumGuesses={answerFound ? numGuesses : 0}
          guesses={guesses}
        />
      )}
      <GameWrapper>
        <GameContainer>
          <GameGrid guesses={guesses} />
        </GameContainer>
        <Keyboard
          addGuessLetter={addGuessLetter}
          removeGuessLetter={removeGuessLetter}
          submitGuess={submitGuess}
          guesses={guesses}
          numGuesses={numGuesses}
        />
      </GameWrapper>
      <ToastContainer>
        {errors.map((error) => (
          <Toast text={error.text} />
        ))}
        {numGuesses >= NUM_GUESSES && <Toast text={answer.current} />}
      </ToastContainer>
    </>
  );
};

export default Game;
