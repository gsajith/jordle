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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Statistics = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const StatisticsContainer = styled.div`
  flex: 1;
`;

const Statistic = styled.div`
  font-size: 36px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.05em;
  font-variant-numeric: proportional-nums;
`;

const Label = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const GuessDistribution = styled.div`
  width: 80%;
  margin-bottom: 16px;
  display: block;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 22px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 4px;
`;

const Graph = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 4px;
`;

const GraphBar = styled.div`
  height: 100%;
  position: relative;
  width: 7%;
  background-color: ${props => props.theme.gridColorNo};
  display: flex;
  justify-content: end;
  font-weight: bold;
  padding-right: 9px;
  padding-top: 4px;
`;

export const GameEndPopup = ({
  gamesPlayed = 0,
  gamesWon = 0,
  currentStreak = 0,
  maxStreak = 0,
  guessDistribution,
  hideContainer,
  wonCurrent
}) => {
  return (
    <PopupOverlay onClick={hideContainer}>
      <PopupContainer>
        <div
          style={{ display: "flex", justifyContent: "end", padding: 4, width: "100%" }}
          onClick={hideContainer}
        >
          X
        </div>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <Title>STATISTICS</Title>
          <Statistics>
            <StatisticsContainer>
              <Statistic>{gamesPlayed}</Statistic>
              <Label>Played</Label>
            </StatisticsContainer>
            <StatisticsContainer>
              <Statistic>{gamesPlayed > 0 ? Math.floor((100*gamesWon)/gamesPlayed) : 0}</Statistic>
              <Label>Win %</Label>
            </StatisticsContainer>
            <StatisticsContainer>
              <Statistic>{currentStreak}</Statistic>
              <Label>Current Streak</Label>
            </StatisticsContainer>
            <StatisticsContainer>
              <Statistic>{maxStreak}</Statistic>
              <Label>Max Streak</Label>
            </StatisticsContainer>
          </Statistics>
          
          <Title>GUESS DISTRIBUTION</Title>
        </div>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", alignItems: "center"}}>
          <GuessDistribution>
            <GraphContainer>
              <div>1</div>
              <Graph>
                <GraphBar>
                  0
                </GraphBar>
              </Graph>
            </GraphContainer>
            
             <GraphContainer>
              <div>2</div>
              <Graph>
                <GraphBar>
                  0
                </GraphBar>
              </Graph>
            </GraphContainer>
            
             <GraphContainer>
              <div>3</div>
              <Graph>
                <GraphBar>
                  0
                </GraphBar>
              </Graph>
            </GraphContainer>
            
             <GraphContainer>
              <div>4</div>
              <Graph>
                <GraphBar>
                  0
                </GraphBar>
              </Graph>
            </GraphContainer>
            
             <GraphContainer>
              <div>5</div>
              <Graph>
                <GraphBar>
                  0
                </GraphBar>
              </Graph>
            </GraphContainer>
            
             <GraphContainer>
              <div>6</div>
              <Graph>
                <GraphBar>
                  0
                </GraphBar>
              </Graph>
            </GraphContainer>
            
            
          </GuessDistribution>
        </div>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default GameEndPopup;
