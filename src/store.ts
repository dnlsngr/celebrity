import createStore from 'redux-zero';

export const GAME_SETUP_PAGE: string = 'GAME_SETUP_PAGE';

export interface CelebrityReduxState {
  currentPage: string
};

const initialState: CelebrityReduxState = { currentPage : GAME_SETUP_PAGE };
const store = createStore(initialState);

export default store;