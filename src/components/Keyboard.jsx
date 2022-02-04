import * as React from "react";
import styled from "styled-components";

const KeyboardContainer = styled.div`
  height: 200px;
  background-color: grey;
  margin: 0;
  user-select: none;
`;

const KEYS = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm']]

export const Keyboard = () => {
  return <KeyboardContainer />;
};

export default Keyboard;
