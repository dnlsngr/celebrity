import * as React from 'react';
import { connect } from 'redux-zero/react';

import { CelebrityReduxState, GAME_SETUP_PAGE } from 'store';

import GameSetup from './game-setup/game-setup'

export const AppFrame = (props: CelebrityReduxState) => {
  const { currentPage, gameSetup } = props;

  let currentPageComponent;
  switch(currentPage) {
    case GAME_SETUP_PAGE:
      currentPageComponent = (
        <GameSetup currentPlayerNum={gameSetup.currentPlayerNum} currentNames={gameSetup.currentNames}/>
      )
      break;
  }

  return (
    <div>
      {currentPageComponent}
    </div>
  )
}

const mapToProps = ( state: CelebrityReduxState ) => state;

export default connect(mapToProps)(AppFrame);