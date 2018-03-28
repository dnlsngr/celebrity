import * as React from 'react'
import { Layout, Input, Button, Card } from 'antd'
import { connect } from 'redux-zero/react'
import { RouterProps } from 'react-router'

import actions, { ActionPropTypes } from 'actions'
import { CelebrityReduxState } from 'store'

import * as styles from './game-setup.css'

type GameSetupProps = CelebrityReduxState & ActionPropTypes & RouterProps

interface GameSetupState {
  celebrityName: string
}

export class GameSetup extends React.Component<GameSetupProps, GameSetupState> {
  private nameInput: Input

  constructor(props: GameSetupProps){
    super(props);
    // We keep state of form elements in component state
    this.state = { celebrityName: '' }

    this.handleUpdateName = this.handleUpdateName.bind(this)
    this.handleAddName = this.handleAddName.bind(this)
    this.handleNextPlayer = this.handleNextPlayer.bind(this)
    this.handleBeginGame = this.handleBeginGame.bind(this)
  }

  handleUpdateName(e: any) {
    this.setState({ celebrityName: e.target.value })
  }

  handleAddName(e: any) {
    if (this.state.celebrityName.length > 0) {
      this.props.addName(this.state.celebrityName)
      this.setState({ celebrityName: '' })
    }
  }

  handleNextPlayer(e: any) {
    this.props.clearForNextPlayer()
    this.nameInput.focus()
    this.setState({ celebrityName: '' }) // In case they had text in the input
  }

  handleBeginGame(e: any) {
    this.props.finalizePlayers()
    this.props.beginRound(1)
    // We must do this programmatically instead of with a Link so that unit tests work
    // https://github.com/ReactTraining/react-router/issues/4795
    this.props.history.push('/gameplay')
  }

  render() {
    const { currentPlayerNum, currentNames } = this.props.gameSetup;

    return (
      <div data-test='game-setup'>
        <Layout>
          <Layout.Header>
            <h1 className={styles.setupHeader}>{`Welcome player ${currentPlayerNum}!`}</h1>
          </Layout.Header>
          <Layout.Content>
            <div className={styles.setupContainer}>
              <Button onClick={this.handleBeginGame}>Begin Game</Button>
              <h2>Please enter names of celebrities below. We recommend you enter 8 names.</h2>
              <div>
                <Input type='text' data-test='name-input' value={this.state.celebrityName}
                  ref={(input) => { this.nameInput = input; }}
                  onChange={this.handleUpdateName} onPressEnter={this.handleAddName} />
                <Button type='primary' onClick={this.handleAddName} data-test="add-name-button">Add</Button>
              </div>
              <Button onClick={this.handleNextPlayer} data-test="next-player-button">Done! Next Player</Button>
              {currentNames.map((name: string, index: number) => 
                (<div key={index}>
                  <Card key={index}>{name}</Card>
                 </div>)
              )}
            </div>
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}

const mapToProps = ( state: CelebrityReduxState ) => state;
export default connect(mapToProps, actions)(GameSetup);
