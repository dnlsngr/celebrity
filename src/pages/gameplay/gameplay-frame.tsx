import * as React from 'react';
import { connect } from 'redux-zero/react';

import { CelebrityReduxState, NEW_ROUND_PAGE, TURN_READY_PAGE } from 'store';
import { RouteProps } from 'react-router-dom';

import NewRound from './new-round'
import ReadyForTurn from './ready-for-turn'

type GameplayFrameProps = CelebrityReduxState & RouteProps

export const GameplayFrame = (props: GameplayFrameProps) => {
  const { currentPage } = props;

  let currentPageComponent;
  switch(currentPage) {
    case NEW_ROUND_PAGE:
      currentPageComponent = (<NewRound/>)
      break;
    case TURN_READY_PAGE:
      currentPageComponent = (<ReadyForTurn/>)
      break;
  }

  return (
    <div>
      {currentPageComponent}
    </div>
  )
}

const mapToProps = ( state: CelebrityReduxState ) => state;

export default connect(mapToProps)(GameplayFrame);