import * as React from "react";
import { AppBar, Button, Card } from "material-ui";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";
import { getRoundMessage } from "../gameplay-helpers";

import * as globalStyles from "../../global-styles.css";
import * as styles from "./play-round.css";

type PlayRoundProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class PlayRound extends React.Component<PlayRoundProps, {}> {
  constructor(props: PlayRoundProps) {
    super(props);
  }

  render() {
    const { turnInfo, roundInfo, allowSkip } = this.props;

    const answerButtons = (
      <div className={styles.answerButtons}>
        <Button
          variant="raised"
          data-test="correct-button"
          onClick={this.props.nameCorrect}
        >
          Correct
        </Button>
        {allowSkip ? (
          <Button
            variant="raised"
            data-test="skip-button"
            onClick={this.props.nameSkipped}
          >
            Skip
          </Button>
        ) : null}
        <Button
          variant="raised"
          data-test="illegal-clue-button"
          onClick={this.props.illegalClue}
        >
          Illegal Clue
        </Button>
      </div>
    );

    const noNamesLeftButton = (
      <div className={styles.noMoreNames}>
        <div>Oops, no more names left!</div>
        <Button
          variant="raised"
          className={styles.endTurnButton}
          data-test="end-turn-button"
          onClick={this.props.endTurn}
        >
          End Turn
        </Button>
      </div>
    );

    return (
      <div data-test="play-round">
        <AppBar position="static">
          <h1 data-test="play-round-header" className={globalStyles.headerText}>
            {getRoundMessage(roundInfo.roundNumber)}
          </h1>
        </AppBar>
        <div className={styles.playRoundContainer}>
          <div className={styles.currentName}>{turnInfo.currentName}</div>
          <Card className={styles.timer}>{turnInfo.secondsRemaining}</Card>
          {turnInfo.currentName ? answerButtons : noNamesLeftButton}
        </div>
      </div>
    );
  }
}

const mapToProps = (state: CelebrityReduxState) => state;
export default connect(mapToProps, actions)(PlayRound);
