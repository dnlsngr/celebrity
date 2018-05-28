import * as React from "react";
import { AppBar, Button, Card } from "material-ui";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";
import { getRoundMessage, getRoundRules } from "../gameplay-helpers";

import * as globalStyles from "../../global-styles.css";
import * as styles from "./ready-for-turn.css";

type ReadyForTurnProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class ReadyForTurn extends React.Component<ReadyForTurnProps, {}> {
  constructor(props: ReadyForTurnProps) {
    super(props);
  }

  getScores(score1: number, score2: number) {
    return (
      <Card className={styles.resultsCard}>
        <div key="1" data-test="team-score">
          {`Team 1: ${score1}`}
        </div>
        <div key="2" data-test="team-score">
          {`Team 2: ${score2}`}
        </div>
      </Card>
    );
  }

  getLastTurnResults() {
    const { turnInfo } = this.props;
    return (
      <Card className={styles.resultsCard}>
        <div key="1">{`Correct last turn: ${turnInfo.correctThisTurn}`}</div>
      </Card>
    );
  }

  render() {
    const { roundInfo, scores } = this.props;

    const showScores = roundInfo.roundNumber > 1 || roundInfo.turnNumber > 1;
    const showRules = roundInfo.turnNumber > 1;

    return (
      <div data-test="ready-for-turn">
        <AppBar position="static">
          <h1
            data-test="ready-for-turn-header"
            className={globalStyles.headerText}
          >
            {getRoundMessage(roundInfo.roundNumber)}
          </h1>
        </AppBar>
        <div className={styles.readyForTurnContainer}>
          {showScores ? (
            <div className={styles.resultsContainer}>
              {this.getScores(scores.team1, scores.team2)}
              {this.getLastTurnResults()}
            </div>
          ) : null}
          <div className={styles.setupInstructions}>
            {`Team ${(roundInfo.turnNumber - 1) % 2 +
              1} is up! The cluegiver for that
          team should set the computer up so that it faces away from their
          teammates`}
          </div>
          <div className={styles.setupSubInstructions}>
            <i>
              Make sure someone from the opposing team is looking over their
              shoulder for illegal clues!
            </i>
          </div>
          {showRules ? (
            <div data-test="rules" className={styles.setupInstructions}>
              {getRoundRules(roundInfo.roundNumber)}
            </div>
          ) : null}
          <Button
            variant="raised"
            data-test="begin-turn-button"
            className={styles.beginTurnButton}
            onClick={this.props.beginTurn}
          >
            Ready, set, start!
          </Button>
        </div>
      </div>
    );
  }
}

const mapToProps = (state: CelebrityReduxState) => state;
export default connect(mapToProps, actions)(ReadyForTurn);
