import * as React from 'react';
import { Layout, Button, Card } from 'antd'
import { connect } from 'redux-zero/react';
import { RouterProps } from 'react-router'

import actions, { ActionPropTypes } from 'actions';
import { CelebrityReduxState } from 'store'
import { getRoundMessage } from './gameplay-helpers'

type PlayRoundProps = CelebrityReduxState & ActionPropTypes & RouterProps

export class PlayRound extends React.Component<PlayRoundProps, {}> {
  constructor(props: PlayRoundProps){
    super(props);
  }

  render() {
    const { turnInfo, roundInfo } = this.props
    return (
      <div data-test="play-round">
        <Layout>
          <Layout.Header>
            <h1 data-test="play-round-header">{getRoundMessage(roundInfo.roundNumber)}</h1>
          </Layout.Header>
          <Layout.Content>
            <h2>{turnInfo.currentName}</h2>
            <Card>
              {`Seconds left: ${turnInfo.secondsRemaining}`}
            </Card>
            <Button data-test="correct-button" onClick={this.props.nameCorrect}>Correct</Button>
            <Button data-test="skip-button" onClick={this.props.nameSkipped}>Skip</Button>
            <Button data-test="illegal-clue-button" onClick={this.props.illegalClue}>Illegal Clue</Button>
            <div>
              {"correct: " + turnInfo.correctThisTurn}
              <br/>
              {"skipped: " + turnInfo.skippedThisTurn}
              <br/>
              {"correct: " + turnInfo.illegalThisTurn}
            </div>
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}

const mapToProps = ( state: CelebrityReduxState ) => state;
export default connect(mapToProps, actions)(PlayRound);