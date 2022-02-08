import * as React from "react";
import styled from "styled-components";
import { isLetter } from "../utils";

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
  background-color: ${(props) => props.theme.keyBackgroundColor};
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

export const Keyboard = ({addGuessLetter, removeGuessLetter, submitGuess, guesses}) => {
  const keyPressed = React.useCallback((evt) => {
    if (KEYS.some(row => row.includes(evt.key))) {
      addGuessLetter(evt.key);
    } else if (evt.key === "Backspace") {
      removeGuessLetter();
    } else if (evt.key === "Enter") {
      submitGuess();
    }
  }, [addGuessLetter, removeGuessLetter, submitGuess]);
  
  React.useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    return () => {
      document.removeEventListener("keydown", keyPressed);
    }
  }, [keyPressed]);
  
  return (
    <KeyboardContainer>
      {KEYS.map((row, index) => {
        return (
          <Row key={"row" + index}>
            {index === 1 && <RowSpacer />}
            {row.map((key) => {
              return (
                <Key key={key} largeButton={!isLetter(key)} onClick={() => {
                    if (isLetter(key)) {
                      addGuessLetter(key);
                    } else if (key !== "enter") {
                      removeGuessLetter();
                    } else {
                      submitGuess();
                    }
                  }}>
                  {key}
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
