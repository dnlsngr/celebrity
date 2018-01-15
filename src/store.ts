import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';

export const GAME_SETUP_PAGE: string = 'GAME_SETUP_PAGE';

export interface CelebrityReduxState {
  currentPage: string
  allNames: string[]
  gameSetup?: {
    currentNames?: string[]
    currentPlayerNum: number
  }
};

const initialState: CelebrityReduxState = {
  currentPage : GAME_SETUP_PAGE,
  allNames: [],
  gameSetup: {
    currentNames: [],
    currentPlayerNum: 1
  }
};
const middlewares: any = connect ? applyMiddleware(connect(initialState)): [];
const store = createStore(initialState, middlewares);

export default store;