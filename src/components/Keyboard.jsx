import * as React from "react";
import styled from "styled-components";

const KeyboardContainer = styled.div`
  height: 200px;
  margin: 0;
  user-select: none;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
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
  tap-highlight-color: ${(props) => props.theme.keyHighlightColor};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

const KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "back"],
];

export const Keyboard = () => {
  return (
    <KeyboardContainer>
      {KEYS.map((row, index) => {
        return (
          <Row key={"row" + index}>
            {row.map((key) => {
              return <Key key={key}>{key}</Key>;
            })}
          </Row>
        );
      })}
    </KeyboardContainer>
  );
};

export default Keyboard;
