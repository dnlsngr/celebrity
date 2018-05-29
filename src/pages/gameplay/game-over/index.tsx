import * as React from "react";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";
import { AppBar, Button, Card } from "material-ui";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";
import { Scores } from "../shared-components/scores";
import { getRoundMessage } from "../gameplay-helpers";

import * as globalStyles from "../../global-styles.css";
import * as styles from "./game-over.css";

type GameOverProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class GameOver extends React.Component<GameOverProps, {}> {
  constructor(props: GameOverProps) {
    super(props);
  }

  render() {
    const { scores } = this.props;

    let winningTeamMsg;
    if (scores.team1 > scores.team2) {
      winningTeamMsg = "Team 1 Wins!";
    } else if (scores.team1 < scores.team2) {
      winningTeamMsg = "Team 2 Wins!";
    } else {
      winningTeamMsg = "It's A Tie";
    }

    return (
      <div data-test="game-over">
        <AppBar position="static">
          <h1 data-test="game-over-header" className={globalStyles.headerText}>
            {`Game Over: ${winningTeamMsg}`}
          </h1>
        </AppBar>
        <div className={styles.gameOverContainer}>
          <div className={styles.scoresContainer}>
            <Scores team1={scores.team1} team2={scores.team2} />
          </div>
        </div>
      </div>
    );
  }
}

const mapToProps = (state: CelebrityReduxState) => state;
export default connect(mapToProps, actions)(GameOver);
