import * as React from "react";
import { AppBar, Button, Card, Input } from "material-ui";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";
import key from "keymaster";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";
import { getRoundMessage } from "../gameplay-helpers";

import * as globalStyles from "../../global-styles.css";
import * as styles from "./play-round.css";

type PlayRoundProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class PlayRound extends React.Component<PlayRoundProps, {}> {
  constructor(props: PlayRoundProps) {
    super(props);
    this.onPressSpace = this.onPressSpace.bind(this);
    this.onPressKeyX = this.onPressKeyX.bind(this);
  }

  componentDidMount() {
    key("space", this.onPressSpace);
    key("x", this.onPressKeyX);
  }

  componentWillUnmount() {
    key.unbind("space", this.onPressSpace);
    key.unbind("x", this.onPressKeyX);
  }

  onPressSpace() {
    this.props.nameCorrect();
  }

  onPressKeyX() {
    this.props.illegalClue();
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
          Correct (Spacebar)
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
          Illegal Clue (Right-Arrow)
        </Button>
      </div>
    );

    const noNamesLeftButton = (
      <div className={styles.noMoreNames}>
        <span className={styles.noMoreNamesMsg}>Oops, no more names left!</span>
        <Button
          variant="raised"
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
        <div className={globalStyles.gameplayContainer}>
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
