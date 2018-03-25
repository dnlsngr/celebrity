import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';

export const NEW_ROUND_PAGE: string = 'NEW_ROUND_PAGE';
export const TURN_READY_PAGE: string = 'TURN_READY_PAGE';

export interface CelebrityReduxState {
  currentPage: string
  allNames: string[]
  numPlayers: number
  gameSetup?: {
    currentNames?: string[]
    currentPlayerNum: number
  }
  roundInfo: {
    roundNumber: number
    turnNumber: number
    namesMissedFromLastRound: string[]
    remainingNamesForRound: string[]
  }
};

const initialState: CelebrityReduxState = {
  currentPage : NEW_ROUND_PAGE,
  allNames: [],
  numPlayers: 1,
  gameSetup: {
    currentNames: [],
    currentPlayerNum: 1
  },
  roundInfo: {
    roundNumber: 0,
    turnNumber: 0,
    namesMissedFromLastRound: [],
    remainingNamesForRound: []
  }
};
const middlewares: any = connect ? applyMiddleware(connect(initialState)): [];
const store = createStore(initialState, middlewares);

export default store;