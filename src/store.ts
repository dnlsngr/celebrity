import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";

export const NEW_ROUND_PAGE: string = "NEW_ROUND_PAGE";
export const TURN_READY_PAGE: string = "TURN_READY_PAGE";
export const PLAY_ROUND_PAGE: string = "PLAY_ROUND_PAGE";
export const GAME_OVER_PAGE: string = "GAME_OVER_PAGE";

export interface CelebrityReduxState {
  currentPage: string;
  allNames: string[];
  numPlayers: number;
  allowSkip: boolean;
  scores: {
    team1: number;
    team2: number;
  };
  gameSetup?: {
    currentNames?: string[];
    currentPlayerNum: number;
  };
  roundInfo: {
    roundNumber: number;
    turnNumber: number;
    namesMissedFromLastRound: string[];
    remainingNamesForRound: string[];
  };
  turnInfo: {
    namesForTurn: string[];
    skippedOrIllegalNames: string[];
    currentName: string;
    correctThisTurn: number;
    skippedThisTurn: number;
    illegalThisTurn: number;
    secondsRemaining: number;
  };
}

export const initialState: CelebrityReduxState = {
  currentPage: NEW_ROUND_PAGE,
  allNames: [],
  numPlayers: 1,
  allowSkip: false,
  gameSetup: {
    currentNames: [],
    currentPlayerNum: 1
  },
  roundInfo: {
    roundNumber: 0,
    turnNumber: 0,
    namesMissedFromLastRound: [],
    remainingNamesForRound: []
  },
  scores: {
    team1: 0,
    team2: 0
  },
  turnInfo: {
    namesForTurn: [],
    skippedOrIllegalNames: [],
    currentName: "",
    correctThisTurn: 0,
    skippedThisTurn: 0,
    illegalThisTurn: 0,
    secondsRemaining: 0
  }
};
const middlewares: any = connect ? applyMiddleware(connect(initialState)) : [];
const store = createStore(initialState, middlewares);

export default store;
