import * as React from "react";
import styled from "styled-components";
import { timeTilTomorrow } from "../utils";
import { TITLE, NUM_GUESSES, URL } from "../static/globals";
import { ToastContainer, NO, MAYBE, YES } from "./Game";
import { Toast } from "./Toast";

const PopupContainer = styled.div`
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.backgroundColor};
  border-radius: 8px;
  padding: 16px;
  width: 90%;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 50%);
  max-height: 90%;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  z-index: 3001;
  user-select: none;
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
  background-color: ${(props) =>
    props.current ? props.theme.gridColorYes : props.theme.gridColorNo};
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  padding-right: 9px;
  padding-top: 4px;
`;

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.textColor};
  flex-grow: 1;
  width: 50%;
  padding-right: 16px;
`;

const ShareButton = styled.button`
  background-color: ${(props) => props.theme.gridColorYes};
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: ${(props) => props.theme.keyHighlightColor};
  height: 52px;
  font-size: 20px;
  -webkit-filter: brightness(100%0;)
  flex-grow: 1;
  width: calc(50% - 32px);
  margin-left: 32px;
`;

/**

Wordle 234 X/6

🟨⬛⬛⬛🟨
🟨⬛🟩⬛⬛
⬛🟩⬛⬛🟩
⬛🟩🟩⬛🟩
⬛🟩🟩⬛🟩
⬛🟩🟩⬛🟩

*/

export const GameEndPopup = ({
  gamesPlayed = 0,
  gamesWon = 0,
  currentStreak = 0,
  maxStreak = 0,
  guessDistribution,
  hideContainer,
  currentWinNumGuesses,
  guesses,
}) => {
  const maxNumGuesses = Math.max(...guessDistribution);
  const [countdown, setCountdown] = React.useState(timeTilTomorrow());
  const [toastShown, setToastShown] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeTilTomorrow());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const shareClick = React.useCallback(() => {
    let shareString = "";

    shareString += TITLE + " ";
    shareString += currentWinNumGuesses > 0 ? currentWinNumGuesses : "X";
    shareString += "/";
    shareString += NUM_GUESSES + "\n";
    shareString += "\n";

    guesses.forEach((guessArray) => {
      guessArray.forEach((arrayItem) => {
        if (arrayItem.state === NO) {
          shareString += "⬛";
        } else if (arrayItem.state === MAYBE) {
          shareString += "🟨";
        } else if (arrayItem.state === YES) {
          shareString += "🟩";
        }
      });
      shareString += "\n";
    });
    shareString += "\n";
    shareString += URL;
    navigator.clipboard.writeText(shareString);
    setToastShown(true);
    setTimeout(() => {
      setToastShown(false);
    }, 2500);
  }, []);

  return (
    <PopupOverlay onClick={hideContainer}>
      <PopupContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 4,
            width: "100%",
          }}
          onClick={hideContainer}
        >
          X
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Title>STATISTICS</Title>
          <Statistics>
            <StatisticsContainer>
              <Statistic>{gamesPlayed}</Statistic>
              <Label>Played</Label>
            </StatisticsContainer>
            <StatisticsContainer>
              <Statistic>
                {gamesPlayed > 0
                  ? Math.floor((100 * gamesWon) / gamesPlayed)
                  : 0}
              </Statistic>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <GuessDistribution>
            {guessDistribution.map((guess, index) => {
              return (
                <GraphContainer key={"distrib" + index}>
                  <div>{index + 1}</div>
                  <Graph>
                    <GraphBar
                      current={currentWinNumGuesses === index + 1}
                      style={{
                        width:
                          guessDistribution[index] === 0
                            ? "7%"
                            : (100 * guessDistribution[index]) / maxNumGuesses +
                              "%",
                      }}
                    >
                      {guessDistribution[index]}
                    </GraphBar>
                  </Graph>
                </GraphContainer>
              );
            })}
          </GuessDistribution>
          <div
            style={{
              width: "100%",
              padding: "0px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <CountdownContainer>
              <Title style={{ marginBottom: 0, marginTop: 16 }}>
                NEXT {TITLE}
              </Title>
              <Statistic>{timeTilTomorrow()}</Statistic>
            </CountdownContainer>
            <ShareButton onClick={shareClick}>SHARE</ShareButton>
          </div>
        </div>
      </PopupContainer>
      {toastShown && (
        <ToastContainer>
          <Toast text={"Copied results to clipboard"} />
        </ToastContainer>
      )}
    </PopupOverlay>
  );
};

export default GameEndPopup;
