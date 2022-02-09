import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Question from "../icons/question.svg?component";

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
  user-select: none;
`;

const StyledQuestion = styled(Question)`
  width: 24px;
  height: 24px;
  fill: ${props => props.theme.topBarIconColor};
  margin-bottom: -8px;
  margin-left: 8px;
`;

export const TopBar = () => {
  return (
    <TopBarContainer>
      <div><StyledQuestion/></div>
      <Title>{TITLE}</Title>
      <div>y</div>
    </TopBarContainer>
  );
};

export default TopBar;
