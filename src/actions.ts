import * as _ from 'lodash'
import { CelebrityReduxState, NEW_ROUND_PAGE, TURN_READY_PAGE, PLAY_ROUND_PAGE, GAME_OVER_PAGE } from 'store'
import store from './store';

const TURN_LENGTH_SECONDS = 10
const NUM_TEAMS = 2
const END_OF_ROUND_THRESHOLD = 8

const CORRECT = 'CORRECT'
const SKIP = 'SKIP'
const ILLEGAL = 'ILLEGAL'

let timeoutIdentifier;

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

const readyForTurn = (state: CelebrityReduxState) => {
  return {
    ...state,
    currentPage: TURN_READY_PAGE,
    roundInfo: {
      ...state.roundInfo,
      turnNumber: state.roundInfo.turnNumber + 1
    }
  }
}

const beginTurn = (state: CelebrityReduxState) => {
  const namesForTurn = _.clone(state.roundInfo.remainingNamesForRound)
  const currentName = namesForTurn.pop()
  timeoutIdentifier = setTimeout(store.setState.bind(this, _tick), 1000)
  return {
    ...state,
    currentPage: PLAY_ROUND_PAGE,
    turnInfo: {
      namesForTurn: namesForTurn,
      skippedOrIllegalNames: [],
      currentName: currentName,
      correctThisTurn: 0,
      skippedThisTurn: 0,
      illegalThisTurn: 0,
      secondsRemaining: TURN_LENGTH_SECONDS
    }
  }
}

const processName = (result: string, state: CelebrityReduxState) => {
  const namesForTurn = state.turnInfo.namesForTurn
  const currentName = state.turnInfo.currentName
  const newCurrentName = namesForTurn.pop()
  const correctThisTurn = state.turnInfo.correctThisTurn
  const skippedThisTurn = state.turnInfo.skippedThisTurn
  const illegalThisTurn = state.turnInfo.illegalThisTurn
  const skippedOrIllegalNames = (result === SKIP || result === ILLEGAL) ?
                                [...state.turnInfo.skippedOrIllegalNames, currentName] :
                                state.turnInfo.skippedOrIllegalNames
  return {
    ...state,
    turnInfo: {
      ...state.turnInfo,
      namesForTurn,
      skippedOrIllegalNames,
      currentName: newCurrentName,
      correctThisTurn: result === CORRECT ? correctThisTurn + 1 : correctThisTurn,
      skippedThisTurn: result === SKIP ? skippedThisTurn + 1 : skippedThisTurn,
      illegalThisTurn: result === ILLEGAL ? illegalThisTurn + 1 : illegalThisTurn
    }
  }
}

const _tick = (state: CelebrityReduxState) => {
  const newSecondsRemaining = state.turnInfo.secondsRemaining - 1
  if (newSecondsRemaining > 0) {
    timeoutIdentifier = setTimeout(store.setState.bind(this, _tick), 1000)
      return {
      ...state,
      turnInfo: {
        ...state.turnInfo,
        secondsRemaining: newSecondsRemaining
      }
    }
  } else {
    return endTurn(state)
  }
  
}

const endTurn = (state: CelebrityReduxState) => {
  clearTimeout(timeoutIdentifier)
  const isEndOfTurnset = state.roundInfo.turnNumber % state.numPlayers === 0
  const remainingNamesForRound =
    state.turnInfo.namesForTurn.concat(state.turnInfo.skippedOrIllegalNames)
  if (state.turnInfo.currentName) {
    remainingNamesForRound.push(state.turnInfo.currentName)
  }

  const updatedScoreState = _reconcileResults(state, isEndOfTurnset, remainingNamesForRound)

  if (isEndOfTurnset && remainingNamesForRound.length <= END_OF_ROUND_THRESHOLD) {
    const roundNumber = updatedScoreState.roundInfo.roundNumber
    if (roundNumber < 3) {
      const nextRoundNum = roundNumber + 1
      return beginRound(updatedScoreState, nextRoundNum)
    } else {
      return gameOver(updatedScoreState)
    }
  } else {
    return readyForTurn(updatedScoreState)
  }
}

const _reconcileResults =
  (state: CelebrityReduxState, isEndOfTurnset: boolean, remainingNamesForRound: string[]): CelebrityReduxState => {
  // Update scores, add illegal/skipped back to remainingNamesForRound
  const isTeam1Turn = !isEndOfTurnset
  const team1 =
    isTeam1Turn ? state.scores.team1 + state.turnInfo.correctThisTurn : state.scores.team1
  const team2 =
    !isTeam1Turn ? state.scores.team2 + state.turnInfo.correctThisTurn : state.scores.team2
  return {
    ...state,
    scores: {
      team1,
      team2
    },
    roundInfo: {
      ...state.roundInfo,
      remainingNamesForRound
    }
  }
}

const gameOver = (state: CelebrityReduxState) => {

  return {
    ...state,
    currentPage: GAME_OVER_PAGE
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
  illegalClue: processName.bind(this, ILLEGAL),
  endTurn: endTurn,
  gameOver: gameOver
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
  endTurn: () => void
  gameOver: () => void
}

export default actions