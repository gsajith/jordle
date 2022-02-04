import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 36px;
  letter-spacing: 3.2px;
  pointer-events: none;
`;

const TopBarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.borderColor};
  height: 50px;
  justify-content: space-between;
`;

export const Game = () => {
  return (
    <TopBarContainer>
      <div>x</div>
      <Title>{TITLE}</Title>
      <div>y</div>
    </TopBarContainer>
  );
};

export default Game;
