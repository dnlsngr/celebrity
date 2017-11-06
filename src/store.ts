import createStore from 'redux-zero';

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
const store = createStore(initialState);

export default store;