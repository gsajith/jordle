import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";
import Question from "../icons/question.svg?component";
import Stats from "../icons/stats.svg?component";
import Settings from "../icons/settings.svg?component";

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 36px;
  letter-spacing: 3.2px;
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;

const TopBarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.borderColor};
  height: 50px;
  justify-content: space-between;
  user-select: none;
`;

const StyledQuestion = styled(Question)`
  width: 24px;
  height: 24px;
  fill: ${(props) => props.theme.topBarIconColor};
  margin: 0px 8px -4px 8px;
  flex-shrink: 1;
`;

const StyledStats = styled(Stats)`
  width: 24px;
  height: 24px;
  fill: ${(props) => props.theme.topBarIconColor};
  margin: 0px 4px -4px 4px;
  flex-shrink: 1;
`;

const StyledSettings = styled(Settings)`
  width: 24px;
  height: 24px;
  fill: ${(props) => props.theme.topBarIconColor};
  margin: 0px 4px -4px 0px;
  flex-shrink: 1;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const TopBar = ({showGameEndPopup}) => {
  return (
    <TopBarContainer>
      <IconButton>
        <StyledQuestion />
      </IconButton>
      <Title>{TITLE}</Title>
      <div>
        <IconButton onClick={showGameEndPopup}>
          <StyledStats />
        </IconButton>
        <IconButton>
          <StyledSettings />
        </IconButton>
      </div>
    </TopBarContainer>
  );
};

export default TopBar;
