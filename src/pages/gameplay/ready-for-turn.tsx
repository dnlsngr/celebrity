import * as React from "react";
import { AppBar, Button, Card } from "material-ui";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";
import { getRoundMessage } from "./gameplay-helpers";

type ReadyForTurnProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class ReadyForTurn extends React.Component<ReadyForTurnProps, {}> {
  constructor(props: ReadyForTurnProps) {
    super(props);
  }

  getScores(score1: number, score2: number) {
    return (
      <Card>
        <div key="1" data-test="team-score">
          {`Team 1: ${score1}`}
        </div>
        <div key="2" data-test="team-score">
          {`Team 2: ${score2}`}
        </div>
      </Card>
    );
  }

  render() {
    const { roundInfo, scores } = this.props;
    return (
      <div data-test="ready-for-turn">
        <AppBar position="static">
          <h1 data-test="ready-for-turn-header">
            {getRoundMessage(roundInfo.roundNumber)}
          </h1>
        </AppBar>
        {this.getScores(scores.team1, scores.team2)}
        <Button data-test="begin-turn-button" onClick={this.props.beginTurn}>
          Begin Turn
        </Button>
      </div>
    );
  }
}

const mapToProps = (state: CelebrityReduxState) => state;
export default connect(mapToProps, actions)(ReadyForTurn);
