import * as React from "react";
import { AppBar, Button, Card } from "material-ui";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";
import { getRoundMessage } from "./gameplay-helpers";

type PlayRoundProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class PlayRound extends React.Component<PlayRoundProps, {}> {
  constructor(props: PlayRoundProps) {
    super(props);
  }

  render() {
    const { turnInfo, roundInfo } = this.props;

    const answerButtons = (
      <div>
        <Button data-test="correct-button" onClick={this.props.nameCorrect}>
          Correct
        </Button>
        <Button data-test="skip-button" onClick={this.props.nameSkipped}>
          Skip
        </Button>
        <Button
          data-test="illegal-clue-button"
          onClick={this.props.illegalClue}
        >
          Illegal Clue
        </Button>
      </div>
    );

    const noNamesLeftButton = (
      <div>
        <Card>Oops, no more names left!</Card>
        <Button data-test="end-turn-button" onClick={this.props.endTurn}>
          End Turn
        </Button>
      </div>
    );

    return (
      <div data-test="play-round">
        <AppBar position="static">
          <h1 data-test="play-round-header">
            {getRoundMessage(roundInfo.roundNumber)}
          </h1>
        </AppBar>
        <h2>{turnInfo.currentName}</h2>
        <Card>{`Seconds left: ${turnInfo.secondsRemaining}`}</Card>
        {turnInfo.currentName ? answerButtons : noNamesLeftButton}
        <div>
          {"correct: " + turnInfo.correctThisTurn}
          <br />
          {"skipped: " + turnInfo.skippedThisTurn}
          <br />
          {"correct: " + turnInfo.illegalThisTurn}
        </div>
      </div>
    );
  }
}

const mapToProps = (state: CelebrityReduxState) => state;
export default connect(mapToProps, actions)(PlayRound);
