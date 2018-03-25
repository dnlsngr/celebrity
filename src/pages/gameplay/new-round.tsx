import * as React from 'react';
import { Layout, Button, Card } from 'antd'
import { connect } from 'redux-zero/react';
import { RouterProps } from 'react-router'

import actions, { ActionPropTypes } from 'actions';
import { CelebrityReduxState } from 'store'

type NewRoundProps = CelebrityReduxState & ActionPropTypes & RouterProps

export class NewRound extends React.Component<NewRoundProps, {}> {
  constructor(props: NewRoundProps) {
    super(props);

    this.beginRound = this.beginRound.bind(this)
    this.generateNamesMissed = this.generateNamesMissed.bind(this)
  }

  beginRound(e: any) {
    this.props.readyForTurn()
  }

  generateNamesMissed(names: string[]) {
    return (
      <div data-test="names-missed">
        <h2>Here are the names you missed</h2>
        {names.map((name: string, index: number) =>
          (<Card key={index}>{name}</Card>)
        )}
      </div>
    )
  }

  render() {
    const { roundNumber, namesMissedFromLastRound } = this.props.roundInfo

    const namesMissed = namesMissedFromLastRound.length > 0 ?
      this.generateNamesMissed(namesMissedFromLastRound) :
      null
    return (
      <div data-test="new-round">
        <Layout>
          <Layout.Header>
            <h1 data-test="round-start-header">{`Let's start round ${roundNumber}`}</h1>
          </Layout.Header>
          <Layout.Content>
            {namesMissed}
            <Button data-test="begin-round-button" onClick={this.beginRound}>Begin Round</Button>
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}

const mapToProps = ( state: CelebrityReduxState ) => state;
export default connect(mapToProps, actions)(NewRound);