import * as React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';

import * as styles from './game-setup.css'

export interface GameSetupProps {
  currentPlayerNum: number
  currentNames: string[]
}

const GameSetup = (props: GameSetupProps) => {
  const { currentPlayerNum, currentNames } = props;

  return (
    <div>
      <AppBar>
        <h1 className={styles.setupHeader}>{`Welcome player ${currentPlayerNum}!`}</h1>
      </AppBar>
      <h2>Please enter names of celebrities below. We recommend you enter 8 names.</h2>
    </div>
  )
}

export default GameSetup;