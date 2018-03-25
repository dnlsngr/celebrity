import * as React from 'react';
import { Layout, Button, Card } from 'antd'
import { connect } from 'redux-zero/react';
import { RouterProps } from 'react-router'

import actions, { ActionPropTypes } from 'actions';
import { CelebrityReduxState, TeamScore } from 'store'

type ReadyForTurnProps = CelebrityReduxState & ActionPropTypes & RouterProps

export class ReadyForTurn extends React.Component<ReadyForTurnProps, {}> {
  constructor(props: ReadyForTurnProps){
    super(props);
  }

  getRoundMessage(roundNumber: number) {
    switch (roundNumber) {
      case 1:
        return 'Round 1: Say as many clues as you like';
      case 2:
        return 'Round 2: One-word clues only';
      case 3:
        return 'Round 3: No talking--act your clues out!';
      default:
        console.error(`Invalid round number ${roundNumber}`)
    }
  }

  getScores(scores: TeamScore[]) {
    return (
      <Card>
      {scores.map((score: TeamScore) => 
        (
          <div key={score.teamNumber} data-test="team-score">
            {`Team ${score.teamNumber}: ${score.score}`}
          </div>
         )
      )}
      </Card>
    )
  }

  render() {
    const { roundInfo, scores } = this.props
    return (
      <div data-test="ready-for-turn">
        <Layout>
          <Layout.Header>
            <h1 data-test="ready-for-turn-header">{this.getRoundMessage(roundInfo.roundNumber)}</h1>
          </Layout.Header>
          <Layout.Content>
            {this.getScores(scores)}
            <Button data-test="begin-turn-button" onClick={this.props.beginTurn}>Begin Turn</Button>
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}

const mapToProps = ( state: CelebrityReduxState ) => state;
export default connect(mapToProps, actions)(ReadyForTurn);