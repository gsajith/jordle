import * as React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.backgroundColor};
  border-radius: 8px;
  padding: 16px;
  width: 90%;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
  max-height: 90%;
  overflow-y: auto;
  box-sizing: border-box;
  max-width: 500px;
`;

const PopupOverlay = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 10px;
`;

const StatisticsContainer = styled.div`

`;

export const GameEndPopup = ({
  gamesPlayed,
  gamesWon,
  currentStreak,
  maxStreak,
  guessDistribution,
  hideContainer,
}) => {
  return (
    <PopupOverlay onClick={hideContainer}>
      <PopupContainer>
        <div
          style={{ display: "flex", justifyContent: "end", padding: 4 }}
          onClick={hideContainer}
        >
          X
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Title>STATISTICS</Title>
        </div>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default GameEndPopup;
