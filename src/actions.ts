import { CelebrityReduxState, NEW_ROUND_PAGE, TURN_READY_PAGE, PLAY_ROUND } from 'store'

const addName = (state: CelebrityReduxState, name: string) => ({ 
  ...state,
  allNames: [...state.allNames, name],
  gameSetup : {
    ...state.gameSetup,
    currentNames: [...state.gameSetup.currentNames, name]
  }
})

const clearForNextPlayer = (state: CelebrityReduxState) => ({
  ...state,
  gameSetup: {
    ...state.gameSetup,
    currentNames: [],
    currentPlayerNum: state.gameSetup.currentPlayerNum + 1
  }
})

const finalizePlayers = (state: CelebrityReduxState) => {
  // If there are no names entered, don't count the current player
  const numPlayers = state.gameSetup.currentNames.length > 0 ?
    state.gameSetup.currentPlayerNum :
    state.gameSetup.currentPlayerNum -1
  return {
    ...state,
    numPlayers: numPlayers
  }
}

// Each round: reset turn counter, add all names to this round
const beginRound = (state: CelebrityReduxState, roundNumber: number) => {
  const namesMissedFromLastRound = state.roundInfo.remainingNamesForRound
  const newRemainingNames = state.allNames
  return {
    ...state,
    currentPage: NEW_ROUND_PAGE,
    roundInfo: {
      roundNumber: roundNumber,
      turnNumber: 0,
      namesMissedFromLastRound: namesMissedFromLastRound,
      remainingNamesForRound: newRemainingNames
    }
  }
}

const readyForTurn = (state: CelebrityReduxState) => ({
  ...state,
  currentPage: TURN_READY_PAGE
})

const beginTurn = (state: CelebrityReduxState) => ({
  ...state,
  currentPage: PLAY_ROUND
})

const actions = (_store: CelebrityReduxState) => ({
  addName: addName,
  clearForNextPlayer: clearForNextPlayer,
  finalizePlayers: finalizePlayers,
  beginRound: beginRound,
  readyForTurn: readyForTurn,
  beginTurn: beginTurn
})

export interface ActionPropTypes {
  addName: (name: string) => void,
  clearForNextPlayer: () => void,
  finalizePlayers: () => void,
  beginRound: (roundNumber: number) => void,
  readyForTurn: () => void
  beginTurn: () => void
}

export default actions