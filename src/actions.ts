import { CelebrityReduxState, NEW_ROUND_PAGE, TURN_READY_PAGE, PLAY_ROUND } from 'store'
import store from './store';

const TURN_LENGTH_SECONDS = 60

const CORRECT = 'CORRECT'
const SKIP = 'SKIP'
const ILLEGAL = 'ILLEGAL'

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

const tick = (state: CelebrityReduxState) => {
  const newSecondsRemaining = state.turnInfo.secondsRemaining - 1
  if (newSecondsRemaining > 0) {
    setTimeout(store.setState.bind(this, tick), 1000)
  }
  return {
    ...state,
    turnInfo: {
      ...state.turnInfo,
      secondsRemaining: newSecondsRemaining
    }
  }
}

const beginTurn = (state: CelebrityReduxState) => {
  const namesForTurn = state.roundInfo.remainingNamesForRound
  const currentName = namesForTurn.pop()
  setTimeout(store.setState.bind(this, tick), 1000)
  return {
    ...state,
    currentPage: PLAY_ROUND,
    turnInfo: {
      namesForTurn: namesForTurn,
      currentName: currentName,
      correctThisTurn: 0,
      skippedThisTurn: 0,
      illegalThisTurn: 0,
      secondsRemaining: TURN_LENGTH_SECONDS
    }
  }
}

const processName = (result: string, state: CelebrityReduxState) => {
  const namesForTurn = state.roundInfo.remainingNamesForRound
  const currentName = namesForTurn.pop()
  const correctThisTurn = state.turnInfo.correctThisTurn
  const skippedThisTurn = state.turnInfo.skippedThisTurn
  const illegalThisTurn = state.turnInfo.illegalThisTurn
  return {
    ...state,
    turnInfo: {
      ...state.turnInfo,
      namesForTurn: namesForTurn,
      currentName: currentName,
      correctThisTurn: result === CORRECT ? correctThisTurn + 1 : correctThisTurn,
      skippedThisTurn: result === SKIP ? skippedThisTurn + 1 : skippedThisTurn,
      illegalThisTurn: result === ILLEGAL ? illegalThisTurn + 1 : illegalThisTurn
    }
  }
}

const actions = (_store: CelebrityReduxState) => ({
  addName: addName,
  clearForNextPlayer: clearForNextPlayer,
  finalizePlayers: finalizePlayers,
  beginRound: beginRound,
  readyForTurn: readyForTurn,
  beginTurn: beginTurn,
  nameCorrect: processName.bind(this, CORRECT),
  nameSkipped: processName.bind(this, SKIP),
  illegalClue: processName.bind(this, ILLEGAL)
})

export interface ActionPropTypes {
  addName: (name: string) => void,
  clearForNextPlayer: () => void,
  finalizePlayers: () => void,
  beginRound: (roundNumber: number) => void,
  readyForTurn: () => void
  beginTurn: () => void
  nameCorrect: () => void
  nameSkipped: () => void
  illegalClue: () => void
}

export default actions