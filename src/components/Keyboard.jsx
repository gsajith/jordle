import * as React from "react";
import styled from "styled-components";
import { isLetter } from "../utils";
import { EMPTY, GUESS, NO, YES, MAYBE } from "./Game";

const KeyboardContainer = styled.div`
  height: 200px;
  margin: 0 8px;
  user-select: none;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
  align-items: center;
`;

const Key = styled.button`
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: ${(props) => {
    switch (props.state) {
      case EMPTY:
        return props.theme.keyBackgroundColor;
        break;
      case GUESS:
        return props.theme.keyBackgroundColor;
        break;
      case NO:
        return props.theme.gridColorNo;
        break;
      case MAYBE:
        return props.theme.gridColorMaybe;
        break;
      case YES:
        return props.theme.gridColorYes;
        break;
      default:
        return props.theme.keyBackgroundColor;
        break;
    }
  }};
  color: ${(props) => props.theme.keyTextColor};
  -webkit-tap-highlight-color: ${(props) => props.theme.keyHighlightColor};
  flex: ${(props) => (props.largeButton ? 1.5 : 1)};
  font-size: ${(props) => (props.largeButton ? "12px" : "inherit")};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

const RowSpacer = styled.div`
  flex: 0.5;
`;

const KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "⏪"],
];

export const Keyboard = ({
  addGuessLetter,
  removeGuessLetter,
  submitGuess,
  guesses,
  numGuesses,
}) => {
  const [keyMap, setKeyMap] = React.useState({});

  React.useEffect(() => {
    const newKeyMap = {};
    const flatArray = KEYS.flat().map((key) => {
      return { key: key, state: EMPTY };
    });
    flatArray.forEach(
      (arrayItem) => (newKeyMap[arrayItem.key.toLowerCase()] = arrayItem.state)
    );

    for (var i = 0; i < guesses.length; i++) {
      if (guesses[i]) {
        for (var j = 0; j < guesses[i].length; j++) {
          const letter = guesses[i][j].letter.toLowerCase();

          if (typeof keyMap[letter] !== "undefined") {
            if (typeof newKeyMap[letter] !== "undefined") {
              newKeyMap[letter] = Math.max(
                Math.max(guesses[i][j].state, keyMap[letter]),
                newKeyMap[letter]
              );
            } else {
              newKeyMap[letter] = Math.max(guesses[i][j].state, keyMap[letter]);
            }
          } else {
            if (typeof newKeyMap[letter] !== "undefined") {
              newKeyMap[letter] = Math.max(
                newKeyMap[letter],
                guesses[i][j].state
              );
            } else {
              newKeyMap[letter] = guesses[i][j].state;
            }
          }
        }
      }
    }
    setKeyMap(newKeyMap);
  }, [numGuesses]);

  const keyPressed = React.useCallback(
    (evt) => {
      if (KEYS.some((row) => row.includes(evt.key))) {
        addGuessLetter(evt.key);
      } else if (evt.key === "Backspace") {
        removeGuessLetter();
      } else if (evt.key === "Enter") {
        submitGuess();
      }
    },
    [addGuessLetter, removeGuessLetter, submitGuess]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    return () => {
      document.removeEventListener("keydown", keyPressed);
    };
  }, [keyPressed]);

  return (
    <KeyboardContainer>
      {KEYS.map((row, index) => {
        return (
          <Row key={"row" + index}>
            {index === 1 && <RowSpacer />}
            {row.map((key) => {
              return (
                <Key
                  state={keyMap[key.toLowerCase()]}
                  key={key}
                  largeButton={!isLetter(key)}
                  onClick={() => {
                    if (isLetter(key)) {
                      addGuessLetter(key);
                    } else if (key !== "enter") {
                      removeGuessLetter();
                    } else {
                      submitGuess();
                    }
                  }}
                >
                  {key === "⏪" ? (
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M43.25 21.2877H10.635L20.6175 9.45443C21.0843 8.90018 21.3089 8.18562 21.2418 7.46796C21.1748 6.75029 20.8216 6.08831 20.26 5.62763C19.6984 5.16695 18.9744 4.94532 18.2472 5.01148C17.52 5.07765 16.8493 5.4262 16.3825 5.98045L2.6325 22.2647C2.53999 22.3942 2.45727 22.5303 2.385 22.6718C2.385 22.8075 2.385 22.8889 2.1925 23.0246C2.06785 23.3358 2.00259 23.6671 2 24.0017C2.00259 24.3363 2.06785 24.6676 2.1925 24.9788C2.1925 25.1145 2.1925 25.1959 2.385 25.3316C2.45727 25.4731 2.53999 25.6092 2.6325 25.7387L16.3825 42.0229C16.6411 42.3293 16.9648 42.5757 17.3308 42.7446C17.6968 42.9134 18.096 43.0006 18.5 43C19.1425 43.0012 19.7652 42.7804 20.26 42.3758C20.5385 42.1479 20.7686 41.8681 20.9374 41.5523C21.1061 41.2366 21.21 40.891 21.2432 40.5356C21.2764 40.1801 21.2383 39.8216 21.1309 39.4807C21.0235 39.1399 20.8491 38.8232 20.6175 38.549L10.635 26.7157H43.25C43.9793 26.7157 44.6788 26.4298 45.1945 25.9208C45.7103 25.4118 46 24.7215 46 24.0017C46 23.2819 45.7103 22.5916 45.1945 22.0826C44.6788 21.5736 43.9793 21.2877 43.25 21.2877Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    key
                  )}
                </Key>
              );
            })}
            {index === 1 && <RowSpacer />}
          </Row>
        );
      })}
    </KeyboardContainer>
  );
};

export default Keyboard;
