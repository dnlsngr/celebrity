import * as React from 'react';
import { Layout, Input, Button } from 'antd';

import * as styles from './game-setup.css'

export interface GameSetupProps {
  currentPlayerNum: number
  currentNames: string[]
}

export interface GameSetupState {
  celebrityName: string
}

class GameSetup extends React.Component<GameSetupProps, GameSetupState> {
  constructor(props: GameSetupProps){
    super(props);
    this.state = { celebrityName: '' }

    this.handleUpdateName = this.handleUpdateName.bind(this)
  }

  handleUpdateName(e: any) {
    this.setState({ celebrityName: e.target.value })
  }

  render() {
    const { currentPlayerNum, currentNames } = this.props;

    return (
      <div>
        <Layout>
          <Layout.Header>
            <h1 className={styles.setupHeader}>{`Welcome player ${currentPlayerNum}!`}</h1>
          </Layout.Header>
          <Layout.Content>
            <div className={styles.setupContainer}>
              <h2>Please enter names of celebrities below. We recommend you enter 8 names.</h2>
              <div>
                <Input type='text' value={this.state.celebrityName} onChange={this.handleUpdateName} />
                <Button type='primary'>Add</Button>
              </div>
            </div>
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}

export default GameSetup;